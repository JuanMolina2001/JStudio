interface Window {
    JStudio: {
      test : () => void;
      fetchFiles: (path: FileProject.path | null,) => Promise<any>;
      openFile: (filePath: string) => void;
      init: (options: InitOptions) => Promise<Project>;
      openJson: (json: any) => void;
      ide: {
        test: () => void;
        onOpenFile: () => Promise<FileProject>;
        saveFile: (filePath: FileProject | undefined) => void;
        setSettings: (settings: IdeSettings) => void;
      }
      terminal: {
        run : (data: DataCommand) => void
        ;
        onLog: ()=>Promise<Log>;
      },
      settings: {
        set: (settings: Settings) => void;
        get: () => Promise<Settings>;
      }
    };
  }
  