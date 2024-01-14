"use client";
import axios from "axios";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {useModal} from "@/hooks/use-modal-store";
import {Button} from "@/components/ui/button";
import qs from "query-string";

const DeleteFolderModal = () => {
    const {isOpen, onClose, type, data} = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === "deleteFolder";
    const {itemToDelete} = data;

    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        try {
            setIsLoading(true);
            const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/${itemToDelete.type == "File" ? "file" : "folder"}/${itemToDelete?.id}`
            const {data} = await axios(url, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            })
            onClose();
            // router.push(`/drive/${itemToDelete?.parent}`)
            router.refresh();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Delete {itemToDelete?.type}
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to do this? <br/>
                        <span className="text-indigo-500 font-bold">{itemToDelete?.name}</span> will be permanently
                        deleted.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-between">
                    <Button onClick={onClose}>
                        Cancel
                    </Button>
                    <Button disabled={isLoading} onClick={handleClick} variant={"destructive"}>
                        Delete
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteFolderModal;
