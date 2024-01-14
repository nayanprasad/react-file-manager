"use client";
import axios from "axios";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {FileUpload} from "@/components/file-upload";
import {useRouter} from "next/navigation";
import {useModal} from "@/hooks/use-modal-store";
import {useState} from "react";

const formSchema = z.object({
    fileUrl: z.string().min(1, {
        message: "Attachment is required."
    })
});


type  FileData = {
    name: string;
    url: string;
    size: number;
    type: string;
    folder: string | undefined;
}

const UploadFileModal = () => {
    const {isOpen, onClose, type, data} = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === "uploadFile";

    const [fileData, setFileData] = useState<FileData | null>(null);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fileUrl: "",
        }
    });

    const handleClose = () => {
        form.reset();
        onClose();
    }

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            form.clearErrors();
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/file/upload`, fileData,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    }
                });
            // console.log(data)
            form.reset();
            router.refresh();
            onClose();
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Upload File
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField
                                    control={form.control}
                                    name="fileUrl"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    endpoint="uploadFile"
                                                    value={field.value}
                                                    onChange={(file) => {
                                                        setFileData({
                                                            name: file.name,
                                                            url: file.url,
                                                            size: file.size,
                                                            type: file.url.split(".").pop(),
                                                            folder: data.folderId
                                                        })
                                                        field.onChange(file.url);
                                                    }}

                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button className="w-full" disabled={isLoading}>
                                Upload
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default UploadFileModal;
