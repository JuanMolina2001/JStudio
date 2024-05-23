import { useContext } from "preact/hooks"
import { Submit } from "../../components/inputs"
import { IdeSettings, GeneralSettings, FilesSettings, Nav, TerminalSettings } from "./components"
import { AppContext } from "../../context"
const Settings = () => {

    document.title = 'Config - JStudio'
    const settings = useContext(AppContext)
    const saveSettings = (e: Event) => {
        if (!settings) return
        e.preventDefault()
        const form = e.currentTarget as HTMLFormElement
        const data = new FormData(form)
        const executableValue = (file: string) => {
            return data.get(file) === 'custom' ? (data.get(`${file}Path`) as File).path as string : data.get(file) as string
        };
        const newSettings: Settings = {
            general: {
                icons: {
                    name: data.get('icon-pack-name') as string,
                    path: data.get('icon-pack-file') as string
                },
                theme: data.get('theme') as string
            },
            ide: {
                theme: data.get('ide-theme') as string,
                autosave: data.get('autosave') === 'on',
                fontSize: parseInt(data.get('font-size') as string),
                fontFamily: data.get('font-family') as string,
                tabSize: 4
            },

            files: {
                image: {
                    executable: executableValue('image')
                },
                code: {
                    executable: executableValue('code')
                },
                audio: {
                    executable: executableValue('audio')
                },
            },
            terminal: {
                fontFamily: data.get('terminal-font') as string,
                fontSize: parseInt(data.get('terminal-font-size') as string),
                fontWeight: data.get('terminal-font-weight') as string,
                cursorStyle: data.get('terminal-cursor-style') as string,
                cursorWidth: parseInt(data.get('terminal-cursor-width') as string),
                cursorBlinking: data.get('terminal-cursor-blink') === 'on',
                theme: {
                    background: data.get('terminal-color-background') as string,
                    foreground: data.get('terminal-color-foreground') as string,
                    black: data.get('terminal-color-black') as string,
                    red: data.get('terminal-color-red') as string,
                    green: data.get('terminal-color-green') as string,
                    yellow: data.get('terminal-color-yellow') as string,
                    blue: data.get('terminal-color-blue') as string,
                    magenta: data.get('terminal-color-magenta') as string,
                    cyan: data.get('terminal-color-cyan') as string,
                    white: data.get('terminal-color-white') as string,
                    brightBlack: data.get('terminal-color-brightBlack') as string,
                    brightRed: data.get('terminal-color-brightRed') as string,
                    brightGreen: data.get('terminal-color-brightGreen') as string,
                    brightYellow: data.get('terminal-color-brightYellow') as string,
                    brightBlue: data.get('terminal-color-brightBlue') as string,
                    brightMagenta: data.get('terminal-color-brightMagenta') as string,
                    brightCyan: data.get('terminal-color-brightCyan') as string,
                    brightWhite: data.get('terminal-color-brightWhite') as string,
                }
            
            }
        }
        window.JStudio.setSettings(newSettings)
        
        
    }
    if (!settings) return <div>Loading...</div>
    return (
        <div class="flex h-screen p-2 gap-2">
            <Nav />
            <form class="px-2 flex flex-col h-full py-6 rounded-md overflow-y-scroll w-full" onSubmit={saveSettings}>
                <h1>
                    Settings
                </h1>
                <GeneralSettings settings={settings?.general} />
                <FilesSettings settings={settings?.files} />
                <IdeSettings settings={settings?.ide} />
                <TerminalSettings settings={settings?.terminal} />
                <div class="fixed bottom-0 right-0 m-2">
                    <Submit>
                        Save
                    </Submit>
                </div>
            </form>
        </div>
    )
}

export default Settings