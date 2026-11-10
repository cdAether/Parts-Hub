import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'AW11 Parts Exchange',description:'An organised route from rare parts to running cars.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>;}
