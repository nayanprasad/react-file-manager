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
    name: z.string().min(1, {message: "Folder name is required."}),
});

const CreateChannelModal = () => {

    const router = useRouter();
    const params = useParams();
    const {onClose, type, isOpen, data} = useModal();

    const isModalOpen = isOpen && type === "createFolder";

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            form.clearErrors();
            const values = form.getValues();

            form.control.setError("name", {message: "Channel name is required."});
            if (!values.name)
                return;


            const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/folder/new`
            await axios.post(url, {
                    name: values.name,
                    parent: data?.folderId,
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                }
            );

            form.reset();
            onClose();
            router.push(`/drive/${data?.folderId}`)
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
                            Create a Folder
                        </DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <FormField
                                control={form.control}
                                name={"name"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Folder name
                                        </FormLabel>
                                        <FormControl>
                                            <Input className="dark:bg-[#101012]"
                                                   placeholder={"Enter a folder name"}
                                                   {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button type={"submit"}>Create</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
};

export default CreateChannelModal;
