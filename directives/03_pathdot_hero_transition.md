# DIRECTIVE 03 — PathDot Hero Transition
**Version:** 1.0  
**Status:** ACTIVE  
**Scope:** Pathly Website — Hero Section only  
**Stack:** Next.js · Tailwind CSS · Framer Motion  

---

## 0. MISSION

Der blaue Punkt (`PathDot`) läuft den vertikalen Strich in der Hero Section herunter.  
Wenn er unten ankommt, zieht er die nächste Sektion (`ProblemDrawer`) wie eine Schublade von unten in denselben Viewport — **ohne echten Page-Scroll**.

**Visuelles Ergebnis:** Eine einzige, durchgehende Bewegung. Kein Seitenwechsel. Fühlt sich wie eine native App an.

---

## 1. CONSTRAINTS (NICHT VERHANDELBAR)

- ✅ Nur **Tailwind CSS** — kein Vanilla CSS, keine inline `style={}` außer für Framer Motion values
- ✅ Alle Animationen ausschließlich mit **Framer Motion** (`motion.div`, `useScroll`, `useTransform`, `AnimatePresence`)
- ❌ Kein `useEffect` + `addEventListener('scroll')` — das ist anti-pattern
- ❌ Keine neuen npm packages — nur was bereits installiert ist
- ❌ Nicht alle Tasks gleichzeitig — **Task für Task**, visuell verifizieren auf `localhost:3000`

---

## 2. DATEISTRUKTUR

```
/components
  PathLine.tsx       ← NEU: Strich + animierter Dot
  ProblemDrawer.tsx  ← NEU: Schublade mit Problem-Cards
  HeroSection.tsx    ← EDIT: beide Komponenten einsetzen
```

---

## 3. TASK 1 — `PathLine.tsx`

**Ziel:** Vertikaler blauer Strich mit einem Dot der beim Scrollen nach unten läuft. Bei Ankunft unten: `onReach` Callback feuern.

### Props Interface
```tsx
interface PathLineProps {
  onReach: () => void
}
```

### Implementation
```tsx
'use client'
import { useScroll, useTransform, motion, useMotionValueEvent } from 'framer-motion'
import { useRef } from 'react'

export default function PathLine({ onReach }: PathLineProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end end']
  })

  const dotY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const dotScale = useTransform(scrollYProgress, [0.9, 0.95, 1], [1, 1.8, 1])

  // Trigger onReach when dot arrives at bottom
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v >= 0.95) onReach()
  })

  return (
    <div ref={ref} className="relative flex justify-center" style={{ height: '100%' }}>
      {/* The vertical line */}
      <div className="w-px bg-blue-600 h-full absolute left-1/2 -translate-x-1/2" />
      
      {/* The animated dot */}
      <motion.div
        className="w-3 h-3 rounded-full bg-blue-600 absolute left-1/2 -translate-x-1/2"
        style={{ top: dotY, scale: dotScale }}
      />
    </div>
  )
}
```

### Visual Check nach Task 1
- [ ] Dot bewegt sich beim Scrollen nach unten
- [ ] Dot macht kurzen Pulse wenn er unten ankommt
- [ ] Kein Flackern, kein Layout-Shift

---

## 4. TASK 2 — `ProblemDrawer.tsx`

**Ziel:** Die Problem-Sektion (Bild 2) erscheint als Schublade von unten — `position: fixed`, `bottom: 0`, slide-in wenn `isOpen = true`.

### Props Interface
```tsx
interface ProblemDrawerProps {
  isOpen: boolean
}
```

### Implementation
```tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'

const PROBLEMS = [
  { icon: '🔍', title: 'Jobsuche', sub: '4 Portale, 20 Tabs, Unternehmensanalyse...' },
  { icon: '📄', title: 'Lebenslauf anpassen', sub: 'ATS-Keywords, Stichpunkte und Zahlen zuordnen.' },
  { icon: '✏️', title: 'Anschreiben generieren', sub: 'KI prompten, Re-Prompten, Output anpassen.' },
  { icon: '📁', title: 'Formatieren', sub: 'Word formatieren, letzte Änderungen, PDF Export.' },
  { icon: '📬', title: 'Verwaltung', sub: 'E-Mails senden, Follow-Ups, Tracking.' },
  { icon: '🔄', title: 'Nächste Stelle', sub: 'Von vorne beginnen. Jeden Tag.' },
  { icon: '⏳', title: 'Warten', sub: 'Keine Antwort, kein Feedback. Kein Grund.' },
]

export default function ProblemDrawer({ isOpen }: ProblemDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[80vh] overflow-y-auto"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 60, damping: 20 }}
        >
          <div className="p-8">
            {/* Handle bar */}
            <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-8" />
            
            {/* Toggle header */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-semibold text-gray-500">Wie ich es bisher gemacht habe</span>
              <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                <span className="text-xs font-bold text-blue-700">Pathly</span>
              </div>
              <span className="text-sm font-semibold text-blue-700">Wie ich es jetzt mache</span>
            </div>

            {/* Problem cards */}
            <div className="flex flex-col gap-3">
              {PROBLEMS.map((p, i) => (
                <motion.div
                  key={p.title}
                  className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  <span className="text-xl w-8 text-center">{p.icon}</span>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{p.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{p.sub}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

### Visual Check nach Task 2
- [ ] Schublade gleitet von unten rein (spring, nicht linear)
- [ ] Cards erscheinen mit leichtem Stagger (0.06s delay pro Card)
- [ ] Handle-Bar oben sichtbar
- [ ] Scrollbar wenn Content zu lang

---

## 5. TASK 3 — Integration in `HeroSection.tsx`

**Ziel:** Beide Komponenten in die bestehende Hero Section einhängen. So wenig Änderungen wie möglich.

```tsx
// Am Anfang der Komponente hinzufügen:
const [dotArrived, setDotArrived] = useState(false)

// Im JSX — PathLine dort einhängen wo der Strich bereits ist:
<PathLine onReach={() => setDotArrived(true)} />

// Ganz am Ende des Hero JSX, vor dem schließenden Tag:
<ProblemDrawer isOpen={dotArrived} />
```

### Visual Check nach Task 3
- [ ] Dot läuft beim Scrollen korrekt
- [ ] Bei Ankunft: Schublade öffnet sich
- [ ] Kein doppeltes Triggern (onReach wird nur 1× ausgelöst)
- [ ] Mobile: Schublade nimmt max 80vh ein, scrollbar
- [ ] `prefers-reduced-motion`: Testen ob Framer Motion das respektiert

---

## 6. DONE CHECKLIST (aus CLAUDE.md)

```
[ ] CLAUDE.md gelesen vor erstem Commit
[ ] Kein Vanilla CSS — nur Tailwind
[ ] Framer Motion für ALLE Animationen
[ ] Visual Check auf localhost:3000 nach JEDEM Task
[ ] Kein doppeltes onReach-Triggern (Guard einbauen: if (dotArrived) return)
[ ] past.md: Eintrag hinzufügen nach Completion
[ ] stats.md: Lighthouse Performance Score vor/nach notieren
```

---

## 7. HÄUFIGE FEHLER — NICHT TUN

| ❌ Falsch | ✅ Richtig |
|---|---|
| `addEventListener('scroll', ...)` | `useScroll()` von Framer Motion |
| `style={{ top: '50px' }}` hardcoded | `useTransform(scrollYProgress, ...)` |
| Alle 3 Tasks auf einmal | Task 1 → visuell prüfen → Task 2 → prüfen → Task 3 |
| `position: absolute` auf Drawer | `position: fixed, bottom: 0` |
| Neue npm packages installieren | Nur bestehende Framer Motion API nutzen |
