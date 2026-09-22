import { Radio, Palette, Workflow, Volume2, Zap, Layers3, Keyboard, MonitorUp, Bot, SlidersHorizontal, Github, Youtube, MessageCircle, Music2, Terminal, Box, Video, WandSparkles, Globe2 } from 'lucide-react';

export const features=[
['Custom Actions','Build buttons that do exactly what your workflow needs.',Zap],['Multi-Profile Support','Switch layouts by app, task, game, or workspace.',Layers3],['App Integrations','Connect creative, streaming and productivity tools.',Box],['Plugin System','Extend Control Deck with installable capabilities.',Workflow],['Custom Icons','Give every action a clear visual identity.',Palette],['Macros','Chain keyboard, mouse and app commands.',Keyboard],['Multi-Actions','Run sequenced operations from a single control.',SlidersHorizontal],['Audio Controls','Mix sources, mute channels and control playback.',Volume2],['Stream Controls','Scenes, recording, chat and broadcast actions.',Radio],['Automation','Trigger repeatable routines with fewer manual steps.',Bot],['Dynamic Profiles','Surface the right controls when context changes.',MonitorUp],['Custom Workflows','Combine actions into purpose-built control systems.',WandSparkles]];

export { marketplace, marketplaceTabs } from './marketplaceData.js';
import { marketplace } from './marketplaceData.js';

export const plugins=marketplace.filter(x=>x.category==='Plugins').map(x=>({
  name:x.name,slug:x.slug,category:x.type,desc:x.tagline,rating:x.rating,downloads:x.downloads,icon:x.icon
}));

export const iconPacks=marketplace.filter(x=>x.category==='Icons').map(x=>({
  slug:x.slug,name:x.name,creator:x.creator,count:Number((x.includes?.[0]||'0').match(/\d+/)?.[0]||0),rating:x.rating,price:x.price,icon:x.icon,style:x.style,theme:x.theme,color:x.color
}));

export const integrations=[['Streaming','OBS','Twitch','YouTube','Discord'],['Creative','Adobe apps','DaVinci Resolve','Figma','Audition'],['Productivity','Notion','Slack','Google tools','Spotify'],['Development','GitHub','VS Code','Terminal','Browser'],['System','Windows','macOS','Linux','System actions']];
export const resources=[
{slug:'build-your-first-profile',tag:'Tutorial',title:'Build your first Control Deck profile',copy:'Learn the basics of buttons, actions and folders.',body:['Start with one workflow you use often, then group related actions into a single profile.','Use folders when a task needs more controls than one page can comfortably show.','Keep labels short and test the profile while working so the most important actions stay easiest to reach.']},
{slug:'cleaner-streaming-workflow',tag:'Guide',title:'A cleaner streaming workflow',copy:'Organize scenes, audio and chat without clutter.',body:['Separate scene controls from audio controls so accidental presses are less likely.','Put high-frequency actions on the first page and secondary controls inside clearly named folders.','Use consistent icon language so you can recognize controls quickly during a live session.']},
{slug:'plugin-architecture-overview',tag:'Development',title:'Plugin architecture overview',copy:'Understand the planned plugin API and permission model.',body:['Control Deck plugins are designed around explicit actions and clearly scoped permissions.','The marketplace architecture keeps plugin metadata separate from the application UI so catalog data can later come from the API.','Production plugin distribution should include versioning, compatibility information and clear documentation.']},
{slug:'five-profiles-for-deep-work',tag:'Ideas',title:'Five profiles for deep work',copy:'Create context-specific layouts for focused work.',body:['Use one profile for communication, one for writing, one for development, one for media controls and one for review tasks.','Context-specific profiles reduce visual noise and make common actions easier to find.','Start small and expand only when a repeated workflow proves it needs dedicated controls.']},
{slug:'designing-for-extensibility',tag:'Update',title:'Designing Control Deck for extensibility',copy:'Why the product is built around reusable actions.',body:['Reusable actions make it easier to compose different profiles without duplicating behavior.','A consistent action model also creates a clearer path for plugin developers and future automation features.','The website architecture mirrors this approach by keeping marketplace data and reusable presentation components separate.']},
{slug:'marketplace-foundations',tag:'Announcement',title:'Marketplace foundations',copy:'A look at the creator ecosystem architecture.',body:['The marketplace is organized around discoverable product types such as plugins, profiles, icon packs, screensavers and soundboards.','Each item has a dedicated detail route so users can review information before installing or downloading.','Search and category navigation are designed to scale when the catalog is connected to live backend data.']}
];
