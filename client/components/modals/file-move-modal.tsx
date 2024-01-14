import React, {useState} from 'react';
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {useModal} from "@/hooks/use-modal-store";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import FolderIcon from '@mui/icons-material/Folder';
import {Button} from "@/components/ui/button";
import axios from "axios";
import {useRouter} from "next/navigation";

const FileMoveModal = () => {

    const router = useRouter();
    const {isOpen, onClose, type, data} = useModal();

    const isModalOpen = isOpen && type === "moveFile";

    const {fileToMove, folderHierarchy} = data;

    const [selectedFolder, setSelectedFolder] = useState<any>();


    const handleClose = () => {
        onClose();
    }

    const renderFolder = (folder: any) => (
        <Accordion type="single" collapsible className="w-full space-x-5">
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <div className="flex items-center space-x-2">
                        <FolderIcon className="h-5 w-5 text-gray-400"/>
                        <span className={`${selectedFolder === folder ? " font-bold" : ""}`}
                              onClick={() => setSelectedFolder(folder)}>{folder.name}</span>
                        <span className="text-gray-400">({folder.children.length})</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="ml-4">
                        {folder.children.map(renderFolder)}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

    );

    const handleMove = async () => {
        try {
            const {data} = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/file/move/${fileToMove?.id}`, {
                method: "PUT",
                data: {
                    folder: selectedFolder?._id
                },
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            router.refresh();
        } catch (error) {
            console.log(error);
        } finally {
            handleClose();
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Move <span className="text-indigo-500 font-bold">{fileToMove?.name}</span>
                    </DialogTitle>
                </DialogHeader>


                <div className="flex flex-col space-y-2">
                    {folderHierarchy?.map(renderFolder)}
                </div>

                <DialogFooter>
                    <div className="flex justify-between gap-3 items-center">
                        <span>
                            move to <span className="text-indigo-500 font-bold">{selectedFolder?.name}</span>
                        </span>
                        <Button variant="default" onClick={handleMove}>
                            Move
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
        ;
};

export default FileMoveModal;
