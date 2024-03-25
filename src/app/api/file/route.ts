import { NextRequest, NextResponse } from "next/server";
import { deleteFileFromCloud } from "@/lib/cloudinary";

export async function DELETE(req: NextRequest) {
  try {
    const { fileId } = (await req.json()) as { fileId: string };

    if (!fileId) {
      return NextResponse.json(
        { error: "Invalid creadential" },
        { status: 400 }
      );
    }
    
    const data = await deleteFileFromCloud(fileId);

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Encounter error while triyng to upload the file." },
      { status: 400 }
    );
  }
}

// const result = fileId.map((id: string) => {
//   return new Promise(async (resolve, reject) => {
//     const data = await deleteFileFromCloud(id as string);
//     !data ? reject("Faile to delete files") : resolve(data);
//   });
// });

// Promise.all(result)
//   .then((data) => {
//     return NextResponse.json({ data }, { status: 200 });
//   })
//   .catch((error) => {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   });
