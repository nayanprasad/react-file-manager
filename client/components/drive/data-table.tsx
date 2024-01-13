import React from 'react';
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
// import Menu from "@/components/Menu/Menu";


const data = {
    files: [
        {
            name: "file1",
            type: "image",
            size: "1mb",
            cid: "1234567890",
            _id: "1234567890",
            isFavorite: false,
        },
        {
            name: "file2",
            type: "video",
            size: "1mb",
            cid: "1234567890",
            _id: "1234567890",
            isFavorite: false,
        },
        {
            name: "file3",
            type: "document",
            size: "1mb",
            cid: "1234567890",
            _id: "1234567890",
            isFavorite: false,
        },
        {
            name: "file4",
            type: "audio",
            size: "1mb",
            cid: "1234567890",
            _id: "1234567890",
            isFavorite: false,
        },
        {
            name: "file5",
            type: "other",
            size: "1mb",
            cid: "1234567890",
            _id: "1234567890",
            isFavorite: false,
        },
    ]
}

const DataTable = ({
                       // data,
                       // downloadMenu,
                       // shareMenu,
                       // favoriteMenu,
                       // deleteMenu,
                       // removeShareMenu,
                       // handleFileClick
                   }) => {

    const handleFileClick = (file: any) => {
        console.log(file);
    }

    const downloadMenu = () => {
        console.log("download");
    }

    return (
        <TableContainer >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><div className="text-white"> Name</div></TableCell>
                        <TableCell><div className="text-white">Last modified</div></TableCell>
                        <TableCell><div className="text-white">File Size</div></TableCell>
                        <TableCell><div className="text-white">Options</div></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.files?.map((file, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <div onClick={() => handleFileClick(file)}>{file.name.slice(0, 20)}</div>
                            </TableCell>
                            <TableCell>{file.type}</TableCell>
                            <TableCell>{file.size}</TableCell>
                            <TableCell>
                                {/*<Menu*/}
                                {/*    cid={file.cid}*/}
                                {/*    id={file._id}*/}
                                {/*    isFavorite={file.isFavorite}*/}
                                {/*    downloadMenu={downloadMenu}*/}
                                {/*    shareMenu={shareMenu}*/}
                                {/*    favoriteMenu={favoriteMenu}*/}
                                {/*    deleteMenu={deleteMenu}*/}
                                {/*    removeShareMenu={removeShareMenu}*/}
                                {/*/>*/}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
};

export default DataTable;
