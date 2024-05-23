import { useEffect, useState } from "preact/hooks"
import { FunctionalComponent } from "preact"

const File: FunctionalComponent<{
    file: string;
  
  }> = ({ file }) => {

    const fileName = file.split('/')[file.split('/').length - 1]
    const extension = fileName.split('.')[fileName.split('.').length - 1]


    return (
        <div class="select-none cursor-pointer flex items-center gap-2 ml-3 text-nowrap overflow-ellipsis overflow-hidden text-lg" onDblClick={() => {
            window.JStudio.openFile(file)
        }}>
            {/* <i class={`bi bi-filetype-${extension}`}></i> */}
            <i class={`bi bi-filetype-${extension}`}></i>
            <p>{fileName}</p>
        </div>
    )

}

const Files: FunctionalComponent<{
    path: string;
  }> = ({ path }) => {
    const [files, setFiles] = useState<string[]>([])
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const data = await new Promise<string[]>((resolve, reject) => {
                    try {
                        window.JStudio.fetchFiles(path, (result) => {
                            resolve(result);
                        });
                    } catch (err) {
                        reject(err);
                    }

                });
                setFiles(data);
            } catch (error) {
                console.error("Error fetching files:", error);
            }
        };

        fetchFiles();
    }, [path]);
    return (
        <>
            {files.map((file, index) => {
                return file.includes('.') ?
                    <File file={`${path}/${file}`} />
                    :
                    <details class="ml-3 text-lg select-none" onToggle={(e) => {
                        const element = e.target as HTMLDetailsElement
                        const icon = element.querySelector('i');
                        if (icon) {
                            if (element.open) {
                                icon.classList.remove('bi-folder2')
                                icon.classList.add('bi-folder2-open')
                            } else {
                                icon.classList.remove('bi-folder2-open')
                                icon.classList.add('bi-folder2')
                            }
                        }
                    }} key={index}>
                        <summary class="list-none flex cursor-pointer gap-1">
                            <i class="bi bi-folder2"></i>
                            {file}
                        </summary>
                        <Files path={`${path}/${file}`} />
                    </details>;
            })}

        </>
    )
}
export default Files