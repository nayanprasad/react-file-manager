import { createUploadthing, type FileRouter } from "uploadthing/next";
// import {useProfile} from "@/hooks/use-profile-store";
import {getCurrentProfile} from "@/lib/get-user";
const f = createUploadthing();

const handleAuth = async () => {
    // const user = await getCurrentProfile() | undefined;
    // if (!user)
    //     throw new Error("Unauthorized");
    // return {userId: user._id};
    return true;
}



export const ourFileRouter = {
    uploadImage:f({image: {maxFileCount: 1}})
        // .middleware(() => handleAuth())
        .onUploadComplete(() => {}),
    uploadPdf: f({pdf: {maxFileCount: 1}})
        // .middleware(() => handleAuth())
        .onUploadComplete(() => {}),
    uploadFile: f(["image", "pdf"])
        // .middleware(() => handleAuth())
        .onUploadComplete(() => {}),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
