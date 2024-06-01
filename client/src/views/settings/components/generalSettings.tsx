import { FunctionalComponent } from "preact";
import { Select } from "../../../components/inputs";

const GeneralSettings: FunctionalComponent<{
  settings: GeneralSettings
}> = ({settings}) => {
  return (
    <div id="general">
      <h2 class="text-2xl font-bold mb-4" >
        General
      </h2>
      <Select label="Theme" name="theme" id="general-theme" value={settings?.theme}>
        <option value="light">
          Light
        </option>
        <option value="dark">
          Dark
        </option>
      </Select>
      <Select label="Icon Pack" name="icon-pack-name" id="icon-pack-name" value={settings.icons.name}>
        <option value="BootstrapIcons">
          BootstrapIcons
        </option>
        <option value="TablerIcons">
          TablerIcons
        </option>
        <option value="octicons">
          Octicons
        </option>
      
      </Select>
    </div>
  )
}

export default GeneralSettings