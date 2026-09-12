const API=import.meta.env.VITE_API_URL||'http://localhost:5000/api';
const TOKEN_KEY='control-deck-auth-token';
async function request(path,options={}){
  const token=localStorage.getItem(TOKEN_KEY);
  const res=await fetch(`${API}${path}`,{
    headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{ }),...(options.headers||{})},
    ...options
  });
  const payload=await res.json().catch(()=>({}));
  if(!res.ok){const error=new Error(payload.message||'Request failed');error.status=res.status;throw error}
  return res.status===204?null:payload;
}
export const api={
  plugins:(q='')=>request(`/plugins${q?`?q=${encodeURIComponent(q)}`:''}`),
  marketplace:()=>request('/marketplace'),
  login:(data)=>request('/auth/login',{method:'POST',body:JSON.stringify(data)}),
  register:(data)=>request('/auth/register',{method:'POST',body:JSON.stringify(data)}),
  entitlements:()=>request('/entitlements/me'),
  addFree:(slug)=>request(`/entitlements/free/${encodeURIComponent(slug)}`,{method:'POST'}),
  install:(slug,platform='desktop')=>request(`/entitlements/${encodeURIComponent(slug)}/install`,{method:'POST',body:JSON.stringify({platform})}),
  checkout:(slugs)=>request('/payments/checkout-session',{method:'POST',body:JSON.stringify({slugs})}),
};
