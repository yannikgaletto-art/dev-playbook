# DIRECTIVE 03 — PathDot Hero Transition
**Version:** 1.1 (Post-Review)  
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
- ✅ Brandfarbe immer `bg-[#133C7B]` / `text-[#133C7B]` — **niemals** `bg-blue-600` (falsches Navy)
- ✅ Daten in `content/problems.ts` — **niemals** hardcoded in Komponenten
- ✅ State-Isolation: `HeroInteraction.tsx` ist die einzige Client Component im Hero
- ❌ Kein `useEffect` + `addEventListener('scroll')` — das ist anti-pattern
- ❌ Keine neuen npm packages — nur was bereits installiert ist
- ❌ Nicht alle Tasks gleichzeitig — **Task für Task**, visuell verifizieren auf `localhost:3000`

---

## 2. DATEISTRUKTUR

```
/components
  ui/
    PathLine.tsx          ← NEU: Strich + animierter Dot
  sections/
    HeroSection.tsx       ← EDIT: HeroInteraction einsetzen (bleibt Server Component)
    HeroInteraction.tsx   ← NEU: einzige Client Component im Hero (isoliert State)
    ProblemDrawer.tsx     ← NEU: Schublade mit Problem-Cards
/content
  problems.ts             ← NEU: Daten für die Problem-Cards
```

> **Regel:** `HeroSection.tsx` darf kein `"use client"` bekommen. State bleibt in `HeroInteraction.tsx` isoliert, damit H1/Text als Server Component gerendert bleiben (SSR, SEO).

---

## 3. TASK 0 — `content/problems.ts` (Daten zuerst)

**Ziel:** Alle statischen Texte aus Komponenten heraushalten.

```ts
// content/problems.ts
export const PROBLEMS = [
  { icon: '🔍', title: 'Jobsuche',              sub: '4 Portale, 20 Tabs, Unternehmensanalyse...' },
  { icon: '📄', title: 'Lebenslauf anpassen',   sub: 'ATS-Keywords, Stichpunkte und Zahlen zuordnen.' },
  { icon: '✏️', title: 'Anschreiben generieren', sub: 'KI prompten, Re-Prompten, Output anpassen.' },
  { icon: '📁', title: 'Formatieren',            sub: 'Word formatieren, letzte Änderungen, PDF Export.' },
  { icon: '📬', title: 'Verwaltung',             sub: 'E-Mails senden, Follow-Ups, Tracking.' },
  { icon: '🔄', title: 'Nächste Stelle',         sub: 'Von vorne beginnen. Jeden Tag.' },
  { icon: '⏳', title: 'Warten',                 sub: 'Keine Antwort, kein Feedback. Kein Grund.' },
] as const
```

---

## 4. TASK 1 — `ui/PathLine.tsx`

**Ziel:** Vertikaler Strich + Dot, scroll-getrieben. `onReach` feuert **genau einmal** — Guard ist im Code, nicht in einer Checkbox.

### Props Interface
```tsx
interface PathLineProps {
  onReach: () => void
}
```

### Implementation
```tsx
'use client'
import { useScroll, useTransform, motion, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

export default function PathLine({ onReach }: PathLineProps) {
  const ref = useRef<HTMLDivElement>(null)
  const hasTriggered = useRef(false)          // 🔴 Guard: feuert nur 1×
  const prefersReduced = useReducedMotion()   // 🟡 Accessibility

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end end']
  })

  // Skip scroll animation if user prefers reduced motion
  const dotY     = useTransform(scrollYProgress, [0, 1], prefersReduced ? ['100%', '100%'] : ['0%', '100%'])
  const dotScale = useTransform(scrollYProgress, [0.9, 0.95, 1], prefersReduced ? [1, 1, 1] : [1, 1.8, 1])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v >= 0.95 && !hasTriggered.current) {
      hasTriggered.current = true
      onReach()
    }
  })

  return (
    <div ref={ref} className="relative flex justify-center" style={{ height: '100%' }}>
      {/* Vertical line */}
      <div className="w-px bg-[#133C7B] h-full absolute left-1/2 -translate-x-1/2" />
      {/* Animated dot */}
      <motion.div
        aria-hidden="true"
        className="w-3 h-3 rounded-full bg-[#133C7B] absolute left-1/2 -translate-x-1/2"
        style={{ top: dotY, scale: dotScale }}
      />
    </div>
  )
}
```

### Visual Check nach Task 1
- [ ] Dot bewegt sich beim Scrollen (Farbe: Navy `#133C7B`, nicht hellblau)
- [ ] Dot macht Pulse bei Ankunft — **nur einmal**, auch wenn man zurückscrollt
- [ ] Bei `prefers-reduced-motion`: Dot steht still unten, kein Flackern
- [ ] Kein Layout-Shift

---

## 5. TASK 2 — `sections/ProblemDrawer.tsx`

**Ziel:** Schublade von unten. Schließbar per Backdrop-Click, ESC-Key und Close-Button. Daten kommen aus `content/problems.ts`.

### Props Interface
```tsx
interface ProblemDrawerProps {
  isOpen: boolean
  onClose: () => void
}
```

### Implementation
```tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { PROBLEMS } from '@/content/problems'

export default function ProblemDrawer({ isOpen, onClose }: ProblemDrawerProps) {

  // ESC key to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Probleme ohne Pathly"
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[80vh] overflow-y-auto focus:outline-none"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 60, damping: 20 }}
          >
            <div className="p-8">
              {/* Handle bar */}
              <button
                onClick={onClose}
                aria-label="Schließen"
                className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-8 block cursor-pointer hover:bg-gray-400 transition-colors"
              />

              {/* Toggle header */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-semibold text-gray-500">Wie ich es bisher gemacht habe</span>
                <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                  <span className="text-xs font-bold text-[#133C7B]">Pathly</span>
                </div>
                <span className="text-sm font-semibold text-[#133C7B]">Wie ich es jetzt mache</span>
              </div>

              {/* Problem cards */}
              <ul className="flex flex-col gap-3" role="list">
                {PROBLEMS.map((p, i) => (
                  <motion.li
                    key={p.title}
                    className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                  >
                    <span className="text-xl w-8 text-center" aria-hidden="true">{p.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{p.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{p.sub}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

### Visual Check nach Task 2
- [ ] Schublade gleitet von unten rein (spring)
- [ ] Backdrop verdunkelt den Hintergrund
- [ ] Backdrop-Click schließt die Schublade
- [ ] ESC-Key schließt die Schublade
- [ ] Handle-Bar ist klickbar (schließt auch)
- [ ] Cards: Farbe Navy `#133C7B`, nicht hellblau
- [ ] Screen Reader: `role="dialog"` + `aria-modal` vorhanden

---

## 6. TASK 3 — `sections/HeroInteraction.tsx` (Client Component, isoliert)

**Ziel:** `HeroSection.tsx` bleibt Server Component. Nur diese kleine Wrapper-Komponente trägt `"use client"` und hält den State.

```tsx
'use client'
import { useState } from 'react'
import PathLine from '@/components/ui/PathLine'
import ProblemDrawer from '@/components/sections/ProblemDrawer'

export default function HeroInteraction() {
  const [dotArrived, setDotArrived] = useState(false)

  return (
    <>
      <PathLine onReach={() => setDotArrived(true)} />
      <ProblemDrawer isOpen={dotArrived} onClose={() => setDotArrived(false)} />
    </>
  )
}
```

In `HeroSection.tsx` (Server Component, kein `"use client"`):
```tsx
import HeroInteraction from './HeroInteraction'
// ...
<HeroInteraction />
```

### Visual Check nach Task 3
- [ ] `HeroSection.tsx` hat **kein** `"use client"` — H1 bleibt SSR
- [ ] Dot läuft korrekt, Schublade öffnet sich
- [ ] Schublade schließt per ESC, Backdrop, Handle-Bar
- [ ] Mobile (375px): max-h-[80vh] greift, Schublade scrollbar
- [ ] `prefers-reduced-motion` aktiv: Dot steht still, Schublade erscheint sofort ohne Slide

---

## 7. DONE CHECKLIST (aus CLAUDE.md)

```
[ ] CLAUDE.md gelesen vor erstem Commit
[ ] content/problems.ts erstellt (Daten nie in Komponenten)
[ ] Brandfarbe #133C7B überall — kein blue-600
[ ] HeroSection.tsx hat kein "use client"
[ ] onReach Guard (useRef) im Code — nicht nur in Checklist
[ ] role="dialog" + aria-modal + aria-label auf Drawer
[ ] ESC + Backdrop + Handle-Bar schließen den Drawer
[ ] useReducedMotion() in PathLine implementiert
[ ] Visual Check auf localhost:3000 nach JEDEM Task
[ ] past.md: Eintrag hinzufügen nach Completion
[ ] stats.md: Lighthouse Score vor/nach notieren
```

---

## 8. HÄUFIGE FEHLER — NICHT TUN

| ❌ Falsch | ✅ Richtig |
|---|---|
| `bg-blue-600` | `bg-[#133C7B]` |
| Daten hardcoded in Komponente | `import { PROBLEMS } from '@/content/problems'` |
| `useState` in `HeroSection.tsx` | State isolieren in `HeroInteraction.tsx` |
| Drawer ohne `onClose` | `onClose` per ESC + Backdrop + Button |
| `onReach` feuert mehrfach | `useRef<boolean>` Guard direkt im Code |
| `addEventListener('scroll', ...)` | `useScroll()` von Framer Motion |
| Alle Tasks auf einmal | Task 0 → 1 → 2 → 3, jedes Mal visuell prüfen |
