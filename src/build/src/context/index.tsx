import { createContext } from "preact";
import { FunctionalComponent } from "preact";

import { ReactNode, useEffect, useState } from "preact/compat";


export const AppContext = createContext<Settings | undefined>(undefined)

export const AppProvider: FunctionalComponent<{
    children: ReactNode
}> = ({ children }) => {
  const [settings, setSettings] = useState<Settings | undefined>(undefined)
  useEffect(() => {
    fetch('/settings.json').then(async (res) => {
      const data = await res.json()
      setSettings(data)
    })
  }, [])
  return (
    <AppContext.Provider value={settings}>
      {children}
    </AppContext.Provider>
  )
}