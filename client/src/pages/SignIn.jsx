import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthShell from '../components/AuthShell.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function SignIn(){
  const {login}=useAuth();
  const navigate=useNavigate();
  const [form,setForm]=useState({email:'',password:''});
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(false);
  const submit=async(e)=>{e.preventDefault();setError('');setLoading(true);try{await login(form);navigate('/marketplace/library')}catch(err){setError(err.message)}finally{setLoading(false)}};
  return <AuthShell eyebrow="Sign in" title="Welcome back." description="Continue to your marketplace library and Control Deck account."><form onSubmit={submit}><label className="block"><span className="mb-2 block text-sm text-white/60">Email address</span><input type="email" autoComplete="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3.5 outline-none transition focus:border-violet-400/60 focus:ring-4 focus:ring-violet-400/[.08]"/></label><label className="mt-5 block"><span className="mb-2 block text-sm text-white/60">Password</span><input type="password" autoComplete="current-password" required value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3.5 outline-none transition focus:border-violet-400/60 focus:ring-4 focus:ring-violet-400/[.08]"/></label>{error&&<p role="alert" className="mt-4 rounded-xl border border-red-400/20 bg-red-400/[.06] px-4 py-3 text-sm text-red-200">{error}</p>}<button disabled={loading} className="mt-6 w-full rounded-xl bg-white py-3.5 text-sm font-semibold text-black transition hover:bg-white/90 disabled:opacity-60">{loading?'Signing in…':'Sign in to Control Deck'}</button><p className="mt-6 text-center text-sm text-white/45">New to Control Deck? <Link to="/signup" className="font-medium text-violet-200 hover:text-violet-100">Create an account</Link></p></form></AuthShell>
}
