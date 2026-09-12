const groups = ['Streamers','Gamers','Creators','Developers','Productivity','Professionals'];
export default function TrustStrip() {
  return <section className="border-y border-white/8"><div className="page-shell flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5 sm:justify-between">{groups.map(g => <span key={g} className="text-xs font-medium tracking-wide text-white/35">{g}</span>)}</div></section>;
}
