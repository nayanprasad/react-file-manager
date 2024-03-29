"use client"
import React, {useEffect, useState} from 'react';
import UploadFile from "@/components/modals/upload-file-modal";
import CreateFolderModal from "@/components/modals/create-folder-modal";
import DeleteFolderModal from "@/components/modals/delete-folder-modal";
import RenameModal from "@/components/modals/rename-modal";
import FilePreviewModal from "@/components/modals/file-preview-modal";
import MoveFileModal from "@/components/modals/file-move-modal";


export const ModalProviders = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <UploadFile />
            <CreateFolderModal />
            <DeleteFolderModal />
            <RenameModal />
            <FilePreviewModal />
            <MoveFileModal />
        </>
    );
};
