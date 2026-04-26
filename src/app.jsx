import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarDays, ChevronLeft, ChevronRight, Cross, Home, Info, BookOpen, Shield, Users, Sparkles, Clock, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react'
import headshot from './assets/headshot.jpeg'
import pdtLogo from './assets/pdt-logo.webp'
import unccLogo from './assets/uncc-logo.png'
import crest from './assets/pdt-crest.png'
import shield from './assets/pdt-shield.png'
import letters from './assets/pdt-letters.png'
import "./index.css";

const NAV = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'calendar', label: 'Calendar', icon: CalendarDays },
  { key: 'scripture', label: 'Scripture Plan', icon: BookOpen },
  { key: 'about', label: 'About', icon: Info },
]

const PLAN = [
  { date: '2026-08-20', book: 'John', passage: 'John 1:1–14', title: 'Who Jesus Is', explanation: 'A foundation for understanding Jesus as the Word, the light, and the one who reveals God to us.' },
  { date: '2026-08-27', book: 'John', passage: 'John 3:16–21', title: 'Salvation & Purpose', explanation: 'A clear look at God’s love, salvation through Christ, and what it means to step into the light.' },
  { date: '2026-09-03', book: 'John', passage: 'John 8:12', title: 'Direction in Life', explanation: 'Jesus as the light of the world and the source of direction when life feels unclear.' },
  { date: '2026-09-10', book: 'John', passage: 'John 10:10', title: 'Living with Purpose', explanation: 'Understanding the difference between empty living and the abundant life Jesus calls us toward.' },
  { date: '2026-09-17', book: 'Philippians', passage: 'Philippians 1:6', title: 'Growth Takes Time', explanation: 'Confidence that God is still working in us even when progress feels slow.' },
  { date: '2026-09-24', book: 'Philippians', passage: 'Philippians 1:21', title: 'Purpose-Driven Life', explanation: 'A challenge to center life around Christ instead of pressure, image, or temporary success.' },
  { date: '2026-10-01', book: 'Philippians', passage: 'Philippians 3:13–14', title: 'Let Go & Move Forward', explanation: 'Leaving the past behind and pressing toward the man God is calling you to become.' },
  { date: '2026-10-08', book: 'Philippians', passage: 'Philippians 4:6–7', title: 'Anxiety & Peace', explanation: 'How prayer, trust, and gratitude help steady the mind under stress.' },
  { date: '2026-10-15', book: 'Philippians', passage: 'Philippians 4:8', title: 'Control Your Thoughts', explanation: 'A practical study on mindset, focus, and guarding what shapes your inner life.' },
  { date: '2026-10-22', book: 'Philippians', passage: 'Philippians 4:11–13', title: 'Strength & Contentment', explanation: 'Real confidence is not based on perfect circumstances, but on strength through Christ.' },
  { date: '2026-10-29', book: 'Philippians', passage: 'Philippians 2:3–8', title: 'Leadership & Humility', explanation: 'Christlike leadership means serving, sacrificing, and putting others before yourself.' },
  { date: '2026-11-05', book: 'Philippians', passage: 'Philippians 1:27', title: 'Living with Integrity', explanation: 'A call to live consistently and honorably, whether people are watching or not.' },
  { date: '2026-11-12', book: 'Colossians', passage: 'Colossians 1:16–17', title: 'Purpose & Identity', explanation: 'A reminder that we were created through Christ and for Christ, giving life deeper purpose.' },
  { date: '2026-11-19', book: 'Colossians', passage: 'Colossians 2:6–7', title: 'Staying Grounded', explanation: 'How to stay rooted in faith, discipline, and gratitude when life gets busy.' },
  { date: '2026-12-03', book: 'Colossians', passage: 'Colossians 3:1–2', title: 'Focus & Priorities', explanation: 'A challenge to set your mind on higher things and live with clearer priorities.' },
  { date: '2026-12-10', book: 'Colossians', passage: 'Colossians 3:12–17', title: 'Character, Brotherhood & Action', explanation: 'A semester close focused on compassion, forgiveness, love, gratitude, and daily action.' },
]

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DOW = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const today = new Date()
const todayNoTime = new Date(today.getFullYear(), today.getMonth(), today.getDate())
const fmt = (date) => date.toISOString().slice(0,10)
const pretty = (iso) => new Date(`${iso}T12:00:00`).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
const addDays = (iso, days) => { const d = new Date(`${iso}T00:00:00`); d.setDate(d.getDate()+days); return d }
function getCurrentStudy() {
  const now = new Date()
  return PLAN.find((item, i) => {
    const start = new Date(`${item.date}T00:00:00`)
    const nextSwitch = addDays(item.date, 1)
    const next = PLAN[i+1]
    const nextStart = next ? addDays(next.date, 1) : new Date('2027-01-01T00:00:00')
    return now >= nextSwitch && now < nextStart
  }) || PLAN.find(x => new Date(`${x.date}T00:00:00`) >= todayNoTime) || PLAN[PLAN.length-1]
}
function statusFor(item) {
  const current = getCurrentStudy()
  const d = new Date(`${item.date}T12:00:00`)
  const c = new Date(`${current.date}T12:00:00`)
  if (item.date === current.date) return 'Present'
  return d < c ? 'Past' : 'Future'
}

function App() {
  const [active, setActive] = useState('home')
  const [monthDate, setMonthDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const currentStudy = getCurrentStudy()
  const animation = { initial:{opacity:0,y:14}, animate:{opacity:1,y:0}, exit:{opacity:0,y:-10}, transition:{duration:.25} }

  const renderPage = () => {
    if (active === 'home') return <motion.div key="home" {...animation}><HomePage setActive={setActive} currentStudy={currentStudy} /></motion.div>
    if (active === 'calendar') return <motion.div key="calendar" {...animation}><CalendarPage monthDate={monthDate} setMonthDate={setMonthDate} /></motion.div>
    if (active === 'scripture') return <motion.div key="scripture" {...animation}><ScripturePage currentStudy={currentStudy} /></motion.div>
    return <motion.div key="about" {...animation}><AboutPage /></motion.div>
  }
  return <div className="min-h-screen bg-ink text-slate-100">
    <Background />
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#06110f]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
        <button onClick={() => setActive('home')} className="flex items-center gap-3 text-left">
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/95 p-2 shadow-glow"><img src={pdtLogo} className="h-full w-full object-contain" /></div>
          <div><div className="text-sm font-bold uppercase tracking-[.24em] text-azure">Phi Delta Theta</div><div className="text-sm text-slate-400">NC Epsilon Chaplain</div></div>
        </button>
        <nav className="hidden gap-2 rounded-full border border-white/10 bg-white/5 p-2 lg:flex">
          {NAV.map(item => { const Icon = item.icon; const on = active===item.key; return <button key={item.key} onClick={()=>setActive(item.key)} className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${on?'bg-white text-ink':'text-slate-300 hover:bg-white/10 hover:text-white'}`}><Icon className="h-4 w-4" />{item.label}</button>})}
        </nav>
      </div>
      <div className="mx-auto max-w-7xl px-5 pb-4 lg:hidden"><div className="flex gap-2 overflow-x-auto rounded-full border border-white/10 bg-white/5 p-2">{NAV.map(item => <button key={item.key} onClick={()=>setActive(item.key)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${active===item.key?'bg-white text-ink':'text-slate-300'}`}>{item.label}</button>)}</div></div>
    </header>
    <main className="mx-auto max-w-7xl px-5 py-10"><AnimatePresence mode="wait">{renderPage()}</AnimatePresence></main>
  </div>
}
function Background(){ return <div className="fixed inset-0 -z-10 overflow-hidden"><div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:58px_58px] opacity-50"/><div className="absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-azure/15 blur-3xl"/><div className="absolute bottom-0 left-0 h-[25rem] w-[25rem] rounded-full bg-pine/30 blur-3xl"/></div> }
function SectionHeader({eyebrow,title,subtitle}){ return <div className="mb-8 max-w-4xl"><div className="mb-4 inline-flex items-center gap-2 rounded-full border border-azure/20 bg-azure/10 px-3 py-1 text-xs font-bold uppercase tracking-[.22em] text-azure"><Sparkles className="h-3.5 w-3.5" />{eyebrow}</div><h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h1>{subtitle && <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">{subtitle}</p>}</div> }
function Card({children, className=''}){ return <div className={`rounded-[2rem] border border-white/10 bg-white/[.045] p-6 shadow-soft backdrop-blur ${className}`}>{children}</div> }
function Pill({children}){ return <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[.16em] text-slate-300">{children}</span> }
function HomePage({setActive,currentStudy}){ return <div><section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[.035] p-7 shadow-soft lg:p-10"><div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(143,199,232,.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(0,84,60,.45),transparent_40%)]"/><div className="relative grid gap-10 lg:grid-cols-[1.05fr_.95fr]"><div><Pill>Faith • Brotherhood • Accountability</Pill><h1 className="mt-6 text-5xl font-semibold tracking-tight text-white sm:text-7xl">A simple hub for weekly Bible study and spiritual growth.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">This site is built for Phi Delta Theta NC Epsilon brothers to see the weekly Bible study schedule, upcoming scripture, and the semester plan in one clean place.</p><p className="mt-4 max-w-2xl text-base leading-8 text-slate-400">Mission: build stronger men through faith in Christ, honest brotherhood, consistency, accountability, and real-life application.</p><div className="mt-8 flex flex-wrap gap-4"><button onClick={()=>setActive('calendar')} className="primary-btn">View Calendar <ArrowRight className="h-4 w-4" /></button><button onClick={()=>setActive('scripture')} className="secondary-btn">This Week’s Scripture</button></div></div><div className="grid gap-5"><Card><div className="flex items-center gap-4"><img src={crest} className="h-24 w-20 object-contain"/><div><div className="text-sm uppercase tracking-[.22em] text-azure">Upcoming Study</div><h3 className="mt-2 text-2xl font-semibold text-white">{currentStudy.title}</h3><p className="mt-1 text-slate-300">{currentStudy.passage}</p><p className="mt-4 text-sm leading-7 text-slate-400">{currentStudy.explanation}</p></div></div></Card><div className="grid grid-cols-2 gap-4"><Mini title="Meeting" value="Every Thursday" icon={Clock}/><Mini title="Location" value="TBD" icon={MapPin}/></div></div></div></section><section className="mt-8 grid gap-5 md:grid-cols-3"><Card><Shield className="h-7 w-7 text-azure"/><h3 className="mt-4 text-xl font-semibold">Friendship</h3><p className="mt-2 text-sm leading-7 text-slate-400">Build trust, openness, and real brotherhood.</p></Card><Card><BookOpen className="h-7 w-7 text-azure"/><h3 className="mt-4 text-xl font-semibold">Sound Learning</h3><p className="mt-2 text-sm leading-7 text-slate-400">Grow through Scripture, discipline, and honest discussion.</p></Card><Card><CheckCircle2 className="h-7 w-7 text-azure"/><h3 className="mt-4 text-xl font-semibold">Rectitude</h3><p className="mt-2 text-sm leading-7 text-slate-400">Live with integrity, morality, and accountability.</p></Card></section></div> }
function Mini({title,value,icon:Icon}){ return <Card className="p-5"><Icon className="h-5 w-5 text-azure"/><div className="mt-4 text-xs uppercase tracking-[.2em] text-slate-500">{title}</div><div className="mt-1 text-lg font-semibold text-white">{value}</div></Card> }
function CalendarPage({monthDate,setMonthDate}){ const cells = useMemo(()=>calendarCells(monthDate),[monthDate]); const y=monthDate.getFullYear(), m=monthDate.getMonth(); return <div><SectionHeader eyebrow="Schedule" title="Bible Study Calendar" subtitle="Every Thursday is marked with Bible Study; location and time are listed as TBD until finalized."/><Card><div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-3xl font-semibold text-white">{MONTHS[m]} {y}</h2><p className="mt-1 text-sm text-slate-400">Automatically opens to the current month.</p></div><div className="flex gap-2"><button className="icon-btn" onClick={()=>setMonthDate(new Date(y,m-1,1))}><ChevronLeft/></button><button className="secondary-btn" onClick={()=>setMonthDate(new Date(today.getFullYear(),today.getMonth(),1))}>Today</button><button className="icon-btn" onClick={()=>setMonthDate(new Date(y,m+1,1))}><ChevronRight/></button></div></div><div className="grid grid-cols-7 gap-2">{DOW.map(d=><div key={d} className="py-2 text-center text-xs font-bold uppercase tracking-[.2em] text-azure">{d}</div>)}{cells.map((cell,i)=>{ const isToday = cell && fmt(cell)===fmt(todayNoTime); const isThu = cell && cell.getDay()===4; const muted = cell && cell.getMonth()!==m; return <div key={i} className={`min-h-[105px] rounded-2xl border p-3 transition ${isToday?'border-azure bg-azure/30 shadow-glow':'border-white/10 bg-white/[.035]'} ${muted?'opacity-40':''}`}><div className="flex justify-between"><span className="text-sm font-semibold text-white">{cell?.getDate()}</span>{isToday && <span className="rounded-full bg-azure px-2 py-.5 text-[10px] font-bold text-ink">TODAY</span>}</div>{isThu && <div className="mt-3 rounded-xl border border-azure/20 bg-azure/10 p-2 text-[11px] leading-5 text-slate-100"><b>Bible Study</b><br/>Location TBD<br/>Time TBD</div>}</div>})}</div></Card></div> }
function calendarCells(date){ const y=date.getFullYear(), m=date.getMonth(); const first=new Date(y,m,1); const start=new Date(y,m,1-first.getDay()); return Array.from({length:42},(_,i)=>{ const d=new Date(start); d.setDate(start.getDate()+i); return d }) }
function ScripturePage({currentStudy}){ const [tab,setTab]=useState('week'); return <div><SectionHeader eyebrow="Semester Plan" title="Scripture Plan" subtitle="A focused 16-week plan using John, Philippians, and Colossians to understand Jesus, build confidence, strengthen discipline, and live with purpose."/><div className="mb-6 flex flex-wrap gap-3"><button onClick={()=>setTab('week')} className={tab==='week'?'primary-btn':'secondary-btn'}>This Week’s Scripture</button><button onClick={()=>setTab('plan')} className={tab==='plan'?'primary-btn':'secondary-btn'}>Past, Present, and Future</button></div>{tab==='week'?<ThisWeek item={currentStudy}/>:<FullPlan currentStudy={currentStudy}/>}</div> }
function ThisWeek({item}){ return <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]"><Card><div className="flex items-center gap-4"><img src={shield} className="h-24 w-24 object-contain"/><div><div className="text-sm uppercase tracking-[.22em] text-azure">Upcoming Thursday</div><h2 className="mt-2 text-3xl font-semibold text-white">{item.title}</h2><p className="mt-2 text-xl text-azure">{item.passage}</p></div></div><div className="mt-6 flex flex-wrap gap-2"><Pill>{pretty(item.date)}</Pill><Pill>{item.book}</Pill><Pill>Location TBD</Pill><Pill>Time TBD</Pill></div></Card><Card><h3 className="text-2xl font-semibold text-white">What we’ll cover</h3><p className="mt-4 text-base leading-8 text-slate-300">{item.explanation}</p><div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5"><h4 className="font-semibold text-white">Semester focus</h4><p className="mt-2 text-sm leading-7 text-slate-400">This plan moves from understanding Jesus, to identity in Christ, to mindset and discipline, to purpose-driven action and brotherhood.</p></div></Card></div> }
function FullPlan({currentStudy}){ const groups={Past:[],Present:[],Future:[]}; PLAN.forEach(x=>groups[statusFor(x)].push(x)); return <div className="space-y-6"> <Card><h3 className="text-2xl font-semibold text-white">Why these books?</h3><div className="mt-5 grid gap-4 md:grid-cols-3"><BookWhy title="John" text="Gives a clear view of who Jesus is and why following Him matters."/><BookWhy title="Philippians" text="Practical encouragement for confidence, peace, mindset, humility, and purpose."/><BookWhy title="Colossians" text="Grounds identity, character, priorities, and daily action in Christ."/></div></Card>{['Past','Present','Future'].map(g=><div key={g}><h3 className="mb-3 text-2xl font-semibold text-white">{g}</h3><div className="grid gap-4 md:grid-cols-2">{groups[g].length?groups[g].map(item=><StudyCard key={item.date} item={item} present={item.date===currentStudy.date}/>):<Card className="text-slate-400">Nothing here yet.</Card>}</div></div>)}</div> }
function BookWhy({title,text}){ return <div className="rounded-2xl border border-white/10 bg-white/5 p-5"><h4 className="text-xl font-semibold text-azure">{title}</h4><p className="mt-2 text-sm leading-7 text-slate-400">{text}</p></div> }
function StudyCard({item,present}){ return <div className={`rounded-2xl border p-5 ${present?'border-azure bg-azure/15 shadow-glow':'border-white/10 bg-white/[.04]'}`}><div className="flex items-start justify-between gap-3"><div><div className="text-xs uppercase tracking-[.2em] text-slate-500">{pretty(item.date)}</div><h4 className="mt-2 text-xl font-semibold text-white">{item.title}</h4><p className="mt-1 font-semibold text-azure">{item.passage}</p></div>{present && <span className="rounded-full bg-azure px-3 py-1 text-xs font-bold text-ink">PRESENT</span>}</div><p className="mt-3 text-sm leading-7 text-slate-400">{item.explanation}</p></div> }
function AboutPage(){ return <div><SectionHeader eyebrow="Leadership" title="About" subtitle="A brief introduction to the person leading the plan and the brotherhood behind it."/><div className="grid gap-6 lg:grid-cols-[.82fr_1.18fr]"><Card><img src={headshot} className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"/><h2 className="mt-6 text-3xl font-semibold text-white">Davis Higgins</h2><p className="mt-3 text-sm leading-7 text-slate-300">Vice President of Philanthropy for Phi Delta Theta NC Epsilon and candidate for Chaplain. My goal is to help build consistent, meaningful opportunities for brothers to grow in faith, character, accountability, and confidence.</p></Card><div className="space-y-6"><Card><div className="flex flex-wrap items-center gap-6"><img src={letters} className="h-16 object-contain"/><img src={unccLogo} className="h-16 object-contain"/><img src={crest} className="h-24 object-contain"/></div><h3 className="mt-6 text-2xl font-semibold text-white">Phi Delta Theta Values</h3><p className="mt-4 text-sm leading-7 text-slate-300">Phi Delta Theta is built on the Cardinal Principles of Friendship, Sound Learning, and Rectitude. This site applies those values through weekly Scripture, honest conversation, personal growth, and brotherhood accountability.</p></Card><Card><h3 className="text-2xl font-semibold text-white">NC Epsilon at UNC Charlotte</h3><p className="mt-4 text-sm leading-7 text-slate-300">The NC Epsilon chapter represents Phi Delta Theta at the University of North Carolina at Charlotte. The chapter’s purpose is to develop men through brotherhood, leadership, service, learning, and high personal standards.</p><p className="mt-4 text-sm leading-7 text-slate-400">This Chaplain site is designed as a practical tool for chapter life: one place for the calendar, weekly Scripture, the semester study plan, and a clear mission behind the role.</p></Card><Card><h3 className="text-2xl font-semibold text-white">Fraternity History</h3><p className="mt-4 text-sm leading-7 text-slate-300">Phi Delta Theta was founded in 1848 at Miami University in Oxford, Ohio. Its long-standing mission is to help men become the greatest version of themselves through friendship, learning, and moral character.</p></Card></div></div></div> }
createRoot(document.getElementById('root')).render(<App />)
