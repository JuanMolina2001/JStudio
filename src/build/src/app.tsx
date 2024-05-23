import { Routes, Route} from 'react-router-dom'
import { Editor, Start, NewProject, Settings } from './views'
import { AppContext } from './context';
import { useContext } from 'preact/hooks';
import './theme.css'
export function App() {
  const settings = useContext(AppContext);
  const general = settings?.general;
  if (!general) return <div>Loading...</div>
  if(general.theme === 'system'){
    const dark = window.matchMedia('(prefers-color-scheme: dark)').matches
    document.documentElement?.setAttribute('data-theme', dark ? 'dark' : 'light');
  }
  else{
    document.documentElement?.setAttribute('data-theme', general.theme);
  }
  return (

      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/new-project" element={<NewProject />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>


  )
}
