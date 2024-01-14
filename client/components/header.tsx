"use client"
import React, {Fragment} from 'react';
import {Button} from "@/components/ui/button";
import {useProfile} from "@/hooks/use-profile-store";
import {useRouter} from "next/navigation";
import Avatar from "@/components/avatar";


interface DriveHeaderProps {
    path: [];
    folderId?: string;
    onDataModified?: () => void;
}

const DriveHeader = () => {

    const {user} = useProfile()
    const router = useRouter()

    return (
        <Fragment>
            <div className="flex justify-between items-center w-full h-16 px-4 ">
                <div className="flex items-center">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500">
                    </div>
                    <h1 className="text-xl font-semibold ml-2">{"React File Manager"}</h1>
                </div>
                <div>
                    <Avatar />
                </div>
            </div>
        </Fragment>
    );
};

export default DriveHeader;
