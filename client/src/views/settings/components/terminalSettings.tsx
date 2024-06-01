import { FunctionalComponent } from "preact"
import { CheckBox, InputNumber, InputText, ColorPicker } from "../../../components/inputs"

const TerminalSettings: FunctionalComponent<{
    settings: TerminalSettings
}> = ({ settings }) => {
    return (
        <div class="flex flex-col gap-2" id="terminal">
            <h2>
                Terminal settings
            </h2>
            <p>
                Font
            </p>
            <InputText id="terminal-font" name="terminal-font" label="Font Family" value={settings.fontFamily} />
            <InputNumber id="terminal-font-size" name="terminal-font-size" label="Font Size" value={settings.fontSize} />
            <InputText id="terminal-font-weight" name="terminal-font-weight" label="Font Weight" value={settings.fontWeight} />
            <p>
                Cursor
            </p>
            <InputText id="terminal-cursor-style" name="terminal-cursor-style" label="Cursor Style" value={settings.cursorStyle} />
            <CheckBox id="terminal-cursor-blink" name="terminal-cursor-blink" label="Cursor Blink" checked={settings.cursorBlink} />
            <InputText id="terminal-cursor-width" name="terminal-cursor-width" label="Cursor Width" value={settings.cursorWidth} />

            <details>
                <summary>
                    <p>
                        Colors
                    </p>
                </summary>
                <div>
                    {
                        Object.keys(settings.theme).map((key) => {
                            const value = settings.theme[key as keyof typeof settings.theme]
                            return (
                                <div class="w-[50px]">
                                    <ColorPicker id={`terminal-color-${key}`} name={`terminal-color-${key}`} label={key} value={value} />
                                </div>
                                
                            )
                        })
                    }
                </div>
            </details>

        </div>
    )
}
export default TerminalSettings