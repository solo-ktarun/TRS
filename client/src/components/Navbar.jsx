import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { API_URL } from '../config';
import { ShieldCheck } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ role, setRole }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeHash, setActiveHash] = useState('');
    const [memberLoginEnabled, setMemberLoginEnabled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await fetch(`${API_URL}/settings`);
                if (response.ok) {
                    const data = await response.json();
                    setMemberLoginEnabled(data.memberLoginEnabled || false);
                }
            } catch (error) {
                console.error("Failed to fetch settings for navbar", error);
            }
        };
        fetchSettings();
    }, []);

    // Helper to handle smooth scrolling or cross-page hash navigation
    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        setActiveHash(targetId || '');

        if (location.pathname !== '/') {
            // Unconditionally navigate to home first, then append hash if needed
            navigate(`/${targetId ? `#${targetId}` : ''}`);
        } else {
            // If already on home, just scroll
            if (targetId) {
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
<nav
    className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
            ? 'glassmorphism py-3 shadow-[0_10px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl'
            : 'bg-transparent py-5'
    }`}
>
            <div className="w-full max-w-[1600px]
px-6 xl:px-10 justify-left items-left flex">
                {/* Logo */}
                <Link to="/" onClick={(e) => handleNavClick(e, null)} className="flex items-center gap-2 sm:gap-3 cursor-pointer group flex-shrink-0 mr-4">
                    <div className="
relative
w-8 h-8
sm:w-10 sm:h-10
lg:w-12 lg:h-12
flex-shrink-0
rounded-full
overflow-hidden
border-2
border-white/20
shadow-[0_0_15px_rgba(255,255,255,0.1)]
group-hover:scale-125
group-hover:border-neon-purple
group-hover:shadow-[0_0_35px_rgba(255,209,102,0.5)]
transition-all
duration-500
">
                        <img src="/TRS_LOGO.png" alt="TRS Logo" className="w-full h-full object-contain bg-black group-hover:scale-125 transition-all
duration-500" />
                    </div>
                    <div className="flex flex-col justify-center">
    <span className="font-heading font-black text-[12px] sm:text-sm md:text-lg lg:text-2xl tracking-widest sm:tracking-[0.2em] text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] leading-none transition-all whitespace-nowrap overflow-hidden text-ellipsis">
        TRS CREW
    </span>

    <span className="hidden md:block text-[10px] uppercase tracking-[0.35em] text-white/40 mt-1 group-hover:text-white transition-all duration-500">
        EST. 2024
    </span>
</div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden xl:flex flex-shrink-0 items-center justify-end gap-2 xl:gap-3 2xl:gap-5 ml-auto">
                    <div className="hidden 2xl:flex items-center gap-4 mr-6 group">

    <div className="
    flex
    items-center
    gap-2

    px-3
    py-1.5

    rounded-full

    bg-transparent
    border
    border-purple-500/20

    group-hover:bg-neon-purple/75
    transition-all
    duration-500

    ">

        <span className="w-2 h-2 rounded-full bg-neon-purple/50 animate-pulse group-hover:bg-neon-red"></span>

        <span className="text-[10px] uppercase tracking-[0.25em] text-purple-300 group-hover:tracking-[0.5em] group-hover:text-white transition-all duration-500">
            Crew Online
        </span>

    </div>
    </div>
                    {role !== 'smartadmin' && (
                        <>
                            <a href="#meets" onClick={(e) => handleNavClick(e, 'meets')} className={`group relative nav-link-premium text-sm uppercase tracking-widest transition-all duration-300 hover:-translate-y-[2px] whitespace-nowrap ${location.pathname === '/' && activeHash === 'meets' ? 'text-neon-purple text-glow-purple' : 'text-white/70 hover:text-white hover:text-glow'}`}><span className="relative"> Meets</span></a>
                            <a href="#event-archives" onClick={(e) => handleNavClick(e, 'event-archives')} className={`nav-link-premium text-sm uppercase tracking-widest transition-all duration-300 hover:-translate-y-[2px] whitespace-nowrap ${location.pathname === '/' && activeHash === 'event-archives' ? 'text-neon-purple text-glow-purple' : 'text-white/70 hover:text-white hover:text-glow'}`}><span className="relative"> Events</span></a>
                            <a href="#community" onClick={(e) => handleNavClick(e, 'community')} className={`nav-link-premium text-sm uppercase tracking-widest transition-all duration-300 hover:-translate-y-[2px] whitespace-nowrap ${location.pathname === '/' && activeHash === 'community' ? 'text-neon-purple text-glow-blue' : 'text-white/70 hover:text-white hover:text-glow'}`}>Community</a>
                            <Link
  to="/members"
  onClick={() => setActiveHash('')}
  className={`group relative nav-link-premium text-sm uppercase tracking-widest transition-all duration-300 hover:-translate-y-[2px] whitespace-nowrap  ${
    location.pathname === '/members'
      ? 'gradient-text'
      : 'text-white/70 hover:text-white hover:text-glow'
  }`}
>
  Members
</Link>
                            <Link to="/laws" onClick={() => setActiveHash('')} className={`group relative nav-link-premium text-sm uppercase tracking-widest transition-all duration-300 hover:-translate-y-[2px] whitespace-nowrap ${location.pathname === '/laws' ? 'text-neon-red text-glow-red' : 'text-white/70 hover:text-white hover:text-glow'}`}>Laws</Link>
                            <Link to="/memes" onClick={() => setActiveHash('')} className={`group relative nav-link-premium text-sm uppercase tracking-widest transition-all duration-300 hover:-translate-y-[2px] whitespace-nowrap ${location.pathname === '/memes' ? 'text-[#FF00FF] text-glow-purple' : 'text-white/70 hover:text-white hover:text-glow'}`}>Memes</Link>
                            <Link to="/timezones" onClick={() => setActiveHash('')} className={`group relative nav-link-premium text-sm uppercase tracking-widest transition-all duration-300 hover:-translate-y-[2px] whitespace-nowrap ${location.pathname === '/timezones' ? 'active bg-gradient-to-r from-electric-blue via-white to-electric-blue bg-clip-text text-transparent' : 'text-white/70 hover:text-white hover:text-glow'}`}>Timezone</Link>
                        </>
                    )}
                    {role === 'user' && (

                        <>
                            <Link to="/feedback" onClick={() => setActiveHash('')} className={`group relative nav-link-premium text-sm uppercase tracking-widest transition-all duration-300 hover:-translate-y-[2px] whitespace-nowrap ${location.pathname === '/feedback' ? 'active bg-gradient-to-l from-electric-blue via-white to-neon-purple bg-clip-text text-transparent' : 'text-white/70 hover:text-white hover:text-glow'}`}>Feedbacks</Link>                            
                            {memberLoginEnabled && (
                                <Link to="/member-login" onClick={() => setActiveHash('')} className={`group relative px-3 py-3 overflow-hidden rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:-translate-y-[2px] border ${location.pathname === '/member-login' ? 'bg-neon-purple/20 text-white border-neon-purple shadow-[0_0_15px_rgba(176,38,255,0.4)]' : 'bg-transparent text-white/90 border-white/20 hover:border-neon-purple hover:shadow-[0_0_20px_rgba(176,38,255,0.5)]'}`}>
                                        <div
        className="
        absolute
        inset-0

        bg-gradient-to-r
        from-neon-purple/0
        via-neon-purple/10
        to-neon-purple/0

        opacity-0

        group-hover:opacity-100

        transition-opacity
        duration-500

        pointer-events-none
        "
    />
                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-neon-purple/0 via-neon-purple/20 to-neon-purple/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>
                                    <span className="relative z-10 flex items-center gap-2">
                                        <ShieldCheck
    size={14}
    className="
    text-neon-purple

    group-hover:rotate-12

    transition-transform
    duration-300
    "
/>

    <div className="relative">
        <span className="w-2 h-2 rounded-full bg-neon-purple block" />
        <span className="absolute inset-0 rounded-full bg-neon-purple animate-ping opacity-75" />
    </div>

    <span className="flex flex-col leading-none">
        <span className="text-[11px] uppercase tracking-[0.2em]">
            Crew Portal
        </span>

        <span className="text-[8px] text-white/40 tracking-widest mt-1">
            Authorized Members
        </span>
    </span>
                                        <div className="relative">
    <span className="w-2 h-2 rounded-full bg-neon-purple block" />
    <span className="absolute inset-0 rounded-full bg-neon-purple animate-ping opacity-75" />
</div>
                                    </span>
                                </Link>
                            )}
                        </>
                    )}
                    {role === 'member' && (
                        <Link to="/member-dashboard" onClick={() => setActiveHash('')} className={`nav-link-premium text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap ${location.pathname === '/member-dashboard' ? 'text-neon-purple text-glow-purple' : 'text-neon-purple/70 hover:text-neon-purple hover:text-glow-purple'}`}>Garage Sync</Link>
                    )}
                    {role !== 'user' && role !== 'smartadmin' && role !== 'member' && (
    <Link
        to="/manage-feedbacks"
        onClick={() => setActiveHash('')}
        className={`group relative nav-link-premium text-sm uppercase tracking-widest transition-all duration-300 hover:-translate-y-[2px] whitespace-nowrap ${
            location.pathname === '/manage-feedbacks'
                ? 'active bg-gradient-to-l from-electric-blue via-white to-neon-purple bg-clip-text text-transparent'
                : 'text-white/70 hover:text-white hover:text-glow'
        }`}
    >
        Feedbacks
    </Link>
)}
                    {role === 'superadmin' && (
                        <Link to="/controls" onClick={() => setActiveHash('')} className={`group relative nav-link-premium text-sm uppercase tracking-widest transition-all duration-300 hover:-translate-y-[2px] whitespace-nowrap ${location.pathname === '/controls' ? 'text-neon-purple text-glow-purple' : 'text-white/70 hover:text-white hover:text-glow'}`}>Controls</Link>
                    )}
                    {role === 'smartadmin' && (
                        <span className={`group relative text-sm uppercase tracking-widest transition-all duration-300 hover:-translate-y-[2px] whitespace-nowrap text-neon-purple text-glow-purple`}>Smart Controls</span>
                    )}

                    {role === 'user' && (

<Link
    to="/admin-login"
    onClick={() => setActiveHash('')}
    className={`
        group

        flex
        items-center
        gap-2

        px-3
        py-2

        rounded-full

        border

        transition-all
        duration-500
        overflow-hidden

        ${
            location.pathname === "/admin-login"
                ? "border-red-500 bg-red-500/10 text-red-400"
                : "border-white/10 text-white/50 hover:border-red-500 hover:text-red-400 hover:bg-red-500/10"
        }
    `}
>

    <ShieldCheck
    size={15}
    className="
        group-hover:rotate-12
        group-hover:scale-110
        transition-all
        duration-300
    "
/>
<div className="relative">

    <span className="block w-2 h-2 rounded-full bg-red-500" />

    <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />

</div>

    <span
    className="
        max-w-0
        overflow-hidden
        whitespace-nowrap

        group-hover:max-w-20

        transition-all
        duration-500

        text-[10px]
        font-black
        uppercase
        tracking-[0.35em]
    "
>
    ADMIN
</span>

</Link>

)}

                    {role !== 'user' && (
                        <div className="flex items-center flex-shrink-0 bg-black/50 border border-neon-red/50 hover:border-neon-red transition-all duration-500 rounded p-1 ml-4 shadow-[0_0_10px_rgba(255,51,102,0.2)] backdrop-blur-md whitespace-nowrap">
                            <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-electric-blue hover:text-white transition-all duration-500 flex-shrink-0">{role}</span>
                            <button onClick={() => { localStorage.removeItem('trs_role'); setRole('user'); navigate('/'); }} className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded bg-neon-red/20 text-neon-red hover:bg-neon-red hover:tracking-[0.25em] hover:text-white transition-all duration-500 flex-shrink-0">
                                Logout
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <div className="xl:hidden">
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="xl:hidden absolute top-full left-0 w-full bg-[#050505]/95 backdrop-blur-xl py-6 px-6 flex flex-col gap-4 border-b border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                    <div className="mb-4 pb-4 border-b border-white/10">

    <div className="text-lg font-black tracking-widest">
        THE ROYAL SORCERERS
    </div>

    <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mt-2">
        Crew Navigation
    </div>

</div>

{role !== 'smartadmin' && (
                        <>
                            <a href="#meets" className={`text-sm uppercase tracking-widest ${location.pathname === '/' && activeHash === 'meets' ? 'text-neon-purple' : 'text-white/80 hover:text-white'}`} onClick={(e) => handleNavClick(e, 'meets')}><span className="relative"> Meets</span></a>
                            <a href="#event-archives" className={`text-sm uppercase tracking-widest ${location.pathname === '/' && activeHash === 'garage-intro' ? 'text-neon-purple' : 'text-white/80 hover:text-white'}`} onClick={(e) => handleNavClick(e, 'event-archives')}><span className="relative">Events</span></a>
                            <a href="#community" className={`text-sm uppercase tracking-widest ${location.pathname === '/' && activeHash === 'community' ? 'text-neon-purple' : 'text-white/80 hover:text-white'}`}onClick={(e) => handleNavClick(e, 'community')}>Community</a>
                            <Link to="/members" className={`nav-link-premium text-sm uppercase tracking-widest ${location.pathname === '/members' ? 'text-electric-blue' : 'text-white/80 hover:text-white'}`} onClick={() => { setMobileMenuOpen(false); setActiveHash(''); }}>Members</Link>
                            <Link to="/laws" className={`nav-link-premium text-sm uppercase tracking-widest ${location.pathname === '/laws' ? 'text-neon-red/75' : 'text-white/80 hover:text-white'}`} onClick={() => { setMobileMenuOpen(false); setActiveHash(''); }}>Laws</Link>
                            <Link to="/memes" className={`nav-link-premium text-sm uppercase tracking-widest ${location.pathname === '/memes' ? 'text-[#FF00FF]' : 'text-white/80 hover:text-white'}`} onClick={() => { setMobileMenuOpen(false); setActiveHash(''); }}>Memes</Link>
                            <Link to="/timezones" className={`nav-link-premium text-sm uppercase tracking-widest ${location.pathname === '/timezones' ? 'text-white' : 'text-white/80 hover:text-white'}`} onClick={() => { setMobileMenuOpen(false); setActiveHash(''); }}>Timezone</Link>
                        </>
                    )}
                    
                    {role === 'user' && (

                        <>
                            <Link to="/feedback" className={`nav-link-premium text-sm uppercase tracking-widest ${location.pathname === '/feedback' ? 'text-electric-blue' : 'text-white/80 hover:text-white'}`} onClick={() => { setMobileMenuOpen(false); setActiveHash(''); }}>Feedback</Link>
                            {memberLoginEnabled && (
                                <Link to="/member-login" className={`relative overflow-hidden mt-2 flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-widest rounded border transition-all duration-300 ${location.pathname === '/member-login' ? 'bg-neon-purple/20 text-white border-neon-purple shadow-[0_0_15px_rgba(176,38,255,0.4)]' : 'bg-black/30 text-white/90 border-white/20 hover:border-neon-purple hover:bg-neon-purple/10'}`} onClick={() => { setMobileMenuOpen(false); setActiveHash(''); }}>
                                    <span className="w-2 h-2 rounded-full bg-neon-purple animate-pulse shadow-[0_0_8px_rgba(176,38,255,1)]"></span>
                                    Member Access
                                </Link>
                            )}

                            <Link
    to="/admin-login"
    onClick={() => {
        setMobileMenuOpen(false);
        setActiveHash('');
    }}
    className={`
group

relative

flex
items-center
gap-2

px-3
py-2

rounded-full

border
border-red-500/20

bg-red-500/[0.03]

text-red-400/70

hover:text-red-300

hover:border-red-500

hover:bg-red-500/10

hover:shadow-[0_0_20px_rgba(239,68,68,.35)]

transition-all
duration-500
`}
>

    <ShieldCheck
    size={14}
    className="
    group-hover:rotate-12
    group-hover:scale-110
    transition-all
    duration-300
    "
/>


    Admin Login


</Link>
                        </>

                        
                    )}
                    {role === 'member' && (
                        <Link to="/member-dashboard" className={`nav-link-premium text-sm font-bold uppercase tracking-widest ${location.pathname === '/member-dashboard' ? 'text-neon-purple' : 'text-neon-purple/80 hover:text-neon-purple'}`} onClick={() => { setMobileMenuOpen(false); setActiveHash(''); }}>Garage Sync</Link>
                    )}
                    {role !== 'user' && role !== 'smartadmin' && role !== 'member' && (
                        <Link to="/manage-feedbacks" className={`nav-link-premium text-sm uppercase tracking-widest ${location.pathname === '/manage-feedbacks' ? 'text-green-400' : 'text-white/80 hover:text-white'}`} onClick={() => { setMobileMenuOpen(false); setActiveHash(''); }}>Feedbacks</Link>
                    )}
                    {role === 'superadmin' && (
                        <Link to="/controls" className={`nav-link-premium text-sm uppercase tracking-widest ${location.pathname === '/controls' ? 'text-neon-purple' : 'text-white/80 hover:text-white'}`} onClick={() => { setMobileMenuOpen(false); setActiveHash(''); }}>Controls</Link>
                    )}
                    {role === 'smartadmin' && (
                        <span className={`text-sm uppercase tracking-widest text-neon-purple`} onClick={() => setMobileMenuOpen(false)}>Smart Controls</span>
                    )}

                    {role !== 'user' && (
                        <div className="mt-4 flex flex-col gap-2">
                            <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Logged in as {role}</span>
                            <button onClick={() => { localStorage.removeItem('trs_role'); setRole('user'); setMobileMenuOpen(false); navigate('/'); }} className="w-full py-2 bg-neon-red/20 text-neon-red text-xs hover:tracking-[0.25em] font-bold uppercase tracking-widest rounded border border-neon-red/50 hover:text-white hover:bg-neon-red/60 transition-all duration-500">
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
