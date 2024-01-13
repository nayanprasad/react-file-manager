import React, {Fragment} from 'react';
import {Button} from "@/components/ui/button";

interface DriveHeaderProps {
    path: string;
}
const DriveHeader = ({path}: DriveHeaderProps) => {
    return (
       <Fragment>
              <div className="flex justify-between items-center w-full h-16 px-4 bg-gray-800">
                    <div className="flex items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500">
                        </div>
                        <h1 className="text-xl font-semibold ml-2">{path}</h1>
                    </div>
                    <div className="flex items-center">
                       <Button className="mr-2">New folder</Button>
                          <Button className="mr-2">Upload</Button>
                    </div>
                </div>
       </Fragment>
    );
};

export default DriveHeader;
