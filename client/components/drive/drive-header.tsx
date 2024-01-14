import React, {Fragment} from 'react';
import {Button} from "@/components/ui/button";
import {useModal} from "@/hooks/use-modal-store";
import {useRouter} from "next/navigation";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FileUploadIcon from '@mui/icons-material/FileUpload';

interface DriveHeaderProps {
    path: [];
    folderId?: string;
    onDataModified?: () => void;
}

const DriveHeader = ({path, folderId}: DriveHeaderProps) => {

    const {onOpen} = useModal()
    const router = useRouter()

    return (
        <Fragment>
            <div className="flex justify-between items-center w-full h-16 px-4 ">
                <div className="flex items-center">
                    <h1 className="text-md font-semibold ml-2">
                        {path?.map((folder: any, index: number) => (
                            <span key={folder.id}>
                                    {folder.name === "root" ?
                                        <span onClick={() => router.push(`/drive/${folder._id}`)}
                                              className="hover:bg-gray-100 hover:cursor-pointer rounded-3xl p-3">
                                            {"My drive"}
                                        </span>
                                        :
                                        <span onClick={() => router.push(`/drive/${folder._id}`)}
                                              className="hover:bg-gray-100 hover:cursor-pointer rounded-3xl p-3">
                                            {folder.name}
                                        </span>
                                    }
                                {index !== path.length - 1 && <span className="mx-1 text-gray-400"> &gt; </span>}
                                </span>
                        ))}
                    </h1>
                </div>
                <div className="flex items-center">
                    <Button className="mr-2 flex gap-2" onClick={() => onOpen("createFolder", {folderId})}>
                        <CreateNewFolderIcon/>
                        <span>New Folder</span>
                    </Button>
                    <Button className="mr-2 flex gap-2" onClick={() => onOpen("uploadFile", {folderId})}>
                        <FileUploadIcon/>
                        <span>Upload File</span>
                    </Button>
                </div>
            </div>
        </Fragment>
    );
};

export default DriveHeader;
