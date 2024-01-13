"use client"
import React, {Fragment} from 'react';
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormLabel, FormItem, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";
import axios from "axios";
import {useProfile} from "@/hooks/use-profile-store";
import Link from "next/link";
import {Toast, ToastAction} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast"

const Page = () => {

    const router = useRouter();
    const {toast} = useToast();

    const {onLogin} = useProfile();

    const formSchema = z.object({
        name: z.string().min(1, {message: "Name is required."}),
        email: z.string().min(1, {message: "Email is required."}),
        password: z.string().min(8, {message: "Password is required."})
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            form.clearErrors();
            const values = form.getValues();

            if (!values.email)
                form.setError("email", {message: "Email is required."});
            if (!values.password)
                form.control.setError("password", {message: "Password is required."});
            if (!values.email || !values.password)
                return;

            const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/register`
            console.log(url)

            const {data} = await axios.post(url, values);
            if(data.success) {
                console.log(data)
                localStorage.setItem("token", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                onLogin(data.user)
                router.push("/drive");
            }


        } catch (e) {
            console.log(e);
        }

    }

    return (
        <Fragment>
            <Form {...form}>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
                    <FormField
                        control={form.control}
                        name={"name"}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-white">
                                    Name
                                </FormLabel>
                                <FormControl>
                                    <Input className=""
                                           placeholder={"Enter your name"}
                                           {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={"email"}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-white">
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input className=""
                                           placeholder={"Enter your email"}
                                           {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={"password"}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-white">
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <Input className=""
                                           placeholder={"Enter your password"}
                                           type={"password"}
                                           {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type={"submit"} >Login</Button>
                    <div className="flex justify-center items-center">
                        <p className="text-white">Already have an account? <Link href="/login" className="text-blue-500">Login</Link></p>
                    </div>
                </form>
            </Form>


        </Fragment>
    );
};

export default Page;