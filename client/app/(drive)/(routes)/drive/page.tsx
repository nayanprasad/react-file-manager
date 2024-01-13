"use client"
import React, {useEffect} from 'react';
import {useProfile} from "@/hooks/use-profile-store";
import {useRouter} from "next/navigation";

const Page = () => {

    const {isAuthenticated, user} = useProfile();
    const router = useRouter();

    useEffect(() => {
        if(!isAuthenticated) {
            router.push("/login");
        }
        // console.log(user)
    }, [user]);



    return (
        <div className="flex justify-center items-center h-screen">
            dirve

        </div>
    );
};

export default Page;
