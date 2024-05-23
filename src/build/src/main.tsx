import { render } from 'preact'
import { App } from './app.tsx'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@tabler/icons-webfont/dist/tabler-icons.css'
import './index.css'
import './tailwind.css'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './context/index.tsx'
render(
    <AppProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </AppProvider>
    ,
    document.getElementById('app')!
)
