import React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useModal} from "@/hooks/use-modal-store";
import FolderIcon from '@mui/icons-material/Folder';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import {useRouter} from "next/navigation";
import Tooltip from '@mui/material/Tooltip';


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

    const handleFileMove = (params: any) => {
        if (params.row.type === "Folder")
            return
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/folders`,{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")} `,
            }
        })
            .then(response => response.json())
            .then(data => {
                onOpen("moveFile", {fileToMove: params.row, folderHierarchy: data})
            })
            .catch(error => console.error('Error downloading file:', error));
    }

    const handleDownload = (id: string) => {
        const file = data.files.find((file: any) => file._id === id);
        const fileUrl = file.url;
        fetch(fileUrl)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = file.name;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            })
            .catch(error => console.error('Error downloading file:', error));
    }

    const getFormattedDate = (date: string) => {
        const inputDate = new Date(date);

        const optionsDate: any = {year: 'numeric', month: 'short', day: 'numeric'};
        const formattedDate = inputDate.toLocaleString('en-US', optionsDate);

        const optionsTime: any = {hour: 'numeric', minute: '2-digit', hour12: true};
        const formattedTime = inputDate.toLocaleString('en-US', optionsTime);

        const _formattedDateTime = `${formattedDate} ${formattedTime}`;
        return _formattedDateTime;
    }

    const convertBytes = (bytes: number) => {
        const sizes = ["Bytes", "KB", "MB", "GB", "TB"]

        if (bytes === 0) {
            return "0 Byte";
        }

        const i = Math.floor(Math.log(bytes) / Math.log(1024));

        return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
    }


    const columns = [
        {
            field: "name", headerName: "Name", minWidth: 300, flex: 0.8,
            renderCell: (params: any) => {
                return (
                    <div onClick={() => handleFilePreview(params)}
                         onDoubleClick={() => handleFolderDoubleClick(params)}
                         className="hover:cursor-pointer select-none">
                        {params.row.type === "Folder" ? <FolderIcon className={"mr-2"}/> :
                            <FilePresentIcon className={"mr-2"}/>}
                        {params.row.name}
                    </div>
                );
            }

        },
        {field: "type", headerName: "Type", minWidth: 150, flex: 0.5},
        {field: "date", headerName: "Last Modified", minWidth: 100, flex: 0.5,},
        {field: "size", headerName: "size", minWidth: 100, flex: 0.3},
        {
            field: "actions",
            flex: 0.5,
            headerName: "Actions",
            minWidth: 100,
            type: "number",
            sortable: false,
            renderCell: (params: any) => {
                return (
                    <div className="flex gap-3">
                        <Tooltip title={"Download"}>
                            <FileDownloadIcon onClick={() => handleDownload(params.row.id)}
                                              className={`${params.row.type !== "Folder" ? "flex cursor-pointer" : "hidden"}`}/>
                        </Tooltip>
                        <Tooltip title={"Edit"}>
                            <EditIcon onClick={() => onOpen("renameFileFolder", {itemToRename: params.row})}
                                      color={"primary"} className={"cursor-pointer"}/>
                        </Tooltip>
                        <Tooltip title={"Move"}>
                            <DriveFileMoveIcon onClick={() => handleFileMove(params)}
                                               color={"primary"}
                                               className={`${params.row.type !== "Folder" ? "flex cursor-pointer" : "hidden"}`}/>
                        </Tooltip>
                        <Tooltip title={"Delete"}>
                            <DeleteIcon onClick={() => onOpen("deleteFileFolder", {itemToDelete: params.row})}
                                        color={"error"}
                                        className={"cursor-pointer"}/>
                        </Tooltip>
                    </div>
                );
            },
        },
    ];

    const rows: any = [];

    data?.files?.forEach((file: any) => {
        rows.push({
            id: file._id,
            name: file.name,
            type: "File",
            date: getFormattedDate(file.createdAt),
            size: convertBytes(file.size),
        });
    });

    data?.folders?.forEach((folder: any) => {
        rows.push({
            id: folder._id,
            name: folder.name,
            type: "Folder",
            date: getFormattedDate(folder.createdAt),
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
