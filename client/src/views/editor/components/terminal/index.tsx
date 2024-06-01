import { useEffect, useRef } from "preact/hooks"
import { Terminal } from "@xterm/xterm";
import '@xterm/xterm/css/xterm.css'
import { FunctionalComponent } from "preact";
import { keyEventHandler } from "./utils";
import { useContext } from "preact/hooks";
import { AppContext } from "../../../../context";
import { ITerminalOptions } from "xterm";
const Tmnl: FunctionalComponent<{
  project: Project
}> = ({ project }) => {
  const { terminal: settings } = useContext(AppContext) as Settings
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminal = new Terminal({
    ...settings,
    scrollOnUserInput: true,
    rows: 30,
  } as ITerminalOptions);
  useEffect(() => {
    console.log(terminal.options)
    terminal.open(terminalRef.current as HTMLDivElement);
    terminal.write(project.path + '>');
    let lastLine = ''
    let cwd = project.path;
    terminal.attachCustomKeyEventHandler(e => {
      const { content, bool } = keyEventHandler(e) as { content: string, bool: boolean }
      terminal.write(content)
      if (content === '\b \b' && lastLine.length > 0) {
        lastLine = lastLine.slice(0, -1)
      }
      return bool
    });
    window.JStudio.terminal.onLog()
      .then((log) => {
        terminal.attachCustomKeyEventHandler(() => false);
        if (log.type === 'cwd') {
          cwd = log.message;
        }
        terminal.write(log.message);
        terminal.write('\r\n');
        if (log.type === 'finish') {
          terminal.attachCustomKeyEventHandler(e => {
            const { content, bool } = keyEventHandler(e) as { content: string, bool: boolean }
            terminal.write(content)
            if (content === '\b \b' && lastLine.length > 0) {
              lastLine = lastLine.slice(0, -1)
            }
            return bool
          });
          terminal.write(cwd + '>');
        }
      })
    terminal.onKey((e) => {
      if (e.key === '\r') {
        terminal.write('\r\n')
        if (lastLine !== '') {
          window.JStudio.terminal.run({
            command: lastLine.split(' ')[0],
            args: lastLine.split(' ').slice(1) || [],
            cwd: cwd
          })
          lastLine = ''
        } else {
          terminal.write(cwd + '>');
        }
      } else {
        lastLine += e.key;
        terminal.write(e.key)
        console.log(lastLine)
      }
    })
    return () => {
      terminal.dispose();
    }
  }, []);


  return (
    <div class="w-full flex h-full " style={{ background: settings.theme.background }}>
      <div ref={terminalRef} class="w-full h-full" id="terminal"></div>
      <div class="flex flex-col  w-10">
        <button>
          <i class="bi bi-terminal-plus row-span-1.5"></i>
        </button>
        <button >
          <i class="bi bi-list"></i>
        </button>
        <button >
          <i class="bi bi-exclamation-triangle text-red-500"></i>
        </button>
        <button >
          <i class="bi bi-exclamation-triangle text-yellow-500"></i>
        </button>
        <button >
          <i class="bi bi-info-circle text-blue-500"></i>
        </button>
      </div>
    </div>

  )
}

export default Tmnl;