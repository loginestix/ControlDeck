import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import LogoMark from './LogoMark.jsx';
import Button from './Button.jsx';

const links = [
  ['Product', '/'], ['Features', '/features'], ['Marketplace', '/marketplace'],
  ['Integrations', '/integrations'], ['Resources', '/resources'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-deck-950/80 backdrop-blur-xl">
      <div className="page-shell flex h-18 items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3" aria-label="Control Deck home">
          <LogoMark />
          <span className="text-[15px] font-semibold tracking-[-0.02em]">Control Deck</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
          {links.map(([label, to]) => (
            <NavLink key={label} to={to} className={({ isActive }) => `text-sm transition ${isActive ? 'text-white' : 'text-white/55 hover:text-white'}`}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/signin" className="text-sm text-white/65 hover:text-white">Sign In</Link>
          <Button to="/download" variant="secondary" className="px-4 py-2.5">Download</Button>
          <Button to="/download" className="px-4 py-2.5">Get Started</Button>
        </div>

        <button className="rounded-lg p-2 text-white lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/8 bg-deck-950 lg:hidden">
          <nav className="page-shell grid gap-1 py-5">
            {links.map(([label, to]) => <Link onClick={() => setOpen(false)} key={label} to={to} className="rounded-lg px-3 py-3 text-sm text-white/70 hover:bg-white/5 hover:text-white">{label}</Link>)}
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Button to="/download" variant="secondary">Download</Button>
              <Button to="/download">Get Started</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
