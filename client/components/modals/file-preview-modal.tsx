"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {useModal} from "@/hooks/use-modal-store";
import Image from "next/image";


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
                {fileToPreview?.type === "pdf"
                    ? (
                        <div className="flex items-center justify-center">
                            <iframe
                                src={fileToPreview?.url}
                                width="100%"
                                height="500px"
                                frameBorder="0"
                            />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center">
                            <Image
                                src={fileToPreview?.url}
                                width={500}
                                height={500}
                                alt="file"
                            />
                        </div>
                    )}
            </DialogContent>
        </Dialog>
    )
}

export default UploadFileModal;
