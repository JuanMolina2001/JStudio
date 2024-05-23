import Files from "./files"
// import { AppContext } from "../../../../context"
// import { useContext } from "preact/hooks"
const FileExplorer = ({}) => {
  // const {files: settings} = useContext(AppContext)
  const currentProject: Project = JSON.parse(localStorage.getItem('currentProject') as string)
  return (
    <>
      <h1 class="text-xl">{currentProject.name}</h1>
      <div class="flex gap-2">
        <button class="hover:bg-[#33333369] p-1 rounded-md">
          <i class="bi bi-folder-plus"></i>
        </button>
        <button class="hover:bg-[#33333369]  p-1 rounded-md">
          <i class="bi bi-file-earmark-plus"></i>
        </button>
        <button onClick={() => {
          (document.querySelector('#FilesContainer') as HTMLDetailsElement).querySelectorAll('details').forEach((detail) => {
            detail.open = false
            const icon = detail.querySelector('i');
            if (icon) {
              icon.classList.remove('bi-folder2-open')
              icon.classList.add('bi-folder2')
            }
          })
        }}
        class="hover:bg-[#33333369]  p-1 rounded-md"
        >
          <i class="bi bi-dash-square"></i>
        </button>
      </div>
      <Files path={`${currentProject.path}`} />
    </>
  )
}
export default FileExplorer