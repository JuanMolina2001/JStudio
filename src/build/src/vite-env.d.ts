/// <reference types="vite/client" />

/// <reference types="xterm" />

// #region Preact
interface String{
  capitalize: () => string;
  replaceAll: (search: string, replace: string) => string;
}

interface File{
  path: string;
}
interface Elements {
  component: ReactNode;
  title: string;

}

interface RendererProps {
  file: string;
}

// #region  Electron
interface Project {
  name: string;
  path: string;

}
interface FileProject extends Project {
  content: string;

}
interface InitOptions {
  name?: string;
  create: boolean;
}
interface log {
  type: string;
  message: string;
}
interface RenderAssets {
  html: string;
  style: string;
  script: string;
}
interface DataCommand {
  command: string;
  args: string[];
  cwd: string;
}
// #region Settings
interface IdeSettings {
  [key: string]: any
  theme: string;
  autosave: boolean;
  fontSize: number;
  fontFamily: string;
  tabSize: number;
}
interface GeneralSettings {
  [key: string]: any
  icons: {
    name: string;
    path: string;
  }
  theme: string;
}
interface FileSettings{
  [key: string]: any
  image: {
    executable: string
  },
  code: {
    executable: string
  },
  audio: {
    executable: string
  }
}
interface  TerminalSettings {
  [key: string]: any
    fontFamily: string;
    fontSize: number;
    fontWeight: string;
    cursorStyle: string;
    cursorWidth: number;
    cursorBlinking: boolean;
    theme:{
        background: string;
        foreground: string;
        black: string;
        red: string;
        green: string;
        yellow: string;
        blue: string;
        magenta: string;
        cyan: string;
        white: string;
        brightBlack: string;
        brightRed: string;
        brightGreen: string;
        brightYellow: string;
        brightBlue: string;
        brightMagenta: string;
        brightCyan: string;
        brightWhite: string;
    }
}
interface Settings  {
  ide: IdeSettings;
  files: FileSettings;
  general: GeneralSettings;
  terminal: TerminalSettings;
}
