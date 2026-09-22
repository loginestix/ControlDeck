import { useEffect, useMemo, useState } from 'react';
import { Video } from 'lucide-react';
import { api } from '../services/api.js';

const obsFallback={
  slug:'obs-studio',pluginId:'com.controldeck.obs-studio',name:'OBS Studio',creator:'ControlDeck',creatorSlug:'control-deck-labs',category:'Plugins',type:'Streaming',os:['Windows'],dial:false,free:true,featured:true,popular:100,recent:100,rating:5,downloads:'Official',price:'Free',icon:Video,accent:'violet',tagline:'Official OBS recording, scene, audio, transition and studio controls.',description:'The official ControlDeck integration for controlling OBS Studio through its local WebSocket server.',includes:['Recording and streaming controls','Scene and source actions','Audio mixer controls','Replay buffer and studio tools'],permissions:['Connect to the OBS WebSocket server configured on your computer'],gallery:['Recording controls','Scene actions','Audio and studio tools'],verified:true,version:'1.0.0'
};

const toCard=plugin=>({
  ...obsFallback,
  slug:plugin.marketplace?.slug||plugin.id,
  pluginId:plugin.id,
  name:plugin.name,
  creator:plugin.author,
  type:plugin.marketplace?.category||'Plugin',
  tagline:plugin.marketplace?.summary||'Verified ControlDeck plugin.',
  description:plugin.marketplace?.summary||'Verified ControlDeck plugin.',
  permissions:(plugin.permissions||[]).map(value=>`Requires ${value} permission`),
  includes:[`${plugin.actions?.length||0} available actions`,`Version ${plugin.version}`],
  version:plugin.version,
  verified:Boolean(plugin.marketplace?.verified),
  distribution:plugin.distribution,
});

export function useMarketplaceCatalog(){
  const [plugins,setPlugins]=useState([obsFallback]);
  const [marketplaceOnline,setMarketplaceOnline]=useState(false);
  useEffect(()=>{let active=true;api.desktopPlugins().then(result=>{if(active&&Array.isArray(result.plugins)&&result.plugins.length){setPlugins(result.plugins.map(toCard));setMarketplaceOnline(true)}}).catch(()=>{if(active)setMarketplaceOnline(false)});return()=>{active=false}},[]);
  const items=useMemo(()=>plugins,[plugins]);
  return {items,plugins,marketplaceOnline};
}
