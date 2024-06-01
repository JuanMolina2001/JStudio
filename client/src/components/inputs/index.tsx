import { FunctionalComponent } from "preact"
import { useState } from "preact/hooks"
const ColorPicker: FunctionalComponent<InputComponent> = ({ name, value, id, label, required, onChange, hidden }) => {
    return (
        <div hidden={hidden }>
            {label ? <label class="block text-sm font-medium mb-1" htmlFor={id}>{label}</label> : null}
            <input onChange={onChange} required={required} type="color" name={name} value={value} id={id} class="w-full mt-1 bg-[var(--primary)] border border-[var(--secondary)] rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm px-2" />
        </div>
    )
}
const CheckBox: FunctionalComponent<InputComponent> = ({ name, value, id, label, checked, required, onChange, hidden }) => {
    return (
        <div hidden={hidden }>
            {label ? <label class="block text-sm font-medium mb-1" htmlFor={id}>{label}</label> : null}
            <input required={required} type="checkbox" name={name} value={value} id={id} class="" checked={checked} onChange={onChange} />
        </div>
    )
}
const InputText: FunctionalComponent<InputComponent> = ({ name, value, id, label, required, onChange,hidden }) => {
    return (
        <div hidden={hidden }>
            {label ? <label class="block text-sm font-medium mb-1" htmlFor={id}>{label}</label> : null}
            <input onChange={onChange} required={required} type="text" name={name} value={value} id={id} class="w-full mt-1 bg-[var(--primary)] border border-[var(--secondary)] rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm px-2" />
        </div>
    )
}
const InputFile: FunctionalComponent<InputFileProps> = ({ name, value, id, label, required, pathHidden, onChange,hidden }) => {
    const [file, setFile] = useState<File | null>(null)
    return (
        <div hidden={hidden }>
            {label ? <p class="text-sm font-medium mb-1 ">{label}</p> : null}

            <label htmlFor={id} class="cursor-pointer w-fit h-fit p-2 bg-[var(--primary)] rounded-md">
                <i class="bi bi-folder" ></i>
            </label>
            <input onChange={(e) => {
                const file = (document.getElementById(id) as HTMLInputElement).files?.item(0)
                if (file) { setFile(file) }
                if (onChange) onChange(e)
            }} class="opacity-0" type="file" name={name} value={value} id={id} required={required} hidden />
            <p>
                {pathHidden ? '' : file?.path}
            </p>

        </div>
    )
}
const InputNumber: FunctionalComponent<InputComponent> = ({ name, value, id, label, required, onChange,hidden }) => {
    return (
        <div hidden={hidden }>
            {label ? <label class="block text-sm font-medium mb-1" htmlFor={id}>{label}</label> : null}
            <input onChange={onChange} type="number" name={name} value={value} id={id} class="w-full mt-1 bg-[var(--primary)] border border-[var(--secondary)] rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm px-2" required={required} />
        </div>
    )
}
const InputRadio: FunctionalComponent<InputComponent> = ({ checked, name, value, id, label, required, onClick, onChange,hidden }) => {
    return (
        <div hidden={hidden }>
            {label ? <label class="block text-sm font-medium mb-1" htmlFor={id}>{label}</label> : null}
            <input  onChange={onChange} checked={checked} type="radio" name={name} value={value} id={id} class="cursor-pointer" required={required} onClick={onClick} />
        </div>
    )
}
const Select: FunctionalComponent<InputComponent> = ({ name, value, id, children, label, required, onChange,hidden }) => {
    return (
        <div hidden={hidden }>
            {label ? <label class="block text-sm font-medium mb-1" htmlFor={id}>{label}</label> : null}
            <select onChange={onChange} required={required} name={name} value={value} id={id} class="block w-full mt-1 bg-[var(--primary)] border border-[var(--secondary)] border-solid  rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm ">
                {children}
            </select>
        </div>

    )
}
const Submit: FunctionalComponent<InputComponent> = ({ children }) => {
    return (
        <button type="submit" class="bg-[var(--primary)] hover:bg-[var(--secondary)]  font-bold py-2 px-4 rounded">
            {children}
        </button>
    )

}
export { CheckBox, InputText, InputFile, InputNumber, InputRadio, Select, Submit, ColorPicker }

interface InputComponent {
    value?: string | number;
    name?: string;
    id?: string;
    children?: any;
    label?: string;
    checked?: boolean;
    required?: boolean;
    onChange?: (e: Event) => void;
    onClick?: (e: Event) => void;
    hidden?: boolean;
}
interface InputFileProps extends InputComponent {
    id: string;
    pathHidden?: boolean;
}
