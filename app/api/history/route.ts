import {env} from 'cloudflare:workers';
import {getChatGPTUser} from '../../chatgpt-auth';
export async function GET(req:Request){const u=await getChatGPTUser();if(!u)return Response.json({error:'Sign in required'},{status:401});const rows=await env.DB!.prepare('SELECT body,created FROM revisions WHERE record_id=? AND owner=? ORDER BY revision DESC').bind(new URL(req.url).searchParams.get('id'),u.userId).all();return Response.json(rows.results.map((r:any)=>({...JSON.parse(r.body),savedAt:r.created})));}
