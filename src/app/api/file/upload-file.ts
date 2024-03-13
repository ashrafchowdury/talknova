import { NextRequest, NextResponse } from "next/server";
import { uploadFileOnCloud } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
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
        return NextResponse.json({ error: error.message }, { status: 400 });
      });
  } catch (error) {
    return NextResponse.json(
      { error: "Encounter error while triyng to upload the file." },
      { status: 400 }
    );
  }
}
