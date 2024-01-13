"use client"
import React, {useEffect} from 'react';
import {useProfile} from "@/hooks/use-profile-store";
import {useRouter} from "next/navigation";
import DriveHeader from "@/components/drive/drive-header";
import DataTables from "@/components/drive/data-table";

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
        <div className="flex flex-col  h-screen text-white bg-gray-700">
            <DriveHeader
                path="My Drive"
            />
            <DataTables />

        </div>
    );
};

export default Page;
