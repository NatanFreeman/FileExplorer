import DirectoryEntity from "./DirectoryEntity";
import {DirectoryContent} from "../../types";
import {openFile} from "../../ipc/fileExplorer";

interface Props {
    content: DirectoryContent[];
    onDirectoryClick: (filePath: string) => any;
}

export function DirectoryContents({content, onDirectoryClick}: Props) {
    async function onFileClick(path: string) {
        const err = await openFile(path);
        if (err.length != 0) {
            alert("Failed to open file.");
            console.error(err);
        }
    }

    return <>
        {content.length === 0 ? "There are no files in this directory." : ""}

        {content.map((content, idx) => {
            const [fileType, [fileName, filePath]] = Object.entries(content)[0];

            return (
                <DirectoryEntity
                    type={fileType === "Directory" ? "directory" : "file"}
                    onClick={() =>
                        fileType === "Directory"
                            ? onDirectoryClick(filePath)
                            : onFileClick(filePath)
                    }
                    key={idx}
                    name={fileName}
                />
            );
        })}

    </>;
}