import { NextRequest, NextResponse } from "next/server";
import { uploadFileOnCloud } from "@/lib/cloudinary";
import mime from "mime";
import { join } from "path";
import { writeFile, unlink } from "fs/promises";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ error: "File not found!" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const relativeUploadDir = `/temp`;
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const filename = `${file.name.replace(
    /\.[^/.]+$/,
    ""
  )}-${uniqueSuffix}.${mime.getExtension(file.type)}`;

  try {
    await writeFile(`${uploadDir}/${filename}`, buffer); // store the file on temporary folder

    const upload = await uploadFileOnCloud(`${uploadDir}/${filename}`);

    await unlink(`${uploadDir}/${filename}`); // delete the file from temporary folder

    return NextResponse.json(upload, { status: 201 });
  } catch (e) {
    await unlink(`${uploadDir}/${filename}`);

    console.error("Error while trying to upload a file\n", e);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

// const result = (files as any).map((file: string) => {
//   return new Promise(async (resolve, reject) => {
//     const data = await uploadFileOnCloud(file);
//     !data ? reject("Faile to upload files") : resolve(data);
//   });
// });

// Promise.all(result)
//   .then((data) => {
//     return NextResponse.json({ data }, { status: 201 });
//   })
//   .catch((error) => {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   });
