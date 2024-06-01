import { render } from 'preact'
import { App } from './app.tsx'
import './index.css'
import './tailwind.css'
import { HashRouter } from 'react-router-dom'
import { AppProvider } from './context'
render(
    <HashRouter>
        <AppProvider>
            <App />
        </AppProvider>
    </HashRouter>
    ,
    document.getElementById('app')!
)
