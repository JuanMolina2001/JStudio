import { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";

const Panel: FunctionalComponent<{
  elements: Array<Elements>;
  cols?: string;
  rows: string;

}> = ({ elements, rows, cols }) => {
  const [active, setActive] = useState<number>(0)
  return (
    <section class={`flex flex-col row-span-${rows} col-span-${cols} w-full h-full`}>
      <div class="w-full flex h-fit border-b border-b-[var(--opacity-text)]" >
        {elements.map((element, index) => {
          return (
            <button id={element.title} key={index} onClick={() => setActive(index)} class={`px-1 cursor-pointer  hover:bg-[var(--primary)] ${active === index ? "bg-[var(--primary)]" : null}`}>{element.title}</button>
          )
        })
        }
      </div>
      <div id={`${elements[active].title}Container`} class="flex-1 overflow-auto">
        {elements[active].component}
      </div>
    </section>
  )
}

export default Panel