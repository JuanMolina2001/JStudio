import { FunctionalComponent } from "preact"
import { Select, InputNumber, InputText } from "../../../components/inputs";
const IdeSettings: FunctionalComponent<{
    settings: IdeSettings | undefined;

}> = ({ settings }) => {
    return (
        <div id="ide" >
            <h2 class="text-2xl font-bold mb-4"  >
                IDE
            </h2>
            <div class="mb-4">
                <label htmlFor="autosave" class="block text-sm font-medium  mb-1">
                    Autosave
                </label>
                <input type="checkbox" name="autosave" checked={settings?.autosave} class="h-4 w-4 rounded " />
            </div>
            <div class="mb-4">

                <Select label="Theme" name="ide-theme" id="ide-theme" value={settings?.theme} >
                    <option value="vs">
                        Visual Studio
                    </option>
                    <option value="vs-dark">
                        Visual Studio Dark
                    </option>
                    <option value="hc-black">
                        High Contrast Black
                    </option>
                </Select>
            </div>
            <div class="mb-4">
                <InputNumber label="Font Size" name="font-size" id="font-size" value={settings?.fontSize} />
            </div>
            <div class="mb-4">
                <InputText label="Font Family" name="font-family" id="font-family" value={settings?.fontFamily} />
            </div>

        </div>
    )
}

export default IdeSettings