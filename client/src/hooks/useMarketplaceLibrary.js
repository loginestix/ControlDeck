import { useCallback, useEffect, useMemo, useState } from 'react';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

const KEY='control-deck-marketplace-library';
const CART_KEY='control-deck-marketplace-cart';
function read(key){try{return JSON.parse(localStorage.getItem(key)||'[]')}catch{return []}}

export function useMarketplaceLibrary(){
  const {isAuthenticated}=useAuth();
  const [library,setLibrary]=useState(()=>read(KEY));
  const [cart,setCart]=useState(()=>read(CART_KEY));
  const [syncing,setSyncing]=useState(false);
  const [message,setMessage]=useState('');

  useEffect(()=>localStorage.setItem(KEY,JSON.stringify(library)),[library]);
  useEffect(()=>localStorage.setItem(CART_KEY,JSON.stringify(cart)),[cart]);

  const refresh=useCallback(async()=>{
    if(!isAuthenticated)return;
    setSyncing(true);
    try{const rows=await api.entitlements();setLibrary(rows.map(x=>x.itemSlug))}catch(e){setMessage(e.message)}finally{setSyncing(false)}
  },[isAuthenticated]);
  useEffect(()=>{refresh()},[refresh]);

  const librarySet=useMemo(()=>new Set(library),[library]);
  const cartSet=useMemo(()=>new Set(cart),[cart]);

  const addFree=async(slug)=>{
    if(librarySet.has(slug))return;
    if(!isAuthenticated){setLibrary(prev=>[...new Set([...prev,slug])]);setMessage('Saved locally. Sign in to sync this item to your account.');return}
    try{await api.addFree(slug);await refresh();setMessage('Added to your Control Deck library.')}catch(e){setMessage(e.message)}
  };
  const toggleCart=(slug)=>setCart(prev=>prev.includes(slug)?prev.filter(x=>x!==slug):[...prev,slug]);
  const removeLibrary=(slug)=>setLibrary(prev=>prev.filter(x=>x!==slug));
  const clearCart=()=>setCart([]);
  const beginCheckout=async()=>{
    if(!isAuthenticated)throw new Error('Sign in before checkout.');
    const result=await api.checkout(cart);
    if(result.checkoutUrl)window.location.assign(result.checkoutUrl);
    return result;
  };
  const install=async(slug)=>{
    if(!isAuthenticated)throw new Error('Sign in to install marketplace products.');
    const result=await api.install(slug);
    // The installed desktop app registers the control-deck:// protocol.
    window.location.assign(result.deepLink);
    return result;
  };

  return {library,cart,librarySet,cartSet,addFree,toggleCart,removeLibrary,clearCart,beginCheckout,install,refresh,syncing,message,setMessage,isAuthenticated};
}
