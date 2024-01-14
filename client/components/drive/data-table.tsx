import React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useModal} from "@/hooks/use-modal-store";
import FolderIcon from '@mui/icons-material/Folder';
import FilePresentIcon from '@mui/icons-material/FilePresent';


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

    const handleFilePreview = (params: any) => {
        if(params.row.type === "Folder")
            return;
        const id = params.row.id;
        const file = data.files.find((file: any) => file._id === id);
        onOpen("filePreview", {fileToPreview: file})
    }

    const columns = [
        {field: "name", headerName: "Name", minWidth: 300, flex: 0.8,
            renderCell: (params: any) => {
                return (
                    <div onClick={() => handleFilePreview(params)} className="hover:cursor-pointer">
                        {params.row.type === "Folder" ? <FolderIcon className={"mr-2"}/> : <FilePresentIcon className={"mr-2"}/>}
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
                        <EditIcon onClick={() => onOpen("renameFileFolder", {itemToRename: params.row}) } color={"primary"} className={"hover:cursor-pointer"}/>
                        <DeleteIcon onClick={() => onOpen("deleteFolder", {itemToDelete: params.row}) }  color={"error"} className={"hover:cursor-pointer"}/>
                    </>
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
            date: file.createdAt,
            size: file.size,
        });
    });

    data?.folders?.forEach((folder:any) => {
        rows.push({
            id: folder._id,
            name: folder.name,
            type: "Folder",
            date: folder.createdAt,
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
