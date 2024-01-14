"use client"
import React, {useEffect, useState} from 'react';
import UploadFile from "@/components/modals/upload-file-modal";
import CreateFolderModal from "@/components/modals/create-folder-modal";


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
        </>
    );
};
