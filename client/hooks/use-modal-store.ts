import {create} from "zustand";

export type ModalType =
    "uploadFile" |
    "createFolder" |
    "deleteFileFolder" |
    "renameFileFolder" |
    "filePreview" |
    "moveFile"

interface ModalData {
    fileName?: string;
    folderName?: string;
    folderId?: string;
    itemToDelete?: any
    itemToRename?: any
    fileToPreview?: any
    fileToMove?: any
    folderHierarchy?: any
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({isOpen: true, type, data}),
    onClose: () => set({isOpen: false, type: null})
}));
