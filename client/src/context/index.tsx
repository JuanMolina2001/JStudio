import { createContext } from "preact";
import { FunctionalComponent } from "preact";

import { ReactNode, useEffect, useState } from "preact/compat";


export const AppContext = createContext<Settings | undefined>(undefined)

export const AppProvider: FunctionalComponent<{
    children: ReactNode
}> = ({ children }) => {
  const [settings, setSettings] = useState<Settings | undefined>(undefined)
  useEffect(() => {
   window.JStudio.settings.get().then((settings) => {
     setSettings(settings)
   })
  }, [])
  return (
    <AppContext.Provider value={settings}>
      {children}
    </AppContext.Provider>
  )
}