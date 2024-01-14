import { createUploadthing, type FileRouter } from "uploadthing/next";
const f = createUploadthing();


export const ourFileRouter = {
    uploadImage:f({image: {maxFileCount: 1}})
        .onUploadComplete(() => {}),
    uploadPdf: f({pdf: {maxFileCount: 1}})
        .onUploadComplete(() => {}),
    uploadFile: f(["image", "pdf"])
        .onUploadComplete(() => {}),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
