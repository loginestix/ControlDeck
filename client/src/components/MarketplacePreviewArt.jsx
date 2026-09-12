import { Link } from 'react-router-dom';

export default function MarketplacePreviewArt({item,to,className='',overlay=true,children}){
  const content=<div className={`group relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-[#090b10] ${className}`}>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(107,92,255,.10),transparent_38%)]"/>
    <img
      src={`/marketplace-previews/${item.slug}.svg`}
      alt={`${item.name} marketplace preview`}
      loading="lazy"
      className="absolute inset-0 h-full w-full object-contain p-1.5 transition duration-500 group-hover:scale-[1.012] sm:p-2"
    />
    {overlay&&<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent"/>}
    {children}
  </div>;
  return to?<Link to={to} className="block">{content}</Link>:content;
}
