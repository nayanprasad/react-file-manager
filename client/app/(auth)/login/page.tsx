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
import {toast} from "react-hot-toast";

const Page = () => {

    const router = useRouter();

    const {onLogin} = useProfile();

    const formSchema = z.object({
        email: z.string().min(1, {message: "Email is required."}),
        password: z.string().min(8, {message: "Password is required."})
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
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

            const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/login`

            const {data} = await axios.post(url, values);
            if(data.success) {
                // console.log(data)
                toast.success("Login successful")
                localStorage.setItem("token", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                onLogin(data.user)
                router.push("/");
            }
        } catch (e: any) {
            console.log(e)
            toast.error(e.response.data.message)
        }
    }

    return (
        <Fragment>
            <Form {...form}>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
                    <FormField
                        control={form.control}
                        name={"email"}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="">
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
                                <FormLabel className="">
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
                    <Button type={"submit"}>Login</Button>
                    <div className="flex justify-center items-center">
                        <p className="">Don&apos;t have an account? <Link href="/signup" className="text-blue-500">Sign
                            up</Link></p>
                    </div>
                </form>
            </Form>
        </Fragment>
    );
};

export default Page;
