"use client"
import React, {useEffect, useState} from 'react';
import {useProfile} from "@/hooks/use-profile-store";
import {redirect, useRouter} from "next/navigation";
import DriveHeader from "@/components/drive/drive-header";
import DataTables from "@/components/drive/data-table";
import {useModal} from "@/hooks/use-modal-store";
import {getCurrentProfile} from "@/lib/get-user";

interface DriveIdPageProps {
    params: {
        folderId: string
    }
}

const Page =  ({params}: DriveIdPageProps) => {

    const router = useRouter()
    const {type} = useModal()
    const [data, setData] = useState<any>()

    useEffect(() => {
        console.log("here")

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/folder/${params.folderId}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => res.json())
            .then((data) => {
                if(!data.success)
                    router.push("/")
                setData(data)
            }).catch(err => {
            console.log(err)
            router.push("/")
        })

    }, [type]);


    return (
        <div className="flex flex-col  h-screen">
            <DriveHeader folderId={params.folderId}  path={data?.ancestors}/>
            <DataTables data={data} />
        </div>
    );
};

export default Page;
