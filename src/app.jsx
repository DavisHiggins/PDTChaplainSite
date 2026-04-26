import React, { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Cross,
  Home,
  Info,
  MapPin,
  Shield,
  Sparkles,
  Star,
  Target,
  Users,
} from 'lucide-react'

import headshot from './assets/headshot.jpeg'
import pdtLogo from './assets/pdt-logo.webp'
import pdtCrest from './assets/pdt-crest.png'
import pdtLetters from './assets/pdt-letters.png'
import pdtShield from './assets/pdt-shield.png'
import unccLogo from './assets/uncc-logo.png'
import './index.css'

const NAV_ITEMS = [
  { label: 'Home', key: 'home', icon: Home },
  { label: 'Calendar', key: 'calendar', icon: CalendarDays },
  { label: 'Scripture Plan', key: 'scripture', icon: BookOpen },
  { label: 'About', key: 'about', icon: Info },
]

const semesterStartYear = 2026
const semesterEndYear = 2027

const SCRIPTURE_PLAN = [
  {
    week: 1,
    date: '2026-08-20',
    passage: 'John 1:1–14',
    book: 'John',
    title: 'Who Jesus Is',
    theme: 'Foundation',
    summary: 'A clear starting point for understanding Jesus as the Word made flesh and the center of Christian faith.',
  },
  {
    week: 2,
    date: '2026-08-27',
    passage: 'John 3:16–21',
    book: 'John',
    title: 'Salvation & Purpose',
    theme: 'Foundation',
    summary: 'A focused discussion on grace, belief, and what it means to live with purpose instead of drifting.',
  },
  {
    week: 3,
    date: '2026-09-03',
    passage: 'John 8:12',
    book: 'John',
    title: 'Direction in Life',
    theme: 'Direction',
    summary: 'Jesus as the light of the world and how faith gives direction when life feels unclear.',
  },
  {
    week: 4,
    date: '2026-09-10',
    passage: 'John 10:10',
    book: 'John',
    title: 'Living with Purpose',
    theme: 'Purpose',
    summary: 'A practical look at choosing a meaningful life over distraction, comparison, and complacency.',
  },
  {
    week: 5,
    date: '2026-09-17',
    passage: 'Philippians 1:6',
    book: 'Philippians',
    title: 'Growth Takes Time',
    theme: 'Confidence',
    summary: 'Confidence rooted in progress, patience, and trusting that God is still working in you.',
  },
  {
    week: 6,
    date: '2026-09-24',
    passage: 'Philippians 1:21',
    book: 'Philippians',
    title: 'Purpose-Driven Life',
    theme: 'Purpose',
    summary: 'A conversation about living for something bigger than comfort, status, or short-term approval.',
  },
  {
    week: 7,
    date: '2026-10-01',
    passage: 'Philippians 3:13–14',
    book: 'Philippians',
    title: 'Let Go of the Past',
    theme: 'Confidence',
    summary: 'How to stop being defined by past mistakes and start moving forward with discipline and faith.',
  },
  {
    week: 8,
    date: '2026-10-08',
    passage: 'Philippians 4:6–7',
    book: 'Philippians',
    title: 'Anxiety & Peace',
    theme: 'Peace',
    summary: 'A real conversation about stress, prayer, pressure, and finding peace through God.',
  },
  {
    week: 9,
    date: '2026-10-15',
    passage: 'Philippians 4:8',
    book: 'Philippians',
    title: 'Control Your Thoughts',
    theme: 'Mindset',
    summary: 'How thought patterns shape confidence, character, discipline, and daily decision-making.',
  },
  {
    week: 10,
    date: '2026-10-22',
    passage: 'Philippians 4:11–13',
    book: 'Philippians',
    title: 'Strength & Contentment',
    theme: 'Strength',
    summary: 'Building confidence that is not dependent on circumstances, attention, or outside validation.',
  },
  {
    week: 11,
    date: '2026-10-29',
    passage: 'Philippians 2:3–8',
    book: 'Philippians',
    title: 'Leadership & Humility',
    theme: 'Leadership',
    summary: 'A study on servant leadership and becoming the kind of man others can trust and follow.',
  },
  {
    week: 12,
    date: '2026-11-05',
    passage: 'Philippians 1:27',
    book: 'Philippians',
    title: 'Living with Integrity',
    theme: 'Integrity',
    summary: 'A practical challenge to live consistently when people are watching and when they are not.',
  },
  {
    week: 13,
    date: '2026-11-12',
    passage: 'Colossians 1:16–17',
    book: 'Colossians',
    title: 'Purpose & Identity',
    theme: 'Identity',
    summary: 'Understanding that identity starts with who God is, not achievement, image, or comparison.',
  },
  {
    week: 14,
    date: '2026-11-19',
    passage: 'Colossians 2:6–7',
    book: 'Colossians',
    title: 'Staying Grounded',
    theme: 'Discipline',
    summary: 'How to stay rooted in faith, discipline, and truth while navigating college pressure.',
  },
  {
    week: 15,
    date: '2026-12-03',
    passage: 'Colossians 3:1–2',
    book: 'Colossians',
    title: 'Focus & Priorities',
    theme: 'Focus',
    summary: 'A reset on priorities, mindset, and keeping attention on things that actually matter.',
  },
  {
    week: 16,
    date: '2026-12-10',
    passage: 'Colossians 3:12–17',
    book: 'Colossians',
    title: 'Character, Brotherhood & Action',
    theme: 'Brotherhood',
    summary: 'Closing the semester with a call to character, unity, gratitude, and daily action.',
  },
]

const BOOKS = [
  {
    title: 'John',
    text: 'John keeps the semester grounded in Jesus first. Before confidence, discipline, or leadership, the foundation is understanding who Jesus is and why He matters.',
  },
  {
    title: 'Philippians',
    text: 'Philippians speaks directly to mindset, confidence, peace, humility, and perseverance. It is practical for young men trying to grow under pressure.',
  },
  {
    title: 'Colossians',
    text: 'Colossians focuses on identity, priorities, character, and living with purpose. It closes the semester by turning belief into action.',
  },
]

const PRINCIPLES = [
  {
    title: 'Friendship',
    text: 'Build genuine brotherhood through trust, loyalty, encouragement, and care for one another.',
    icon: Users,
  },
  {
    title: 'Sound Learning',
    text: 'Pursue growth through discipline, curiosity, humility, and a commitment to becoming better men.',
    icon: BookOpen,
  },
  {
    title: 'Rectitude',
    text: 'Choose integrity, moral courage, accountability, and doing what is right when it matters.',
    icon: Shield,
  },
]

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function dateKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function parseLocalDate(value) {
  const [y, m, d] = value.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function formatDate(value) {
  return parseLocalDate(value).toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function getThursdayLabel(date) {
  const matchingPlan = SCRIPTURE_PLAN.find((item) => item.date === dateKey(date))
  if (matchingPlan) {
    return `Bible Study · ${matchingPlan.passage}`
  }
  return 'Bible Study'
}

function getUpcomingStudy(today = new Date()) {
  const current = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const cutoff = new Date(current)

  // Switch to the next scheduled passage every Friday at 12:00 AM.
  const active = SCRIPTURE_PLAN.find((item) => parseLocalDate(item.date) >= cutoff)
  return active || SCRIPTURE_PLAN[SCRIPTURE_PLAN.length - 1]
}

function classifyStudy(item, currentStudy) {
  const itemDate = parseLocalDate(item.date)
  const currentDate = parseLocalDate(currentStudy.date)
  if (item.date === currentStudy.date) return 'Present'
  if (itemDate < currentDate) return 'Past'
  return 'Future'
}

function getInitialCalendarDate() {
  const today = new Date()
  if (today.getFullYear() < semesterStartYear || today.getFullYear() > semesterEndYear) {
    return new Date(2026, 7, 1)
  }
  return new Date(today.getFullYear(), today.getMonth(), 1)
}

function getCalendarDays(monthDate) {
  const year = monthDate.getFullYear()
  const month = monthDate.getMonth()
  const first = new Date(year, month, 1)
  const start = new Date(first)
  start.setDate(first.getDate() - first.getDay())

  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(start)
    day.setDate(start.getDate() + index)
    return day
  })
}

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="sectionHeader">
      <div className="eyebrow"><Sparkles size={14} />{eyebrow}</div>
      <h2>{title}</h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  )
}

function StatCard({ value, label }) {
  return (
    <div className="statCard">
      <div>{value}</div>
      <span>{label}</span>
    </div>
  )
}

function PrincipleCard({ item }) {
  const Icon = item.icon
  return (
    <div className="principleCard">
      <div className="iconBox"><Icon size={21} /></div>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
    </div>
  )
}

function PageShell({ children }) {
  return <section className="pageShell">{children}</section>
}

function HomePage({ setActivePage, currentStudy }) {
  return (
    <PageShell>
      <div className="heroCard">
        <div className="heroGlow heroGlowOne" />
        <div className="heroGlow heroGlowTwo" />
        <div className="heroContent">
          <div className="heroText">
            <div className="heroBadge"><Cross size={16} /> Phi Delta Theta · NC Epsilon · Chaplain</div>
            <h1>Faith, brotherhood, and accountability.</h1>
            <p className="heroLead">
              A centralized home for weekly Bible study, scripture planning, and spiritual leadership within Phi Delta Theta at UNC Charlotte.
            </p>
            <div className="heroChips">
              <span>Weekly Bible Study</span>
              <span>16-Week Scripture Plan</span>
              <span>Brotherhood Growth</span>
              <span>Leadership & Accountability</span>
            </div>
            <div className="heroActions">
              <button onClick={() => setActivePage('scripture')} className="primaryBtn">View Scripture Plan <BookOpen size={17} /></button>
              <button onClick={() => setActivePage('calendar')} className="secondaryBtn">Open Calendar <CalendarDays size={17} /></button>
            </div>
          </div>

          <div className="heroVisual">
            <div className="crestPanel">
              <img src={pdtCrest} alt="Phi Delta Theta crest" className="crestImg" />
              <div className="crestInfo">
                <div className="smallLabel">This Week</div>
                <h3>{currentStudy.title}</h3>
                <p>{currentStudy.passage}</p>
              </div>
            </div>
            <img src={unccLogo} alt="UNC Charlotte logo" className="unccWatermark" />
          </div>
        </div>
      </div>

      <div className="statGrid">
        <StatCard value="Thursdays" label="Weekly Bible Study" />
        <StatCard value="16 Weeks" label="Semester Plan" />
        <StatCard value="3 Books" label="John · Philippians · Colossians" />
        <StatCard value="1 Mission" label="Build Stronger Men" />
      </div>

      <div className="gridTwo mt24">
        <div className="glassCard largePad">
          <div className="cardTopline"><Target size={17} /> Mission</div>
          <h2>Build a consistent space for faith and growth.</h2>
          <p>
            This website exists to make Bible study organized, accessible, and easy to follow. The goal is simple: help brothers grow in faith, confidence, discipline, and understanding of Jesus while strengthening the culture of the chapter.
          </p>
        </div>
        <div className="glassCard largePad">
          <div className="cardTopline"><Clock size={17} /> Weekly Structure</div>
          <h2>Bible Study · Location TBD · Time TBD</h2>
          <p>
            Every Thursday will be reserved for Bible study. The calendar gives a clear view of upcoming meetings, while the scripture plan shows exactly what passage and theme will be covered each week.
          </p>
        </div>
      </div>

      <div className="principleGrid mt24">
        {PRINCIPLES.map((item) => <PrincipleCard key={item.title} item={item} />)}
      </div>
    </PageShell>
  )
}

function CalendarPage() {
  const [monthDate, setMonthDate] = useState(getInitialCalendarDate)
  const todayKey = dateKey(new Date())
  const days = getCalendarDays(monthDate)

  const moveMonth = (amount) => {
    setMonthDate((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1))
  }

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Weekly Rhythm"
        title="Bible Study Calendar"
        subtitle="Every Thursday is marked for Bible Study. The calendar opens to the current month automatically, and today is highlighted in light blue."
      />

      <div className="calendarShell">
        <div className="calendarHeader">
          <div>
            <div className="smallLabel">2026–2027 Academic Year</div>
            <h2>{MONTH_NAMES[monthDate.getMonth()]} {monthDate.getFullYear()}</h2>
          </div>
          <div className="calendarControls">
            <button onClick={() => moveMonth(-1)}><ChevronLeft size={18} /></button>
            <button onClick={() => setMonthDate(getInitialCalendarDate())}>Today</button>
            <button onClick={() => moveMonth(1)}><ChevronRight size={18} /></button>
          </div>
        </div>

        <div className="dayLabels">
          {DAY_NAMES.map((day) => <div key={day}>{day}</div>)}
        </div>

        <div className="calendarGrid">
          {days.map((day) => {
            const inMonth = day.getMonth() === monthDate.getMonth()
            const isToday = dateKey(day) === todayKey
            const isThursday = day.getDay() === 4
            const isSemesterRange = day >= new Date(2026, 7, 1) && day <= new Date(2027, 4, 31)
            return (
              <div key={dateKey(day)} className={`calendarDay ${inMonth ? '' : 'mutedDay'} ${isToday ? 'todayDay' : ''} ${isThursday && isSemesterRange ? 'studyDay' : ''}`}>
                <div className="dayNumber">{day.getDate()}</div>
                {isThursday && isSemesterRange ? (
                  <div className="eventPill">
                    <BookOpen size={12} />
                    <span>{getThursdayLabel(day)}</span>
                    <small>Location TBD · Time TBD</small>
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </PageShell>
  )
}

function ScripturePage({ currentStudy }) {
  const [innerTab, setInnerTab] = useState('week')

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Semester Roadmap"
        title="Scripture Plan"
        subtitle="A simple 16-week plan built around John, Philippians, and Colossians to focus on Jesus, confidence, discipline, leadership, and brotherhood."
      />

      <div className="bookGrid">
        {BOOKS.map((book) => (
          <div className="bookCard" key={book.title}>
            <div className="bookTitle"><BookOpen size={18} />{book.title}</div>
            <p>{book.text}</p>
          </div>
        ))}
      </div>

      <div className="tabCard mt24">
        <div className="innerTabs">
          <button className={innerTab === 'week' ? 'activeInnerTab' : ''} onClick={() => setInnerTab('week')}>This Week's Scripture</button>
          <button className={innerTab === 'plan' ? 'activeInnerTab' : ''} onClick={() => setInnerTab('plan')}>Past, Present, and Future</button>
        </div>

        {innerTab === 'week' ? (
          <div className="currentStudyCard">
            <div className="currentStudyLeft">
              <div className="smallLabel">Upcoming Thursday · {formatDate(currentStudy.date)}</div>
              <h2>{currentStudy.title}</h2>
              <div className="passageBadge">{currentStudy.passage}</div>
              <p>{currentStudy.summary}</p>
              <div className="detailGrid">
                <div><span>Book</span><strong>{currentStudy.book}</strong></div>
                <div><span>Theme</span><strong>{currentStudy.theme}</strong></div>
                <div><span>Meeting</span><strong>Bible Study</strong></div>
              </div>
            </div>
            <div className="currentStudyRight">
              <img src={pdtShield} alt="Phi Delta Theta shield" />
              <p>Switches to the next scheduled passage every Friday at 12:00 AM.</p>
            </div>
          </div>
        ) : (
          <div className="timelineList">
            {SCRIPTURE_PLAN.map((item) => {
              const status = classifyStudy(item, currentStudy)
              return (
                <div key={item.week} className={`timelineItem status${status}`}>
                  <div className="weekBubble">{item.week}</div>
                  <div className="timelineContent">
                    <div className="timelineMeta">
                      <span>{formatDate(item.date)}</span>
                      <strong>{status}</strong>
                    </div>
                    <h3>{item.title}</h3>
                    <div className="passageLine">{item.passage} · {item.book} · {item.theme}</div>
                    <p>{item.summary}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </PageShell>
  )
}

function AboutPage() {
  return (
    <PageShell>
      <SectionHeader
        eyebrow="Leadership & Brotherhood"
        title="About"
        subtitle="A brief look at the person behind the role, the values behind the fraternity, and the chapter this site is built to serve."
      />

      <div className="aboutHero">
        <div className="headshotFrame">
          <img src={headshot} alt="Davis Higgins headshot" />
        </div>
        <div className="aboutText">
          <div className="smallLabel">Chaplain Candidate · VP of Philanthropy</div>
          <h2>Davis Higgins</h2>
          <p>
            I created this site to bring structure, consistency, and professionalism to the Chaplain role. My goal is to make Bible study easy to follow, spiritually meaningful, and genuinely useful for brothers navigating school, pressure, leadership, and personal growth.
          </p>
          <div className="aboutTags">
            <span>Faith</span><span>Discipline</span><span>Accountability</span><span>Brotherhood</span>
          </div>
        </div>
      </div>

      <div className="principleGrid mt24">
        {PRINCIPLES.map((item) => <PrincipleCard key={item.title} item={item} />)}
      </div>

      <div className="gridTwo mt24">
        <div className="glassCard largePad">
          <div className="cardTopline"><Shield size={17} /> Phi Delta Theta</div>
          <h2>Built on principled brotherhood.</h2>
          <p>
            Phi Delta Theta is rooted in the Cardinal Principles of Friendship, Sound Learning, and Rectitude. This Chaplain structure is designed to reinforce those values through consistent faith-based discussion, encouragement, and accountability.
          </p>
        </div>
        <div className="glassCard largePad logoShowcase">
          <img src={pdtLetters} alt="Phi Delta Theta letters" />
          <h2>NC Epsilon · UNC Charlotte</h2>
          <p>
            The NC Epsilon chapter represents Phi Delta Theta at UNC Charlotte. This website is designed as a practical resource for the chapter: a place to check the schedule, see the weekly scripture, and understand the broader mission behind the role.
          </p>
        </div>
      </div>
    </PageShell>
  )
}

function AppStyles() {
  return (
    <style>{`
      :root {
        --ink: #07111f;
        --ink2: #0b1728;
        --card: rgba(255,255,255,0.055);
        --card2: rgba(255,255,255,0.085);
        --line: rgba(255,255,255,0.12);
        --text: #f8fafc;
        --muted: #a7b4c7;
        --muted2: #738198;
        --blue: #8fd3ff;
        --blue2: #4aa8e8;
        --pdt: #0b4d8c;
        --gold: #d9b56c;
        --green: #005035;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body { margin: 0; min-width: 320px; min-height: 100vh; background: var(--ink); color: var(--text); }
      button { font-family: inherit; }
      .appRoot { min-height: 100vh; overflow-x: hidden; background: radial-gradient(circle at 50% -10%, rgba(74,168,232,0.22), transparent 33%), radial-gradient(circle at 95% 20%, rgba(0,80,53,0.24), transparent 30%), radial-gradient(circle at 0% 90%, rgba(217,181,108,0.12), transparent 26%), #07111f; }
      .bgGrid { position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.16; background-image: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 54px 54px; mask-image: linear-gradient(to bottom, black, transparent 78%); }
      .siteHeader { position: sticky; top: 0; z-index: 20; border-bottom: 1px solid var(--line); background: rgba(7,17,31,0.86); backdrop-filter: blur(20px); }
      .headerInner, .pageShell { width: min(1180px, calc(100% - 40px)); margin: 0 auto; }
      .headerInner { min-height: 82px; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
      .brand { display: flex; align-items: center; gap: 14px; min-width: 250px; }
      .brandLogo { width: 54px; height: 54px; border-radius: 18px; border: 1px solid var(--line); background: rgba(255,255,255,0.98); display: flex; align-items: center; justify-content: center; overflow: hidden; box-shadow: 0 16px 45px rgba(0,0,0,0.22); }
      .brandLogo img { width: 43px; height: 43px; object-fit: contain; }
      .brandTitle { font-size: 13px; font-weight: 800; letter-spacing: .24em; color: var(--blue); text-transform: uppercase; }
      .brandSub { margin-top: 4px; color: var(--muted); font-size: 13px; white-space: nowrap; }
      .nav { display: flex; align-items: center; gap: 8px; border: 1px solid var(--line); background: rgba(255,255,255,0.055); padding: 9px; border-radius: 999px; box-shadow: 0 18px 60px rgba(0,0,0,0.22); }
      .nav button { border: 0; cursor: pointer; display: inline-flex; align-items: center; gap: 7px; color: #d5dfec; background: transparent; padding: 11px 15px; border-radius: 999px; font-weight: 700; transition: .18s ease; }
      .nav button:hover { background: rgba(255,255,255,0.09); color: white; }
      .nav button.activeNav { background: white; color: #07111f; }
      .mobileCurrent { display: none; color: var(--muted); border: 1px solid var(--line); background: rgba(255,255,255,0.06); padding: 10px 14px; border-radius: 999px; font-weight: 700; }
      .mobileNav { display: none; width: min(1180px, calc(100% - 40px)); margin: 0 auto; padding-bottom: 14px; overflow-x: auto; gap: 8px; }
      .mobileNav button { white-space: nowrap; border: 1px solid var(--line); background: rgba(255,255,255,0.055); color: var(--muted); padding: 10px 13px; border-radius: 999px; font-weight: 700; }
      .mobileNav button.activeNav { background: white; color: #07111f; }
      main { position: relative; z-index: 1; }
      .pageShell { padding: 54px 0 74px; }
      .heroCard, .glassCard, .calendarShell, .tabCard, .principleCard, .bookCard, .statCard { border: 1px solid var(--line); background: linear-gradient(180deg, rgba(255,255,255,0.075), rgba(255,255,255,0.035)); box-shadow: 0 24px 90px rgba(0,0,0,0.28); backdrop-filter: blur(18px); }
      .heroCard { position: relative; overflow: hidden; border-radius: 42px; padding: 42px; }
      .heroGlow { position: absolute; border-radius: 999px; filter: blur(52px); pointer-events: none; }
      .heroGlowOne { width: 320px; height: 320px; background: rgba(143,211,255,0.18); left: -90px; top: -100px; }
      .heroGlowTwo { width: 360px; height: 360px; background: rgba(0,80,53,0.28); right: -90px; bottom: -150px; }
      .heroContent { position: relative; display: grid; grid-template-columns: 1.12fr .88fr; gap: 42px; align-items: center; }
      .heroBadge, .eyebrow, .cardTopline { display: inline-flex; align-items: center; gap: 8px; border: 1px solid rgba(143,211,255,0.22); background: rgba(143,211,255,0.095); color: #bde8ff; border-radius: 999px; padding: 9px 13px; font-size: 12px; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; }
      .heroText h1 { margin: 22px 0 0; max-width: 780px; font-size: clamp(44px, 7vw, 78px); line-height: .96; letter-spacing: -0.055em; font-weight: 850; }
      .heroLead { margin: 24px 0 0; max-width: 690px; color: #c7d4e5; font-size: 19px; line-height: 1.8; }
      .heroChips, .aboutTags { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
      .heroChips span, .aboutTags span { border: 1px solid var(--line); background: rgba(255,255,255,0.06); color: #dbe7f4; border-radius: 999px; padding: 9px 13px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .17em; }
      .heroActions { margin-top: 30px; display: flex; flex-wrap: wrap; gap: 13px; }
      .primaryBtn, .secondaryBtn { cursor: pointer; border: 0; display: inline-flex; align-items: center; justify-content: center; gap: 9px; padding: 14px 18px; border-radius: 999px; font-weight: 800; transition: .2s ease; }
      .primaryBtn { background: linear-gradient(135deg, #ffffff, #dff4ff); color: #07111f; box-shadow: 0 16px 40px rgba(143,211,255,0.16); }
      .secondaryBtn { border: 1px solid var(--line); background: rgba(255,255,255,0.06); color: white; }
      .primaryBtn:hover, .secondaryBtn:hover { transform: translateY(-2px); }
      .heroVisual { position: relative; min-height: 430px; display: flex; align-items: center; justify-content: center; }
      .crestPanel { position: relative; z-index: 2; width: min(100%, 360px); border: 1px solid var(--line); background: rgba(8,18,32,0.72); border-radius: 34px; padding: 26px; text-align: center; box-shadow: 0 30px 90px rgba(0,0,0,0.32); }
      .crestImg { width: 145px; height: 145px; object-fit: contain; margin: 0 auto 18px; filter: drop-shadow(0 14px 26px rgba(0,0,0,0.25)); }
      .crestInfo { border-top: 1px solid var(--line); padding-top: 20px; }
      .smallLabel { color: var(--blue); font-size: 12px; text-transform: uppercase; letter-spacing: .22em; font-weight: 850; }
      .crestInfo h3 { margin: 9px 0 6px; font-size: 25px; }
      .crestInfo p { margin: 0; color: var(--muted); }
      .unccWatermark { position: absolute; width: min(72%, 420px); opacity: .18; filter: drop-shadow(0 24px 80px rgba(0,0,0,0.35)); }
      .statGrid { margin-top: 22px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
      .statCard { border-radius: 26px; padding: 22px; }
      .statCard div { font-size: 24px; font-weight: 850; letter-spacing: -.03em; }
      .statCard span { display: block; margin-top: 6px; color: var(--muted); font-size: 13px; }
      .mt24 { margin-top: 24px; }
      .gridTwo { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
      .largePad { padding: 28px; border-radius: 32px; }
      .glassCard h2 { margin: 16px 0 0; font-size: 28px; line-height: 1.15; letter-spacing: -.035em; }
      .glassCard p { margin: 14px 0 0; color: #b7c5d8; line-height: 1.75; }
      .principleGrid, .bookGrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
      .principleCard, .bookCard { border-radius: 30px; padding: 25px; }
      .iconBox { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border-radius: 17px; background: rgba(143,211,255,0.10); color: var(--blue); border: 1px solid rgba(143,211,255,0.16); }
      .principleCard h3, .bookCard h3 { margin: 18px 0 0; font-size: 21px; }
      .principleCard p, .bookCard p { color: var(--muted); line-height: 1.7; font-size: 14px; margin: 12px 0 0; }
      .sectionHeader { max-width: 850px; margin-bottom: 28px; }
      .sectionHeader h2 { margin: 16px 0 0; font-size: clamp(34px, 5vw, 54px); line-height: 1.04; letter-spacing: -.045em; }
      .sectionHeader p { margin: 16px 0 0; color: #c0ccdc; font-size: 17px; line-height: 1.75; }
      .calendarShell, .tabCard { border-radius: 34px; padding: 24px; overflow: hidden; }
      .calendarHeader { display: flex; justify-content: space-between; gap: 20px; align-items: center; margin-bottom: 18px; }
      .calendarHeader h2 { margin: 8px 0 0; font-size: 32px; letter-spacing: -.035em; }
      .calendarControls { display: flex; gap: 9px; }
      .calendarControls button { border: 1px solid var(--line); background: rgba(255,255,255,0.065); color: white; border-radius: 999px; padding: 11px 14px; cursor: pointer; font-weight: 800; display: inline-flex; align-items: center; }
      .dayLabels { display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px; margin: 14px 0 10px; }
      .dayLabels div { color: var(--muted); text-transform: uppercase; font-size: 12px; font-weight: 850; letter-spacing: .18em; padding-left: 8px; }
      .calendarGrid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px; }
      .calendarDay { min-height: 124px; border-radius: 22px; border: 1px solid rgba(255,255,255,0.095); background: rgba(255,255,255,0.045); padding: 10px; position: relative; overflow: hidden; }
      .calendarDay.mutedDay { opacity: .34; }
      .calendarDay.todayDay { background: linear-gradient(180deg, rgba(143,211,255,0.34), rgba(143,211,255,0.14)); border-color: rgba(143,211,255,0.72); box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08), 0 0 36px rgba(143,211,255,0.16); }
      .calendarDay.studyDay { border-color: rgba(217,181,108,0.25); }
      .dayNumber { font-size: 15px; font-weight: 850; color: white; }
      .eventPill { margin-top: 10px; border: 1px solid rgba(143,211,255,0.22); background: rgba(143,211,255,0.105); border-radius: 16px; padding: 9px; color: #e8f7ff; display: flex; flex-direction: column; gap: 3px; font-size: 12px; line-height: 1.35; }
      .eventPill span { display: inline-flex; gap: 5px; align-items: center; font-weight: 800; }
      .eventPill small { color: #b6c5d7; font-weight: 650; }
      .bookTitle { display: inline-flex; align-items: center; gap: 9px; color: white; font-size: 21px; font-weight: 850; }
      .innerTabs { border: 1px solid var(--line); background: rgba(255,255,255,0.045); border-radius: 999px; display: inline-flex; padding: 7px; gap: 6px; margin-bottom: 24px; }
      .innerTabs button { border: 0; background: transparent; color: var(--muted); padding: 11px 16px; border-radius: 999px; font-weight: 850; cursor: pointer; }
      .innerTabs button.activeInnerTab { background: white; color: #07111f; }
      .currentStudyCard { display: grid; grid-template-columns: 1.25fr .75fr; gap: 22px; align-items: stretch; }
      .currentStudyLeft, .currentStudyRight { border: 1px solid var(--line); background: rgba(255,255,255,0.045); border-radius: 28px; padding: 28px; }
      .currentStudyLeft h2 { margin: 13px 0 0; font-size: 40px; letter-spacing: -.045em; }
      .passageBadge { display: inline-flex; margin-top: 16px; padding: 10px 14px; border-radius: 999px; background: rgba(143,211,255,0.11); color: #cceeff; border: 1px solid rgba(143,211,255,0.2); font-weight: 850; }
      .currentStudyLeft p { color: var(--muted); line-height: 1.75; font-size: 16px; }
      .detailGrid { margin-top: 22px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
      .detailGrid div { border: 1px solid var(--line); background: rgba(255,255,255,0.04); border-radius: 20px; padding: 15px; }
      .detailGrid span { display: block; color: var(--muted2); font-size: 12px; text-transform: uppercase; letter-spacing: .18em; font-weight: 850; }
      .detailGrid strong { display: block; margin-top: 6px; color: white; }
      .currentStudyRight { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
      .currentStudyRight img { max-width: 150px; max-height: 150px; object-fit: contain; filter: drop-shadow(0 18px 35px rgba(0,0,0,0.22)); }
      .currentStudyRight p { color: var(--muted); line-height: 1.6; max-width: 260px; }
      .timelineList { display: grid; gap: 14px; }
      .timelineItem { display: grid; grid-template-columns: 46px 1fr; gap: 15px; align-items: start; }
      .weekBubble { width: 46px; height: 46px; border-radius: 16px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--line); background: rgba(255,255,255,0.06); color: white; font-weight: 850; }
      .timelineContent { border: 1px solid var(--line); background: rgba(255,255,255,0.045); border-radius: 24px; padding: 18px; }
      .timelineMeta { display: flex; justify-content: space-between; gap: 12px; color: var(--muted); font-size: 13px; }
      .timelineMeta strong { color: white; border-radius: 999px; padding: 4px 9px; background: rgba(255,255,255,0.08); }
      .timelineItem.statusPresent .timelineContent { border-color: rgba(143,211,255,0.55); background: rgba(143,211,255,0.095); }
      .timelineItem.statusPresent .weekBubble { background: rgba(143,211,255,0.22); border-color: rgba(143,211,255,0.58); }
      .timelineItem.statusPast { opacity: .72; }
      .timelineContent h3 { margin: 10px 0 5px; font-size: 21px; }
      .passageLine { color: #d7e8f6; font-weight: 800; }
      .timelineContent p { margin: 10px 0 0; color: var(--muted); line-height: 1.6; }
      .aboutHero { display: grid; grid-template-columns: 360px 1fr; gap: 26px; align-items: stretch; }
      .headshotFrame, .aboutText { border: 1px solid var(--line); background: rgba(255,255,255,0.055); border-radius: 34px; overflow: hidden; box-shadow: 0 24px 90px rgba(0,0,0,0.28); }
      .headshotFrame { padding: 14px; background: linear-gradient(180deg, rgba(143,211,255,0.22), rgba(255,255,255,0.055)); }
      .headshotFrame img { width: 100%; height: 100%; min-height: 430px; object-fit: cover; border-radius: 25px; display: block; }
      .aboutText { padding: 34px; display: flex; flex-direction: column; justify-content: center; }
      .aboutText h2 { margin: 12px 0 0; font-size: 48px; letter-spacing: -.05em; }
      .aboutText p { color: #bfccdc; line-height: 1.8; font-size: 17px; max-width: 720px; }
      .logoShowcase img { max-width: 190px; max-height: 90px; object-fit: contain; margin-bottom: 14px; }
      @media (max-width: 980px) {
        .nav { display: none; }
        .mobileCurrent, .mobileNav { display: flex; }
        .headerInner { min-height: 72px; }
        .brand { min-width: 0; }
        .brandText { display: none; }
        .heroContent, .currentStudyCard, .aboutHero, .gridTwo { grid-template-columns: 1fr; }
        .heroVisual { min-height: 300px; }
        .statGrid, .principleGrid, .bookGrid { grid-template-columns: repeat(2, 1fr); }
        .calendarGrid, .dayLabels { gap: 6px; }
        .calendarDay { min-height: 112px; border-radius: 18px; }
      }
      @media (max-width: 680px) {
        .headerInner, .pageShell, .mobileNav { width: min(100% - 24px, 1180px); }
        .pageShell { padding-top: 34px; }
        .heroCard { padding: 24px; border-radius: 30px; }
        .heroText h1 { font-size: 42px; }
        .heroLead { font-size: 16px; }
        .statGrid, .principleGrid, .bookGrid, .detailGrid { grid-template-columns: 1fr; }
        .calendarShell, .tabCard { padding: 14px; border-radius: 26px; }
        .calendarHeader { align-items: flex-start; flex-direction: column; }
        .calendarGrid { grid-template-columns: 1fr; }
        .dayLabels { display: none; }
        .calendarDay { min-height: auto; }
        .calendarDay.mutedDay { display: none; }
        .innerTabs { width: 100%; border-radius: 22px; flex-direction: column; }
        .currentStudyLeft h2, .aboutText h2 { font-size: 34px; }
        .headshotFrame img { min-height: 340px; }
      }
    `}</style>
  )
}

export default function App() {
  const [activePage, setActivePage] = useState('home')
  const currentStudy = useMemo(() => getUpcomingStudy(new Date()), [])
  const activeTitle = NAV_ITEMS.find((item) => item.key === activePage)?.label || 'Home'

  const pageAnimation = {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
    transition: { duration: 0.26 },
  }

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <HomePage setActivePage={setActivePage} currentStudy={currentStudy} />
      case 'calendar': return <CalendarPage />
      case 'scripture': return <ScripturePage currentStudy={currentStudy} />
      case 'about': return <AboutPage />
      default: return <HomePage setActivePage={setActivePage} currentStudy={currentStudy} />
    }
  }

  return (
    <div className="appRoot">
      <AppStyles />
      <div className="bgGrid" />
      <header className="siteHeader">
        <div className="headerInner">
          <div className="brand">
            <div className="brandLogo"><img src={pdtCrest} alt="Phi Delta Theta crest" /></div>
            <div className="brandText">
              <div className="brandTitle">Phi Delta Theta</div>
              <div className="brandSub">NC Epsilon · Chaplain</div>
            </div>
          </div>
          <nav className="nav">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              return (
                <button key={item.key} type="button" onClick={() => setActivePage(item.key)} className={activePage === item.key ? 'activeNav' : ''}>
                  <Icon size={16} />{item.label}
                </button>
              )
            })}
          </nav>
          <div className="mobileCurrent">{activeTitle}</div>
        </div>
        <div className="mobileNav">
          {NAV_ITEMS.map((item) => (
            <button key={item.key} type="button" onClick={() => setActivePage(item.key)} className={activePage === item.key ? 'activeNav' : ''}>{item.label}</button>
          ))}
        </div>
      </header>
      <main>
        <AnimatePresence mode="wait">
          <motion.div key={activePage} {...pageAnimation}>{renderPage()}</motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
