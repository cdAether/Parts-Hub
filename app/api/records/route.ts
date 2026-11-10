import { env } from 'cloudflare:workers';
import { getChatGPTUser } from '../../chatgpt-auth';
export async function GET() {
 const u=await getChatGPTUser(); if(!u) return Response.json({error:'Sign in required'}, {status:401});
 const rows=await env.DB!.prepare('SELECT * FROM records WHERE owner = ? ORDER BY updated DESC').bind(u.userId).all();
 return Response.json(rows.results.map((r:any)=>({...JSON.parse(r.body),id:r.id,kind:r.kind,revision:r.revision,updated:r.updated})));
}
export async function POST(req:Request) {
 const u=await getChatGPTUser(); if(!u) return Response.json({error:'Sign in required'},{status:401});
 if(req.headers.get('origin') && req.headers.get('origin')!==new URL(req.url).origin) return Response.json({error:'Invalid origin'},{status:403});
 try {
 const b=await req.json() as any;
 if(!['part','request','batch'].includes(b.kind)||typeof b.title!=='string'||!b.title.trim()||b.title.length>160||JSON.stringify(b).length>100000) return Response.json({error:'Invalid record'},{status:400});
 const id=b.id||crypto.randomUUID(), now=new Date().toISOString();
 const old=await env.DB!.prepare('SELECT * FROM records WHERE id=? AND owner=?').bind(id,u.userId).first<any>();
 if(b.id&&!old) return Response.json({error:'Not found'},{status:404});
 if(old&&old.revision!==b.revision) return Response.json({error:'This record changed. Reload before editing.'},{status:409});
 const revision=old?old.revision+1:1, body=JSON.stringify({...b,id,revision});
 if(old){
 const changed=await env.DB!.prepare('UPDATE records SET body=?,revision=?,updated=? WHERE id=? AND owner=? AND revision=?').bind(body,revision,now,id,u.userId,old.revision).run();
 if(!changed.meta.changes) return Response.json({error:'Concurrent update; reload and retry.'},{status:409});
 }else await env.DB!.prepare('INSERT INTO records (id,owner,kind,body,revision,updated) VALUES (?,?,?,?,?,?)').bind(id,u.userId,b.kind,body,revision,now).run();
 await env.DB!.prepare('INSERT INTO revisions (id,record_id,owner,body,revision,created) VALUES (?,?,?,?,?,?)').bind(crypto.randomUUID(),id,u.userId,body,revision,now).run();
 return Response.json({...b,id,revision,updated:now});
 }catch{return Response.json({error:'Could not save record. Try again.'},{status:500});}
}
