import { useEffect, useState } from "preact/hooks";
import { Panel, Objects, Renderer, FileExplorer, Terminal, Animations, Scenes, IdeComponent } from "./components"
const Editor = ({ }) => {
  document.title = "Editor - JStudio"
  const currentProject: Project = JSON.parse(localStorage.getItem('currentProject') as string)
  const [ideFile, setIdeFile] = useState<FileProject | undefined>(undefined)
  useEffect(() => {
    window.JStudio.ide.onOpenFile((file) => {
      console.log(file)
      setIdeFile(file)
    })

  }, []);
  return (
    <div class="flex flex-col h-screen w-screen" id="editor">
      <header className="h-[50px] w-full px-3">
        <nav className="flex justify-between items-center h-full w-full text-white">
          <div className="flex items-center">
            <h1 className="text-xl ml-4">JStudio</h1>
          </div>
          <div className="flex items-center gap-5">
            <button class="hover:bg-[var(--primary)] rounded-md w-fit h-fit" onClick={() => {
              window.JStudio.terminal.run({
                  command: 'npm',
                  args: ['start'],
                  cwd: currentProject.path,
                })
            }}>
              <i class="bi bi-play"></i>
            </button>
          </div>
        </nav>
      </header>
      <main class="grid grid-rows-5 grid-cols-5 h-[90vh]">
        <Panel elements={[{ component: <Objects />, title: 'Objects' }, { component: <Scenes />, title: 'Escenas' }]} rows="3" cols="1" />
        <Panel elements={[{ component: <Renderer />, title: 'Render' }, { component: <IdeComponent file={ideFile} />, title: 'IDE' }]} rows="4" cols="3" />
        <Panel elements={[{ component: <Objects />, title: 'test1' }]} rows="3" cols="1" />
        <Panel elements={[{ component: <FileExplorer />, title: 'Files' }]} rows="2" cols="1" />
        <Panel elements={[{ component: <Terminal project={currentProject} />, title: 'Console' }, { component: <Animations />, title: 'Animations' }]} rows="1" cols="4" />
      </main>
    </div>
  )
}

export default Editor