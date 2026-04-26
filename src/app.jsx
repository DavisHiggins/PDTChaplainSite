import React, { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Cross,
  HeartHandshake,
  Home,
  Info,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
  BookOpen,
  CheckCircle2,
  Circle,
  ArrowRight,
  UserRound,
  Landmark,
} from 'lucide-react'

import headshot from './assets/headshot.jpeg'
import pdtLogo from './assets/pdt-logo.webp'
import pdtCrest from './assets/pdt-crest.png'
import unccLogo from './assets/uncc-logo.png'

const NAV_ITEMS = [
  { label: 'Home', key: 'home', icon: Home },
  { label: 'Calendar', key: 'calendar', icon: CalendarDays },
  { label: 'Scripture Plan', key: 'scripture', icon: BookOpen },
  { label: 'About', key: 'about', icon: Info },
]

const START_DATE = '2026-08-20T00:00:00'
const STUDY_TIME = 'Time TBD'
const STUDY_LOCATION = 'Location TBD'

const SCRIPTURE_PLAN = [
  {
    week: 1,
    date: '2026-08-20',
    book: 'John',
    passage: 'John 1:1–14',
    title: 'Who Jesus Is',
    theme: 'Understanding Jesus as the Word, the light, and the foundation of faith.',
    takeaway: 'Before confidence, discipline, or leadership, we start with knowing who Jesus is.',
  },
  {
    week: 2,
    date: '2026-08-27',
    book: 'John',
    passage: 'John 3:16–21',
    title: 'Salvation and Purpose',
    theme: 'God’s love, grace, and the purpose behind following Christ.',
    takeaway: 'A man grounded in grace does not have to live for approval.',
  },
  {
    week: 3,
    date: '2026-09-03',
    book: 'John',
    passage: 'John 8:12',
    title: 'Direction in Life',
    theme: 'Jesus as the light that gives clarity when life feels uncertain.',
    takeaway: 'Following Christ gives direction when pressure, temptation, and confusion compete for your attention.',
  },
  {
    week: 4,
    date: '2026-09-10',
    book: 'John',
    passage: 'John 10:10',
    title: 'Living With Purpose',
    theme: 'Choosing a full, meaningful life instead of living passively.',
    takeaway: 'Faith is not about shrinking your life; it is about living with purpose and depth.',
  },
  {
    week: 5,
    date: '2026-09-17',
    book: 'Philippians',
    passage: 'Philippians 1:6',
    title: 'Growth Takes Time',
    theme: 'Confidence in the process of becoming the man God is forming you to be.',
    takeaway: 'You are not finished, and that should give you hope instead of shame.',
  },
  {
    week: 6,
    date: '2026-09-24',
    book: 'Philippians',
    passage: 'Philippians 1:21',
    title: 'Purpose-Driven Life',
    theme: 'Living with a clear center instead of being controlled by image, comparison, or fear.',
    takeaway: 'When Christ is central, your identity becomes stronger than your circumstances.',
  },
  {
    week: 7,
    date: '2026-10-01',
    book: 'Philippians',
    passage: 'Philippians 3:13–14',
    title: 'Let Go and Move Forward',
    theme: 'Learning from the past without being trapped by it.',
    takeaway: 'A strong man owns his past, but he does not let it define his future.',
  },
  {
    week: 8,
    date: '2026-10-08',
    book: 'Philippians',
    passage: 'Philippians 4:6–7',
    title: 'Anxiety and Peace',
    theme: 'Bringing stress, pressure, and worry to God instead of carrying everything alone.',
    takeaway: 'Peace is not pretending life is easy; it is trusting God in the middle of pressure.',
  },
  {
    week: 9,
    date: '2026-10-15',
    book: 'Philippians',
    passage: 'Philippians 4:8',
    title: 'Control Your Thoughts',
    theme: 'Building mental discipline by focusing on what is true, honorable, and worthy.',
    takeaway: 'Your mind shapes your direction; what you focus on becomes what you follow.',
  },
  {
    week: 10,
    date: '2026-10-22',
    book: 'Philippians',
    passage: 'Philippians 4:11–13',
    title: 'Strength and Contentment',
    theme: 'Confidence rooted in Christ rather than comfort, status, or perfect circumstances.',
    takeaway: 'Real strength is not needing life to be easy before you move with confidence.',
  },
  {
    week: 11,
    date: '2026-10-29',
    book: 'Philippians',
    passage: 'Philippians 2:3–8',
    title: 'Leadership and Humility',
    theme: 'Learning servant leadership from the example of Jesus.',
    takeaway: 'The strongest leaders do not need to be the loudest men in the room.',
  },
  {
    week: 12,
    date: '2026-11-05',
    book: 'Philippians',
    passage: 'Philippians 1:27',
    title: 'Living With Integrity',
    theme: 'Representing your faith, your brotherhood, and yourself with consistency.',
    takeaway: 'Integrity means who you are in private matches who you claim to be in public.',
  },
  {
    week: 13,
    date: '2026-11-12',
    book: 'Colossians',
    passage: 'Colossians 1:16–17',
    title: 'Purpose and Identity',
    theme: 'Understanding that life, purpose, and identity are held together in Christ.',
    takeaway: 'You were made with purpose, not by accident and not for nothing.',
  },
  {
    week: 14,
    date: '2026-11-19',
    book: 'Colossians',
    passage: 'Colossians 2:6–7',
    title: 'Staying Grounded',
    theme: 'Building roots strong enough to handle pressure, success, and difficulty.',
    takeaway: 'Confidence grows when your foundation is deeper than your emotions.',
  },
  {
    week: 15,
    date: '2026-12-03',
    book: 'Colossians',
    passage: 'Colossians 3:1–2',
    title: 'Focus and Priorities',
    theme: 'Setting your mind on higher things and choosing what matters most.',
    takeaway: 'A disciplined life starts with disciplined priorities.',
  },
  {
    week: 16,
    date: '2026-12-10',
    book: 'Colossians',
    passage: 'Colossians 3:12–17',
    title: 'Character, Brotherhood, and Daily Action',
    theme: 'Putting faith into practice through character, forgiveness, gratitude, and brotherhood.',
    takeaway: 'Faith becomes real when it changes how you treat people every day.',
  },
]

const BOOK_OVERVIEW = [
  {
    book: 'John',
    reason:
      'John gives a clear foundation for understanding who Jesus is, why He matters, and what it means to follow Him.',
  },
  {
    book: 'Philippians',
    reason:
      'Philippians is practical for young men because it speaks directly to confidence, anxiety, purpose, discipline, humility, and mental strength.',
  },
  {
    book: 'Colossians',
    reason:
      'Colossians focuses on identity, character, priorities, and becoming grounded in Christ instead of being shaped by pressure or comparison.',
  },
]

const PRINCIPLES = [
  {
    title: 'Friendship',
    text: 'Building genuine brotherhood through trust, loyalty, encouragement, and care for one another.',
  },
  {
    title: 'Sound Learning',
    text: 'Pursuing growth through discipline, curiosity, humility, and a commitment to becoming better men.',
  },
  {
    title: 'Rectitude',
    text: 'Choosing integrity, moral courage, accountability, and doing what is right when it matters.',
  },
]

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

function parseDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function toISODate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function formatDate(dateString, options = {}) {
  const date = parseDate(dateString)
  return date.toLocaleDateString(undefined, {
    weekday: options.weekday ?? 'long',
    month: options.month ?? 'long',
    day: options.day ?? 'numeric',
    year: options.year ?? 'numeric',
  })
}

function getStudyStatus(item, referenceDate = new Date()) {
  const today = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate())
  const date = parseDate(item.date)

  const fridayAfter = new Date(date)
  fridayAfter.setDate(date.getDate() + 1)

  if (today >= fridayAfter) return 'past'
  if (today >= date && today < fridayAfter) return 'present'

  const currentItem = getCurrentStudy(referenceDate)
  if (currentItem?.week === item.week) return 'present'

  return 'future'
}

function getCurrentStudy(referenceDate = new Date()) {
  const now = new Date(referenceDate)
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  for (const item of SCRIPTURE_PLAN) {
    const studyDate = parseDate(item.date)
    const rollover = new Date(studyDate)
    rollover.setDate(studyDate.getDate() + 1)

    if (today < rollover) {
      return item
    }
  }

  return SCRIPTURE_PLAN[SCRIPTURE_PLAN.length - 1]
}

function getInitialCalendarDate() {
  const today = new Date()
  const year = today.getFullYear()

  if (year < 2026) return new Date(2026, 7, 1)
  if (year > 2027) return new Date(2027, 11, 1)

  return new Date(today.getFullYear(), today.getMonth(), 1)
}

function isThursday(date) {
  return date.getDay() === 4
}

function isCalendarInRange(date) {
  const start = new Date(2026, 0, 1)
  const end = new Date(2027, 11, 31)
  return date >= start && date <= end
}

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-10 max-w-4xl">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C9A227]/25 bg-[#C9A227]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#F3D36A]">
        <Sparkles className="h-3.5 w-3.5" />
        {eyebrow}
      </div>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">{subtitle}</p> : null}
    </div>
  )
}

function PageShell({ children }) {
  return <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:px-10">{children}</div>
}

function Pill({ children, tone = 'gold' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]',
        tone === 'blue'
          ? 'border-sky-300/20 bg-sky-400/10 text-sky-200'
          : 'border-[#C9A227]/25 bg-[#C9A227]/10 text-[#F3D36A]',
      )}
    >
      {children}
    </span>
  )
}

function GlassCard({ children, className = '' }) {
  return (
    <div className={cn('rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl', className)}>
      {children}
    </div>
  )
}

function StatCard({ value, label }) {
  return (
    <GlassCard className="p-5">
      <div className="text-3xl font-bold tracking-tight text-white">{value}</div>
      <div className="mt-1 text-sm text-slate-400">{label}</div>
    </GlassCard>
  )
}

function PrimaryButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#07111f] shadow-[0_12px_35px_rgba(255,255,255,0.08)] transition hover:-translate-y-0.5 hover:bg-[#F3D36A]"
    >
      {children}
    </button>
  )
}

function SecondaryButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-[#C9A227]/40 hover:bg-[#C9A227]/10"
    >
      {children}
    </button>
  )
}

function LogoMark({ compact = false }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-13 w-13 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white p-2 shadow-[0_14px_45px_rgba(0,0,0,0.25)]">
        <img src={pdtLogo} alt="Phi Delta Theta logo" className="h-full w-full object-contain" />
      </div>
      {!compact ? (
        <div className="leading-none">
          <div className="text-sm font-semibold uppercase tracking-[0.24em] text-[#F3D36A]">Phi Delta Theta</div>
          <div className="mt-1 text-sm text-slate-400">NC Epsilon • Chaplain</div>
        </div>
      ) : null}
    </div>
  )
}

function CalendarPage() {
  const [visibleMonth, setVisibleMonth] = useState(getInitialCalendarDate)

  const today = new Date()
  const todayISO = toISODate(today)
  const monthName = visibleMonth.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })

  const calendarCells = useMemo(() => {
    const year = visibleMonth.getFullYear()
    const month = visibleMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const startDay = firstDay.getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const cells = []

    for (let i = 0; i < startDay; i += 1) {
      cells.push(null)
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push(new Date(year, month, day))
    }

    while (cells.length % 7 !== 0) {
      cells.push(null)
    }

    return cells
  }, [visibleMonth])

  const changeMonth = (direction) => {
    setVisibleMonth((current) => {
      const next = new Date(current.getFullYear(), current.getMonth() + direction, 1)
      if (next < new Date(2026, 0, 1)) return current
      if (next > new Date(2027, 11, 1)) return current
      return next
    })
  }

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Weekly rhythm"
        title="Bible Study Calendar"
        subtitle="Every Thursday is reserved for weekly Bible Study. Location and time can be updated once the chapter schedule is finalized."
      />

      <GlassCard className="overflow-hidden">
        <div className="flex flex-col gap-5 border-b border-white/10 bg-white/[0.03] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F3D36A]">2026–2027 Calendar</div>
            <h3 className="mt-2 text-2xl font-semibold text-white">{monthName}</h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              className="rounded-full border border-white/10 bg-white/5 p-3 text-white transition hover:border-[#C9A227]/40 hover:bg-[#C9A227]/10"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setVisibleMonth(getInitialCalendarDate())}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-sky-300/40 hover:bg-sky-400/10"
            >
              Current Month
            </button>
            <button
              type="button"
              onClick={() => changeMonth(1)}
              className="rounded-full border border-white/10 bg-white/5 p-3 text-white transition hover:border-[#C9A227]/40 hover:bg-[#C9A227]/10"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 border-b border-white/10 bg-[#07111f]/70 text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="border-r border-white/10 px-2 py-3 last:border-r-0">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {calendarCells.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} className="min-h-[120px] border-b border-r border-white/10 bg-white/[0.015] last:border-r-0" />
            }

            const iso = toISODate(date)
            const currentDay = iso === todayISO
            const thursday = isThursday(date) && isCalendarInRange(date)

            return (
              <div
                key={iso}
                className={cn(
                  'min-h-[120px] border-b border-r border-white/10 p-2 transition last:border-r-0',
                  currentDay ? 'bg-sky-300/20 ring-1 ring-inset ring-sky-200/50' : 'bg-white/[0.025]',
                  thursday && !currentDay ? 'bg-[#C9A227]/[0.06]' : '',
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold',
                      currentDay ? 'bg-sky-200 text-[#07111f]' : 'text-slate-300',
                    )}
                  >
                    {date.getDate()}
                  </span>
                  {currentDay ? <span className="rounded-full bg-sky-200/20 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-sky-100">Today</span> : null}
                </div>

                {thursday ? (
                  <div className="mt-3 rounded-2xl border border-[#C9A227]/25 bg-[#C9A227]/10 p-3">
                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#F3D36A]">Bible Study</div>
                    <div className="mt-2 flex items-center gap-2 text-[11px] leading-5 text-slate-300">
                      <MapPin className="h-3.5 w-3.5 text-[#F3D36A]" />
                      {STUDY_LOCATION}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-[11px] leading-5 text-slate-300">
                      <Clock className="h-3.5 w-3.5 text-[#F3D36A]" />
                      {STUDY_TIME}
                    </div>
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </GlassCard>
    </PageShell>
  )
}

function ScripturePage() {
  const [tab, setTab] = useState('this-week')
  const currentStudy = getCurrentStudy()
  const pastItems = SCRIPTURE_PLAN.filter((item) => getStudyStatus(item) === 'past')
  const presentItems = SCRIPTURE_PLAN.filter((item) => getStudyStatus(item) === 'present')
  const futureItems = SCRIPTURE_PLAN.filter((item) => getStudyStatus(item) === 'future')

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Semester roadmap"
        title="Scripture Plan"
        subtitle="A simple 16-week plan built around John, Philippians, and Colossians to help young men grow in confidence, discipline, character, and understanding of Jesus."
      />

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        {BOOK_OVERVIEW.map((item) => (
          <GlassCard key={item.book} className="p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C9A227]/10 text-[#F3D36A]">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-white">{item.book}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">{item.reason}</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-white/10 bg-white/[0.03] p-3 sm:flex-row">
          {[
            { key: 'this-week', label: "This Week's Scripture" },
            { key: 'timeline', label: 'Past, Present, and Future' },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key)}
              className={cn(
                'rounded-full px-5 py-3 text-sm font-semibold transition',
                tab === item.key ? 'bg-white text-[#07111f]' : 'text-slate-300 hover:bg-white/10 hover:text-white',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {tab === 'this-week' ? (
              <motion.div
                key="this-week"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]"
              >
                <div className="relative overflow-hidden rounded-[2rem] border border-[#C9A227]/20 bg-[#C9A227]/10 p-7">
                  <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#C9A227]/20 blur-3xl" />
                  <div className="relative">
                    <Pill>Week {currentStudy.week}</Pill>
                    <h3 className="mt-5 text-3xl font-semibold tracking-tight text-white">{currentStudy.title}</h3>
                    <p className="mt-2 text-lg font-medium text-[#F3D36A]">{currentStudy.passage}</p>
                    <p className="mt-1 text-sm text-slate-400">{formatDate(currentStudy.date)}</p>
                    <p className="mt-6 text-base leading-8 text-slate-300">{currentStudy.theme}</p>
                    <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-[#07111f]/55 p-5">
                      <div className="text-xs font-bold uppercase tracking-[0.2em] text-sky-200">Main takeaway</div>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{currentStudy.takeaway}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <GlassCard className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-400/10 text-sky-200">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-400">Weekly meeting</div>
                        <div className="text-lg font-semibold text-white">Every Thursday • {STUDY_TIME}</div>
                      </div>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#C9A227]/10 text-[#F3D36A]">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-400">Location</div>
                        <div className="text-lg font-semibold text-white">{STUDY_LOCATION}</div>
                      </div>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-6">
                    <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F3D36A]">Auto-updating logic</div>
                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      This section advances to the next scheduled passage every Friday at 12:00 AM, keeping the current week’s study easy to find.
                    </p>
                  </GlassCard>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-8"
              >
                <PlanSection title="Past" items={pastItems} empty="No passages have been covered yet." tone="past" />
                <PlanSection title="Present" items={presentItems} empty="The current passage will appear here." tone="present" />
                <PlanSection title="Future" items={futureItems} empty="The semester plan is complete." tone="future" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </GlassCard>
    </PageShell>
  )
}

function PlanSection({ title, items, empty, tone }) {
  const Icon = tone === 'past' ? CheckCircle2 : tone === 'present' ? Sparkles : Circle

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-2xl',
            tone === 'past' && 'bg-emerald-400/10 text-emerald-300',
            tone === 'present' && 'bg-sky-400/10 text-sky-200',
            tone === 'future' && 'bg-[#C9A227]/10 text-[#F3D36A]',
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
      </div>

      {items.length === 0 ? (
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 text-sm text-slate-400">{empty}</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.week}
              className={cn(
                'rounded-[1.5rem] border p-5',
                tone === 'past' && 'border-emerald-400/15 bg-emerald-400/[0.04]',
                tone === 'present' && 'border-sky-300/25 bg-sky-400/[0.07]',
                tone === 'future' && 'border-[#C9A227]/20 bg-[#C9A227]/[0.055]',
              )}
            >
              <div className="flex flex-wrap items-center gap-2">
                <Pill tone={tone === 'present' ? 'blue' : 'gold'}>Week {item.week}</Pill>
                <span className="text-xs font-medium text-slate-500">{formatDate(item.date, { weekday: 'short', month: 'short' })}</span>
              </div>
              <h4 className="mt-4 text-lg font-semibold text-white">{item.title}</h4>
              <div className="mt-1 text-sm font-medium text-[#F3D36A]">{item.passage}</div>
              <p className="mt-3 text-sm leading-7 text-slate-400">{item.theme}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function HomePage({ setActivePage }) {
  const currentStudy = getCurrentStudy()

  return (
    <PageShell>
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.035] px-6 py-8 shadow-[0_28px_90px_rgba(0,0,0,0.35)] sm:px-8 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,162,39,0.16),transparent_32%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.01))]" />
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#C9A227]/15 blur-3xl" />
        <div className="absolute right-0 top-0 h-60 w-60 rounded-full bg-sky-500/10 blur-3xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C9A227]/25 bg-[#C9A227]/10 px-4 py-2 text-sm font-medium text-[#F3D36A]">
              <Cross className="h-4 w-4" />
              Phi Delta Theta • NC Epsilon • Chaplain
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Faith, brotherhood, and <span className="bg-gradient-to-r from-[#F3D36A] to-white bg-clip-text text-transparent">accountability</span>.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              This website provides a clear hub for weekly Bible Study, the semester scripture roadmap, and the mission behind spiritual leadership within Phi Delta Theta.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-semibold text-white">Weekly Bible Study</div>
                <div className="mt-1 text-xs leading-6 text-slate-400">Every Thursday</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-semibold text-white">16-Week Plan</div>
                <div className="mt-1 text-xs leading-6 text-slate-400">John • Philippians • Colossians</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-semibold text-white">Mission</div>
                <div className="mt-1 text-xs leading-6 text-slate-400">Growth through faith and brotherhood</div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <PrimaryButton onClick={() => setActivePage('scripture')}>
                View Scripture Plan <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
              <SecondaryButton onClick={() => setActivePage('calendar')}>Open Calendar</SecondaryButton>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md">
            <div className="rounded-[2rem] border border-white/10 bg-[#111827]/80 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.4)]">
              <div className="flex items-center justify-between gap-5 rounded-[1.5rem] border border-white/10 bg-white p-5">
                <img src={pdtLogo} alt="Phi Delta Theta logo" className="h-20 w-36 object-contain" />
                <img src={unccLogo} alt="UNC Charlotte logo" className="h-16 w-24 object-contain" />
              </div>

              <div className="mt-5 rounded-[1.5rem] border border-[#C9A227]/20 bg-[#C9A227]/10 p-5">
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#F3D36A]">This Week</div>
                <h3 className="mt-3 text-2xl font-semibold text-white">{currentStudy.title}</h3>
                <p className="mt-1 text-sm font-semibold text-[#F3D36A]">{currentStudy.passage}</p>
                <p className="mt-4 text-sm leading-7 text-slate-300">{currentStudy.takeaway}</p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <StatCard value="3" label="Books Covered" />
                <StatCard value="16" label="Week Plan" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {PRINCIPLES.map((principle) => (
          <GlassCard key={principle.title} className="p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C9A227]/10 text-[#F3D36A]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-white">{principle.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">{principle.text}</p>
          </GlassCard>
        ))}
      </div>
    </PageShell>
  )
}

function AboutPage() {
  return (
    <PageShell>
      <SectionHeader
        eyebrow="Leadership and brotherhood"
        title="About"
        subtitle="A professional overview of the person leading this effort, the values behind the chapter, and the purpose of the Chaplain role."
      />

      <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        <GlassCard className="overflow-hidden p-5">
          <div className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#27334a]">
            <img src={headshot} alt="Davis Higgins headshot" className="aspect-[4/5] h-full w-full object-cover" />
          </div>

          <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5">
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#F3D36A]">Chaplain Candidate</div>
            <h3 className="mt-3 text-2xl font-semibold text-white">Davis Higgins</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              I want the Chaplain role to be more than a title. My goal is to build a consistent, approachable, and meaningful system that helps brothers grow in faith, confidence, discipline, and character.
            </p>
          </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard className="p-7">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C9A227]/10 text-[#F3D36A]">
                <UserRound className="h-6 w-6" />
              </div>
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F3D36A]">Personal mission</div>
                <h3 className="mt-1 text-2xl font-semibold text-white">Building stronger men through faith and accountability.</h3>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-300">
              This site is designed to make the Chaplain role organized, visible, and useful. It gives brothers a clear calendar, a structured scripture plan, and a simple way to know what we are studying each week.
            </p>
          </GlassCard>

          <GlassCard className="p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border border-white/10 bg-white p-3">
                <img src={pdtCrest} alt="Phi Delta Theta crest" className="h-full w-full object-contain" />
              </div>
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F3D36A]">Fraternity values</div>
                <h3 className="mt-1 text-2xl font-semibold text-white">Friendship, Sound Learning, and Rectitude</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  These values shape the purpose of the Chaplain role: to strengthen brotherhood, encourage growth, and promote integrity in daily life.
                </p>
              </div>
            </div>
          </GlassCard>

          <div className="grid gap-4 md:grid-cols-3">
            {PRINCIPLES.map((principle) => (
              <div key={principle.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
                <h4 className="text-lg font-semibold text-white">{principle.title}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-400">{principle.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <GlassCard className="mt-6 p-7">
        <div className="grid gap-7 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <div className="flex items-center justify-center rounded-[2rem] border border-white/10 bg-white p-8">
            <img src={pdtLogo} alt="Phi Delta Theta logo" className="h-32 w-full object-contain" />
          </div>

          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C9A227]/10 text-[#F3D36A]">
                <Landmark className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F3D36A]">Chapter history</div>
                <h3 className="mt-1 text-2xl font-semibold text-white">Phi Delta Theta at UNC Charlotte — NC Epsilon</h3>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-300">
              Phi Delta Theta was founded on principles that emphasize lifelong friendship, personal development, learning, and moral character. At UNC Charlotte, NC Epsilon continues that mission by developing men who lead, serve, grow, and represent the fraternity with pride.
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              This Chaplain platform is meant to support that mission by providing structure around spiritual growth, weekly discussion, and brotherhood-centered accountability.
            </p>
          </div>
        </div>
      </GlassCard>
    </PageShell>
  )
}

export default function App() {
  const [activePage, setActivePage] = useState('home')

  const activeTitle = useMemo(() => {
    const item = NAV_ITEMS.find((nav) => nav.key === activePage)
    return item?.label ?? 'Home'
  }, [activePage])

  const pageAnimation = {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
    transition: { duration: 0.28 },
  }

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return (
          <motion.div key="home" {...pageAnimation}>
            <HomePage setActivePage={setActivePage} />
          </motion.div>
        )
      case 'calendar':
        return (
          <motion.div key="calendar" {...pageAnimation}>
            <CalendarPage />
          </motion.div>
        )
      case 'scripture':
        return (
          <motion.div key="scripture" {...pageAnimation}>
            <ScripturePage />
          </motion.div>
        )
      case 'about':
        return (
          <motion.div key="about" {...pageAnimation}>
            <AboutPage />
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#07111f] text-slate-100">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[#C9A227]/18 blur-3xl" />
        <div className="absolute right-0 top-40 h-[28rem] w-[28rem] rounded-full bg-sky-500/12 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[24rem] w-[24rem] rounded-full bg-[#C9A227]/10 blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07111f]/86 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
          <LogoMark />

          <nav className="hidden items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 shadow-[0_18px_60px_rgba(0,0,0,0.3)] lg:flex">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              const active = activePage === item.key

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActivePage(item.key)}
                  className={cn(
                    'inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition',
                    active ? 'bg-white text-[#07111f]' : 'text-slate-300 hover:bg-white/10 hover:text-white',
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </button>
              )
            })}
          </nav>

          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 lg:hidden">
            {activeTitle}
          </div>
        </div>

        <div className="mx-auto w-full max-w-7xl px-5 pb-4 sm:px-8 lg:hidden">
          <div className="flex snap-x gap-2 overflow-x-auto rounded-full border border-white/10 bg-white/5 p-2">
            {NAV_ITEMS.map((item) => {
              const active = activePage === item.key
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActivePage(item.key)}
                  className={cn(
                    'whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition',
                    active ? 'bg-white text-[#07111f]' : 'text-slate-300',
                  )}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>
      </header>

      <main>
        <AnimatePresence mode="wait">{renderPage()}</AnimatePresence>
      </main>
    </div>
  )
}
