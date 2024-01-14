"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {useModal} from "@/hooks/use-modal-store";
import Image from "next/image";




type  FileData = {
    name: string;
    url: string;
    size: number;
    type: string;
    folder: string | undefined;
}

const UploadFileModal = () => {
    const {isOpen, onClose, type, data} = useModal();

    const isModalOpen = isOpen && type === "filePreview";

    const {fileToPreview} = data;



    const handleClose = () => {
        onClose();
    }


    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {fileToPreview?.name}
                    </DialogTitle>
                </DialogHeader>
                <Image src={fileToPreview?.url} alt={"file preview"} width={500} height={500} />


            </DialogContent>
        </Dialog>
    )
}

export default UploadFileModal;
