

import { InputRadio, InputFile } from "../../../components/inputs"
import { FunctionalComponent } from "preact"

const FilesSettings: FunctionalComponent<{
    settings: FileSettings | undefined;
}> = ({ settings }) => {
    return (
        <div id="file">
            <h2 class="text-2xl font-bold mb-4"  >
                Files
            </h2>
            {
                settings && Object.keys(settings).map((file, index) => {
                    const setting = settings[file].executable
                    return (
                        <div key={index} class="my-3" id={file}>
                            <h1>
                                {file.capitalize()}
                            </h1>
                            <div class="flex gap-2 " onChange={(e) => {
                                const target = (e.target as HTMLInputElement).value
                                const fileInput = (document.getElementById(`${file}Path`) as HTMLInputElement)
                                const parent = fileInput.parentElement
                                if (parent) {
                                    if (target === 'custom') {
                                        parent.removeAttribute('hidden')
                                    } else {
                                        parent.setAttribute('hidden', 'true')
                                    }
                                }
                            }}>
                                <InputRadio name={file} id={`${file}Radio`} checked={setting === 'default'} value="default" label="Default" />
                                <InputRadio name={file} id={`${file}Radio`} checked={setting === 'system'} value="system" label="System" />
                                <InputRadio name={file} id={`${file}Radio`} checked={setting !== 'default' && setting !== 'system'} value="custom" label="Custom" />
                            </div>

                            <InputFile hidden name={`${file}Path`} id={`${file}Path`} label="Executable" value={setting} />

                        </div>
                    )
                })
            }
            <div class="w-fit h-fit p-2 cursor-pointer bg-gray-800" onClick={() => {
                window.JStudio.openJson(settings)
            }}>
                Open Json
            </div>
        </div>
    )
}

export default FilesSettings