'use client'

import { createContext, useContext, useCallback, useEffect, useSyncExternalStore } from 'react'

export type Lang = 'mk' | 'en'

function getSnapshot(): Lang {
  if (typeof window === 'undefined') return 'mk'
  return (localStorage.getItem('lang') as Lang) ?? 'mk'
}

function getServerSnapshot(): Lang {
  return 'mk'
}

const listeners = new Set<() => void>()

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

interface LangContextValue {
  lang: Lang
  toggle: () => void
  t: (mk: string, en: string) => string
}

const LangContext = createContext<LangContextValue>({
  lang: 'mk',
  toggle: () => {},
  t: (mk) => mk,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggle = useCallback(() => {
    const next: Lang = getSnapshot() === 'mk' ? 'en' : 'mk'
    localStorage.setItem('lang', next)
    document.documentElement.setAttribute('lang', next === 'mk' ? 'mk' : 'en')
    listeners.forEach(fn => fn())
  }, [])

  const t = useCallback((mk: string, en: string) => lang === 'mk' ? mk : en, [lang])

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
