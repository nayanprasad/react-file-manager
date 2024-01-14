import React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


type Data = {
    success: boolean;
    files: any;
    folders: any;
}

interface DataTableProps {
    data: Data;
}


const DataTable = ({data}: DataTableProps) => {

    const columns = [
        {field: "name", headerName: "Name", minWidth: 300, flex: 0.8},
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
                        <EditIcon color={"primary"}/>
                        <DeleteIcon className={"redColor"}/>
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
            // disableSelectionOnClick
            className="data-t"
            autoHeight
        />
    );
};

export default DataTable;
