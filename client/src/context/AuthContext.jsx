import { createContext, useContext, useMemo, useState } from 'react';
import { api } from '../services/api.js';

const AuthContext=createContext(null);
const TOKEN_KEY='control-deck-auth-token';
const USER_KEY='control-deck-auth-user';

function readUser(){
  try{return JSON.parse(localStorage.getItem(USER_KEY)||'null')}catch{return null}
}

export function AuthProvider({children}){
  const [token,setToken]=useState(()=>localStorage.getItem(TOKEN_KEY));
  const [user,setUser]=useState(readUser);
  const persist=(payload)=>{localStorage.setItem(TOKEN_KEY,payload.token);localStorage.setItem(USER_KEY,JSON.stringify(payload.user));setToken(payload.token);setUser(payload.user)};
  const login=async(credentials)=>{const payload=await api.login(credentials);persist(payload);return payload};
  const register=async(data)=>{const payload=await api.register(data);persist(payload);return payload};
  const logout=()=>{localStorage.removeItem(TOKEN_KEY);localStorage.removeItem(USER_KEY);setToken(null);setUser(null)};
  const value=useMemo(()=>({token,user,isAuthenticated:Boolean(token),login,register,logout}),[token,user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth=()=>useContext(AuthContext);
