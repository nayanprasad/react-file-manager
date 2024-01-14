import { createUploadthing, type FileRouter } from "uploadthing/next";
import {useProfile} from "@/hooks/use-profile-store";

const f = createUploadthing();

const handleAuth =  () => {
    // const { user, getUser }  = useProfile();
    // console.log(user)
    // if (!user)
    //     throw new Error("Unauthorized");
    // return {userId: user._id};
    return true;
}



export const ourFileRouter = {
    uploadFile: f(["image", "pdf"])
        // .middleware(() => handleAuth())
        .onUploadComplete(() => {}),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
