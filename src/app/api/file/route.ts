import { NextRequest, NextResponse } from "next/server";
import { uploadFileOnCloud, deleteFileFromCloud } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  // Get Request Body
  const { files } = (await req.json()) as { files: string[] };

  if (!files) {
    return NextResponse.json({ error: "File not found!" }, { status: 400 });
  }

  const result = files.map((file: string) => {
    return new Promise(async (resolve, reject) => {
      const data = await uploadFileOnCloud(file);
      !data ? reject("Faile to upload files") : resolve(data);
    });
  });

  Promise.all(result)
    .then((data) => {
      return NextResponse.json({ data }, { status: 201 });
    })
    .catch((error) => {
      return NextResponse.json(
        { error: "Encounter error while triyng to upload the file." },
        { status: 400 }
      );
    });
}

export async function DELETE(req: NextRequest) {
  // Get Request Body
  const { fileId } = (await req.json()) as { fileId: string[] };

  if (!fileId) {
    return NextResponse.json({ error: "Invalid creadential" }, { status: 400 });
  }

  const result = fileId.map((id: string) => {
    return new Promise(async (resolve, reject) => {
      const data = await deleteFileFromCloud(id as string);
      !data ? reject("Faile to delete files") : resolve(data);
    });
  });

  Promise.all(result)
    .then((data) => {
      return NextResponse.json({ data }, { status: 200 });
    })
    .catch((error) => {
      return NextResponse.json(
        { error: "Encounter error while triyng to upload the file." },
        { status: 400 }
      );
    });
}
