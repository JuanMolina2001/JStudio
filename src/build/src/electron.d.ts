interface Window {
    JStudio: {
      test : () => void;
      setSettings: (settings: Settings) => void;
      fetchFiles: (path: FileProject.path | null, callback: (files: any) => void) => void;
      openFile: (filePath: string) => void;
      getAssets: (projectPath: string, callback: (renderAssets: RenderAssets) => void) => void;
      init: (options: InitOptions, callback: (project: Project) => void) => void;
      openJson: (json: any) => void;
      ide: {
        test: () => void;
        onOpenFile: (callback: (file: FileProject) => void) => void;
        saveFile: (filePath: FileProject | undefined) => void;
        setSettings: (settings: IdeSettings) => void;
      }
      terminal: {
        run : (data: DataCommand) => void
        ;
        onLog: (callback: (log: log) => void) => void;
      }
    };
  }
  