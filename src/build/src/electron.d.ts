interface Window {
    JStudio: {
      test : () => void;
      setSettings: (settings: Settings) => void;
      fetchFiles: (path: FileProject.path | null, callback: (files: any) => void) => void;
      openFile: (filePath: string) => void;
      getAssets: (projectPath: string, callback: (renderAssets: RenderAssets) => void) => void;
      run: (projectPath: string) => void;
      init: (options: InitOptions, callback: (project: Project) => void) => void;
      openJson: (json: any) => void;
      ide: {
        test: () => void;
        onOpenFile: (callback: (file: FileProject) => void) => void;
        saveFile: (filePath: FileProject | undefined) => void;
        setSettings: (settings: IdeSettings) => void;
      }
      terminal: {
        run : (data: DataCommand) => Promise<{
          message: string;
          type: string;
        }>;
        logs: (callback: (log: log) => void) => void;
      }
    };
  }
  