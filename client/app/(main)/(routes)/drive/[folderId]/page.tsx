"use client"
import React, {useEffect, useState} from 'react';
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

    const router = useRouter()
    const {type} = useModal()
    const [data, setData] = useState<any>()

    useEffect(() => {

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

    }, [type, params]);


    return (
        <div className="flex flex-col  h-screen">
            <DriveHeader folderId={params.folderId}  path={data?.ancestors}/>
            <DataTables data={data} />
        </div>
    );
};

export default Page;
