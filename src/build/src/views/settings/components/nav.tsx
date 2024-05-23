import { useEffect, useState } from "preact/hooks"
const Nav = ({ }) => {
  const [elements, setElements] = useState<any>({})
  useEffect(() => {
    const general = document.getElementById('general') as HTMLElement
    const files = document.getElementById('file') as HTMLElement
    const ide = document.getElementById('ide') as HTMLElement
    const terminal = document.getElementById('terminal') as HTMLElement
    const getElements = (element: HTMLElement) => {
      return Array.from(element?.querySelectorAll('[id]')).filter(el => el.getAttribute('type') !== 'radio' && el.getAttribute('type') !== 'file').map((element) => element.id)
    }
    const elements = {
      general: getElements(general),
      file: getElements(files),
      ide: getElements(ide),
      terminal: getElements(terminal)
    }
    console.log(elements)
    setElements(elements)
  }, [])
  return (
    <nav class="w-[200px] py-6 border-r-[var(--text)] max-h-[100vh] overflow-y-auto  border-solid border-r-[1px]">
      {
        Object.keys(elements).map((element, index) => {
          return (
            <details key={index}>
              <summary>
                <a href={`#${element}`} onClick={(e) => {
                  const parent = (e.target as HTMLElement).parentElement?.parentElement as HTMLDetailsElement
                  console.log(parent)
                  parent.open = !parent.open
                }}>
                  {element}
                </a>
              </summary>
              <div class="flex flex-col ml-3">
                {
                  elements[element].map((el: string, i: number) => {
                    return <a href={`#${el}`} key={i}>
                      {el.replaceAll('-', ' ').replace('Path', '')}
                    </a>
                  })
                }
              </div>
            </details>
          )
        })
      }
    </nav>
  )
}

export default Nav