import React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useModal} from "@/hooks/use-modal-store";
import FolderIcon from '@mui/icons-material/Folder';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import {useRouter} from "next/navigation";


type Data = {
    success: boolean;
    files: any;
    folders: any;
}

interface DataTableProps {
    data: Data;
}


const DataTable = ({data}: DataTableProps) => {

    const {onOpen} = useModal()
    const router = useRouter();

    const handleFilePreview = (params: any) => {
        if (params.row.type === "Folder")
            return
        const id = params.row.id;
        const file = data.files.find((file: any) => file._id === id);
        onOpen("filePreview", {fileToPreview: file})
    }

    const handleFolderDoubleClick = (params: any) => {
        if (params.row.type === "File")
            return
        router.push(`/drive/${params.row.id}`);
    }

    const columns = [
        {
            field: "name", headerName: "Name", minWidth: 300, flex: 0.8,
            renderCell: (params: any) => {
                return (
                    <div onClick={() => handleFilePreview(params)}
                         onDoubleClick={() => handleFolderDoubleClick(params)}
                         className="hover:cursor-pointer">
                        {params.row.type === "Folder" ? <FolderIcon className={"mr-2"}/> :
                            <FilePresentIcon className={"mr-2"}/>}
                        {params.row.name}
                    </div>
                );
            }

        },
        {field: "type", headerName: "Type", minWidth: 150, flex: 0.5},
        {field: "date", headerName: "Last Modified", minWidth: 100, flex: 0.5,},
        {field: "size", headerName: "size", minWidth: 100, flex: 0.5},
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 100,
            type: "number",
            sortable: false,
            renderCell: (params: any) => {
                return (
                    <>
                        <EditIcon onClick={() => onOpen("renameFileFolder", {itemToRename: params.row})}
                                  color={"primary"} className={"hover:cursor-pointer"}/>
                        <DeleteIcon onClick={() => onOpen("deleteFolder", {itemToDelete: params.row})} color={"error"}
                                    className={"hover:cursor-pointer"}/>
                    </>
                );
            },
        },
    ];

    const rows: any = [];

    const formattedDate = (date: string) => {
        const inputDate = new Date(date);
        const options: any = { year: 'numeric', month: 'short', day: 'numeric' };
        const _formattedDate = inputDate.toLocaleString('en-US', options);
        return _formattedDate;
    }

    const convertBytes = (bytes: number) => {
        const sizes = ["Bytes", "KB", "MB", "GB", "TB"]

        if (bytes === 0) {
            return "0 Byte";
        }

        const i = Math.floor(Math.log(bytes) / Math.log(1024));

        return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
    }

    data?.files?.forEach((file: any) => {
        rows.push({
            id: file._id,
            name: file.name,
            type: "File",
            date: formattedDate(file.createdAt),
            size: convertBytes(file.size),
        });
    });

    data?.folders?.forEach((folder: any) => {
        rows.push({
            id: folder._id,
            name: folder.name,
            type: "Folder",
            date:  formattedDate(folder.createdAt),
            size: "---"
        });
    });


    return (
        <DataGrid
            rows={rows}
            columns={columns}
            // pageSize={10}
            className="overflow-y-hidden"
            // autoHeight
        />
    );
};

export default DataTable;
