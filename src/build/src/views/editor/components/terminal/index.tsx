import { useEffect, useRef, useState } from "preact/hooks"
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
  const terminal = new Terminal(settings as ITerminalOptions);
  useEffect(() => {
    console.log(terminal.options)
    terminal.open(document.getElementById('terminal') as HTMLElement);
    terminal.write(project.path + '>');
    let lastLine = ''
    let cwd = project.path;
    terminal.attachCustomKeyEventHandler(e=>{
      const {content, bool} = keyEventHandler(e) as {content: string, bool: boolean}
      terminal.write(content)
      return bool
    });

    terminal.onKey((e) => {
      if (e.key === '\r') {
        terminal.write('\r\n')
        if (lastLine !== '') {
          window.JStudio.terminal.run({
            command: lastLine.split(' ')[0],
            args: lastLine.split(' ').slice(1) || [],
            cwd: cwd
          }).then(data => {
            if (data.type === 'cwd') {
              cwd = data.message;
              lastLine += e.key;
              terminal.write(data.message + '>');
            } else {
              terminal.write(data.message);
              terminal.write('\r\n')
              lastLine += e.key;
              terminal.write(cwd + '>');

            }
          })

        } else {
          terminal.write(cwd + '>');
        }
      } else {
        terminal.write(e.key)
      }



    })
    return () => {
      terminal.dispose();
    }
  }, []);


  return (
    <div class="relative  w-full h-full flex overflow-hidden">
      <div ref={terminalRef} class="h-full w-full overflow-y-auto" id="terminal"></div>
      <div class="flex flex-col h-full w-10">
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