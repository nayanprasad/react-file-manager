"use client"
import React, {Fragment, useEffect} from 'react';
import axios from "axios";
import qs from "query-string";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormLabel, FormItem, FormMessage} from "@/components/ui/form";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useParams, useRouter} from "next/navigation";
import {useModal} from "@/hooks/use-modal-store";


const formSchema = z.object({
    name: z.string().min(1, {message: "Name is required."}),
});

const RenameModal = () => {

    const router = useRouter();
    const params = useParams();
    const {onClose, type, isOpen, data} = useModal();

    const {itemToRename} = data;

    const isModalOpen = isOpen && type === "renameFileFolder";

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: itemToRename?.name,
        },
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            form.clearErrors();
            const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/${itemToRename.type == "File" ? "file" : "folder"}/${itemToRename?.id}`
            const {data} = await axios(url, {
                data: {
                    name: form.getValues("name")
                },
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            })
            form.reset()
            onClose();
            // router.push(`/drive/${itemToDelete?.parent}`)
            router.refresh();
        } catch (e) {
            console.log(e);
        }
    }

    const handleClose = () => {
        form.reset();
        onClose();
    }

    return (
        <Fragment>
            <Dialog open={isModalOpen} onOpenChange={handleClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {itemToRename?.type === "folder" ? "Rename folder" : "Rename file"}
                        </DialogTitle>
                        <DialogDescription>
                            {itemToRename?.name}
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <FormField
                                control={form.control}
                                name={"name"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            {itemToRename?.type === "folder" ? "Folder name" : "File name"}
                                        </FormLabel>
                                        <FormControl>
                                            <Input className="dark:bg-[#101012]"
                                                   placeholder={"Enter a name"}
                                                   {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button type={"submit"}>Rename</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
};

export default RenameModal;
