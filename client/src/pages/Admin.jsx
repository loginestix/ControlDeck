import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../services/api.js';

export default function Admin(){
  const {user}=useAuth();
  const [data,setData]=useState(null);
  const [error,setError]=useState('');
  useEffect(()=>{if(user?.role==='admin')api.adminOverview().then(setData).catch(e=>setError(e.message))},[user]);
  if(!user)return <><PageHero eyebrow="Admin" title="Authentication required." description="Sign in with an authorized administrator account to continue."/><section className="page-shell pb-24"><Link to="/signin" className="inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black">Sign in</Link></section></>;
  if(user.role!=='admin')return <PageHero eyebrow="Admin" title="Access denied." description="This area is restricted to Control Deck administrators."/>;
  const stats=data?.stats||{};
  return <><PageHero eyebrow="Admin" title="Marketplace operations." description="Live operational data from the protected Control Deck API."/><section className="page-shell pb-24">{error&&<p className="mb-5 rounded-xl border border-red-400/20 bg-red-400/[.06] p-4 text-red-200">{error}</p>}<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{[['Users',stats.users],['Owned items',stats.entitlements],['Downloads',stats.downloads],['Paid orders',stats.orders],['New messages',stats.messages]].map(([name,value])=><div className="surface rounded-2xl p-5" key={name}><p className="text-sm text-white/40">{name}</p><p className="mt-3 text-3xl font-semibold">{value??'—'}</p></div>)}</div></section></>;
}
