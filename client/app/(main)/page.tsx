"use client"
import {useEffect} from 'react';
import {useRouter} from "next/navigation";


const Page =  () => {

    const router = useRouter();

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/folder`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => res.json())
            .then((data) => {
                router.push(`/drive/${data.folder._id}`)

            }).catch(err => console.log(err))
    }, []);

    return null;

};

export default Page;
