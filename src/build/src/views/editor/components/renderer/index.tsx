import { useEffect, useRef } from "preact/hooks";

const Renderer = () => {
  const currentProject: Project | null = JSON.parse(localStorage.getItem('currentProject') as string);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    if (!currentProject) {
      console.error('No current project found');
      return;
    }

    const handleAssets = (assets: RenderAssets) => {
      const iframe = iframeRef.current;
     if(iframe){
      iframe.width = '100%';
      iframe.height = '100%';
      const doc = iframe.contentDocument;
      if (doc) {
        doc.open();
        doc.write(assets.html || '');
        const styleElement = doc.createElement('style');
        styleElement.textContent = assets.style || '';
        doc.head.appendChild(styleElement);
        const scriptElement = doc.createElement('script');
        scriptElement.textContent = assets.script || '';
        doc.body.appendChild(scriptElement);
      }
     }



    };

    window.JStudio.getAssets(currentProject.path, handleAssets);
  }, [currentProject]);

  return (
    <div class="relative w-full h-full">
      <iframe ref={iframeRef} frameborder="0"></iframe>
    </div>
  );
};

export default Renderer;
