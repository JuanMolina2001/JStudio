import { Editor } from "@monaco-editor/react";
import mime from "mime";
import { FunctionalComponent } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import { AppContext } from "./../../../context";

const IdeComponent: FunctionalComponent<{
  file: FileProject | undefined;
}
> = ({ file }) => {
  const settings = useContext(AppContext);
  const [language, setLanguage] = useState<string>("javascript");
  const [value, setValue] = useState<string>("// code here");
  const ide = settings?.ide;
  const saveFile = () => {
    if (file) {
      file.content = value
      window.JStudio.ide.saveFile(file)
    }
  }
  useEffect(() => {
    if (file) {
      const mimeType = mime.getType(file.path) || 'javascript';
      setLanguage(mimeType);
      setValue(file.content || "// code here");
    }

  }, [file]);
  useEffect(() => {
    const handleKeyDown = (e:KeyboardEvent) => {
      if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        if (!file) return
        saveFile()
      }
    };
    window.addEventListener('keydown', handleKeyDown); 
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    } 
  }, [file, value]);
  if (!ide) return <div>Loading...</div>
  return (
    <div class="h-full w-full overflow-hidden flex flex-col" tabIndex={0} >
        <div class="flex   items-center flex-1 px-2">
        <button class="text-lg" onClick={() => {
          if (!file) return
          saveFile()
        }}>
          <i class="bi bi-floppy">
          </i>
        </button>
      </div>
      <Editor

        onChange={(value) => {
          if (value) setValue(value)
        }}
        height="95%"
        language={language}
        value={value}
        theme={ide.theme}
        options={{
          fontSize: ide.fontSize,
          fontFamily: ide.fontFamily,
          tabSize: ide.tabSize
        }}
        
      />
    
    </div>
  );
};

export default IdeComponent;
