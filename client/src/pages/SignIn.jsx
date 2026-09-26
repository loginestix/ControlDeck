import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoMark from '../components/LogoMark.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function SignIn(){
  const {login}=useAuth();
  const navigate=useNavigate();
  const [form,setForm]=useState({email:'',password:''});
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(false);
  const submit=async(e)=>{e.preventDefault();setError('');setLoading(true);try{await login(form);navigate('/marketplace/library')}catch(err){setError(err.message)}finally{setLoading(false)}};
  return <main className="grid min-h-screen place-items-center px-5 py-10"><form onSubmit={submit} className="surface w-full max-w-md rounded-3xl p-7"><Link to="/" className="flex items-center gap-3"><LogoMark/><strong>Control Deck</strong></Link><h1 className="mt-10 text-3xl font-semibold">Welcome back</h1><p className="mt-2 text-sm text-white/45">Sign in to sync your marketplace library and plugin installs.</p><label className="mt-5 block"><span className="mb-2 block text-sm text-white/55">Email</span><input type="email" autoComplete="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-violet-400/60"/></label><label className="mt-5 block"><span className="mb-2 block text-sm text-white/55">Password</span><input type="password" autoComplete="current-password" required value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-violet-400/60"/></label>{error&&<p role="alert" className="mt-4 rounded-xl border border-red-400/20 bg-red-400/[.06] px-4 py-3 text-sm text-red-200">{error}</p>}<button disabled={loading} className="mt-6 w-full rounded-xl bg-white py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:opacity-60">{loading?'Signing in…':'Sign in'}</button><p className="mt-5 text-center text-sm text-white/45">New to Control Deck? <Link to="/signup" className="font-medium text-violet-200 hover:text-violet-100">Create an account</Link></p><Link to="/" className="mt-4 block text-center text-sm text-white/35">Back to website</Link></form></main>
}
