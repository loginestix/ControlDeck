export default function LogoMark({ size = 34 }) {
  return (
    <div
      aria-hidden="true"
      className="grid place-items-center rounded-[10px] border border-white/15 bg-white/[0.06] shadow-inner"
      style={{ width: size, height: size }}
    >
      <div className="grid grid-cols-2 gap-[3px]">
        <span className="h-2.5 w-2.5 rounded-[3px] bg-white" />
        <span className="h-2.5 w-2.5 rounded-[3px] bg-white/40" />
        <span className="h-2.5 w-2.5 rounded-[3px] bg-white/40" />
        <span className="h-2.5 w-2.5 rounded-[3px] bg-deck-accent" />
      </div>
    </div>
  );
}
