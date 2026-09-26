import { Link } from 'react-router-dom';

export default function MarketplacePreviewArt({ item, to, className = '', overlay = true, children }) {
  const isObs=item.slug==='obs-studio';
  const content = <div className={`group relative aspect-video overflow-hidden border border-white/10 bg-[#090b10] ${className}`}>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(107,92,255,.18),transparent_38%)]" />
    {isObs&&<div className="absolute inset-0 bg-[linear-gradient(145deg,#111521_0%,#080a0f_58%,#161126_100%)]"/>}
    <img
      src={isObs?'/marketplace-previews/obs-logo.svg':`/marketplace-previews/${item.slug}.svg`}
      alt={`${item.name} marketplace preview`}
      loading="lazy"
      className={isObs?'absolute left-1/2 top-[40%] h-[36%] w-auto -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_20px_60px_rgba(0,0,0,.7)] transition duration-500 group-hover:scale-105':'absolute inset-0 h-full w-full object-contain transition duration-500 group-hover:scale-[1.012]'}
    />
    {isObs&&<div className="absolute left-0 right-0 top-[62%] text-center"><p className="text-xl font-semibold tracking-[-.02em] text-white">OBS Studio</p><p className="mt-1 text-xs uppercase tracking-[.16em] text-white/35">Official integration</p></div>}
    {overlay && <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent" />}
    {children}
  </div>;
  return to ? <Link to={to} className="block">{content}</Link> : content;
}
