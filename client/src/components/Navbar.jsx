import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import LogoMark from './LogoMark.jsx';
import Button from './Button.jsx';
import { AnimatePresence, motion } from 'framer-motion';

const links = [
  ['Product', '/'],
  ['Features', '/features'],
  ['Marketplace', '/marketplace'],
  ['Integrations', '/integrations'],
  ['Resources', '/resources'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Close sidebar
  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-deck-950/80 backdrop-blur-xl">
      <div className="page-shell flex h-18 items-center justify-between py-4">

        {/* LOGO */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-3"
          aria-label="Control Deck home"
        >
          <LogoMark />

          <span className="text-[15px] font-semibold tracking-[-0.02em]">
            Control Deck
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label="Primary navigation"
        >
          {links.map(([label, to]) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                `text-sm transition ${
                  isActive
                    ? 'text-white'
                    : 'text-white/55 hover:text-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="hidden items-center gap-3 lg:flex">
          <Button
            to="/download"
            variant="secondary"
            className="px-4 py-2.5"
          >
            Download
          </Button>

          <Button
            to="/signup"
            className="px-4 py-2.5"
          >
            Get Started
          </Button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          className="rounded-lg p-2 text-white transition hover:bg-white/5 lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence mode="wait">
        {open && (
          <>
            {/* BACKDROP */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-[3px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.22,
                ease: 'easeOut',
              }}
              onClick={closeMenu}
            />

            {/* SIDEBAR */}
            <motion.aside
              className="
                fixed left-0 top-0 z-50
                flex h-dvh w-[320px] max-w-[88vw]
                flex-col overflow-hidden
                border-r border-white/[0.08]
                bg-deck-950
                shadow-[20px_0_60px_rgba(0,0,0,0.45)]
                lg:hidden
              "
              initial={{
                x: '-100%',
                opacity: 0.8,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{
                x: '-100%',
                opacity: 0.8,
              }}
              transition={{
                type: 'spring',
                stiffness: 380,
                damping: 32,
                mass: 0.8,
              }}
            >

              {/* BACKGROUND GLOW */}
              <div
                className="
                  pointer-events-none absolute
                  -left-24 -top-24
                  h-64 w-64
                  rounded-full
                  bg-white/[0.025]
                  blur-3xl
                "
              />

              {/* HEADER */}
              <motion.div
                className="
                  relative flex items-center justify-between
                  border-b border-white/[0.08]
                  px-5 py-5
                "
                initial={{
                  opacity: 0,
                  y: -8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.08,
                  duration: 0.25,
                }}
              >
                {/* SIDEBAR LOGO */}
                <Link
                  to="/"
                  onClick={closeMenu}
                  className="flex items-center gap-3"
                  aria-label="Control Deck home"
                >
                  <LogoMark />

                  <span className="text-[15px] font-semibold tracking-[-0.02em]">
                    Control Deck
                  </span>
                </Link>

                {/* CLOSE BUTTON */}
                <button
                  type="button"
                  onClick={closeMenu}
                  className="
                    group flex h-9 w-9
                    items-center justify-center
                    rounded-lg
                    border border-white/[0.08]
                    bg-white/[0.035]
                    text-white/40
                    transition-all duration-200
                    hover:border-white/15
                    hover:bg-white/[0.08]
                    hover:text-white
                  "
                  aria-label="Close menu"
                >
                  <X
                    size={17}
                    strokeWidth={1.8}
                    className="transition-transform duration-200 group-hover:rotate-90"
                  />
                </button>
              </motion.div>

              {/* NAVIGATION AREA */}
              <nav className="relative flex-1 overflow-y-auto px-3 py-6">

                {/* NAVIGATION TITLE */}
                <motion.div
                  className="mb-3 flex items-center gap-3 px-3"
                  initial={{
                    opacity: 0,
                    x: -10,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.14,
                    duration: 0.25,
                  }}
                >
                  <span
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-white/30
                    "
                  >
                    Navigation
                  </span>

                  <div className="h-px flex-1 bg-white/[0.06]" />
                </motion.div>

                {/* NAV LINKS */}
                <div className="space-y-1">
                  {links.map(([label, to], index) => (
                    <motion.div
                      key={label}
                      initial={{
                        opacity: 0,
                        x: -18,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: -10,
                      }}
                      transition={{
                        delay: 0.16 + index * 0.045,
                        duration: 0.25,
                        ease: 'easeOut',
                      }}
                    >
                      <Link
                        to={to}
                        onClick={closeMenu}
                        className="
                          group relative flex items-center gap-3
                          overflow-hidden rounded-xl
                          border border-transparent
                          px-3 py-3.5
                          text-sm text-white/55
                          transition-all duration-200
                          hover:border-white/[0.08]
                          hover:bg-white/[0.055]
                          hover:text-white
                        "
                      >

                        {/* HOVER INDICATOR */}
                        <span
                          className="
                            absolute left-0 top-1/2
                            h-5 w-[2px]
                            -translate-y-1/2
                            rounded-full
                            bg-white
                            opacity-0
                            transition-opacity duration-200
                            group-hover:opacity-100
                          "
                        />

                        {/* NUMBER */}
                        <span
                          className="
                            flex h-7 w-7 shrink-0
                            items-center justify-center
                            rounded-lg
                            bg-white/[0.035]
                            text-[10px]
                            font-medium
                            text-white/25
                            transition-colors
                            group-hover:bg-white/[0.08]
                            group-hover:text-white/50
                          "
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        {/* LABEL */}
                        <span className="flex-1 font-medium">
                          {label}
                        </span>

                        {/* ARROW */}
                        <svg
                          className="
                            h-4 w-4
                            -translate-x-1
                            text-white/20
                            opacity-0
                            transition-all duration-200
                            group-hover:translate-x-0
                            group-hover:opacity-100
                            group-hover:text-white/60
                          "
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* MOBILE ACTIONS */}
                <motion.div
                  className="m-4"
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.32,
                    duration: 0.3,
                    ease: 'easeOut',
                  }}
                >

                  {/* DOWNLOAD */}
                  <div
                    onClick={closeMenu}
                    className="w-full"
                  >
                    <Button
                      to="/download"
                      variant="secondary"
                      className="w-full"
                    >
                      Download
                    </Button>
                  </div>

                  {/* GET STARTED */}
                  <div
                    onClick={closeMenu}
                    className="mt-5 w-full"
                  >
                    <Button
                      to="/signup"
                      className="w-full"
                    >
                      Get Started
                    </Button>
                  </div>

                </motion.div>
              </nav>

              {/* BOTTOM BORDER */}
              <div className="relative border-t border-white/[0.08]" />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
