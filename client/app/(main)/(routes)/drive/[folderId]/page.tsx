"use client"
import React, {useEffect, useState} from 'react';
import {useProfile} from "@/hooks/use-profile-store";
import {useRouter} from "next/navigation";
import DriveHeader from "@/components/drive/drive-header";
import DataTables from "@/components/drive/data-table";
import {useModal} from "@/hooks/use-modal-store";

interface DriveIdPageProps {
    params: {
        folderId: string
    }
}

const Page =  ({params}: DriveIdPageProps) => {

    const {type} = useModal()
    const [data, setData] = useState<any>()
    const [isModified, setIsModified] = useState(false)

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/folder/${params.folderId}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => res.json())
            .then((data) => {
                console.log(data)
                setData(data)
            }).catch(err => console.log(err))

    }, [type]);


    return (
        <div className="flex flex-col  h-screen">
            <DriveHeader folderId={params.folderId}
                path="My Drive"
            />
            <DataTables data={data} />

        </div>
    );
};

export default Page;
