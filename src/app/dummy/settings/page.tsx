"use client";
import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  Input,
  Label,
  Button,
} from "@/packages/ui";
import { Edit, X, ImagePlus } from "lucide-react";
import useFile from "../components/hooks/useFile";
import { toast } from "sonner";
import { User } from "@/lib/types";
import { useSession } from "next-auth/react";

type USER_PROFILE_TYPE = {
  name: string;
  bio: string;
};
const Profile = () => {
  const [profileUpdate, setProfileUpdate] = useState<USER_PROFILE_TYPE>({
    name: "",
    bio: "",
  });
  const [user, setUser] = useState<User | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const { filePreview, loadFile, file, setFile, setFilePreview } = useFile();

  const { status } = useSession();

  const getData = async () => {
    try {
      const res = await fetch("/api/user/settings");

      if (!res.ok) {
        toast.error("Couldn't load the page");
      }
      const data = await res.json();

      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (event: any, fieldName: string) => {
    setProfileUpdate({ ...profileUpdate, [fieldName]: event.target.value });
  };

  const onSubmit = async () => {
    try {
      let imageURL;
      if (filePreview) {
        imageURL = await update_avatar();
      }

      const update: any = {};

      for (const key in profileUpdate) {
        if (profileUpdate[key as keyof USER_PROFILE_TYPE]) {
          update[key] = profileUpdate[key as keyof USER_PROFILE_TYPE];
        }
      }

      if (!update && !filePreview) {
        toast.error("Please update any filed before update the profile");
        return;
      }

      const res = await fetch("/api/user/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...update, image: imageURL }),
      });

      if (!res.ok) {
        toast.error("Failed to update the profile");
      }

      const data = await res.json();

      setUser(data);
      setIsEdit(false);
      toast("Profile has updated!");
      clearStates();
    } catch (error) {
      toast.error("Failed to update the profile. Please try again later.");
    }
  };

  const update_avatar = async () => {
    try {
      const data = new FormData();
      data.set("file", file as File);

      const upload = await fetch("/api/file/upload", {
        method: "POST",
        body: data,
      });

      if (!upload.ok) {
        toast.error("Failed to update the profile photo");
      }
      const res = await upload.json();

      return res.secure_url;
    } catch (error) {
      toast.error("Failed to update the profile photo. Please try again!");
      return null;
    }
  };

  const clearStates = () => {
    setProfileUpdate({
      name: "",
      bio: "",
    });
    setFile(null);
    setFilePreview(null);
  };

  useEffect(() => {
    getData();
  }, [status]);

  return (
    <main className="flex items-center justify-center w-screen h-screen">
      <Card>
        <CardContent className="w-[550px] p-7 relative">
          <Button
            className="w-7 h-7 absolute top-3 right-3"
            variant="outline"
            size="icon"
            onClick={() => setIsEdit(!isEdit)}
          >
            {isEdit ? (
              <X className="w-4 h-4 opacity-80" />
            ) : (
              <Edit className="w-4 h-4 opacity-80" />
            )}
          </Button>

          <section className="space-y-3 *:space-y-1">
            <div className="w-[100px] h-[100px] rounded-md overflow-hidden border relative !space-y-0">
              {isEdit && (
                <div className="top-0 left-0 right-0 bottom-0 absolute z-20 flex items-center justify-center bg-black/60">
                  <ImagePlus className="w-5 h-5 text-white" />
                  <input
                    type="file"
                    className="opacity-0 absolute top-0 left-0 right-0 bottom-0 z-30 cursor-pointer"
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => loadFile(e.target.files as FileList)}
                  />
                </div>
              )}
              <img
                src={
                  (filePreview as string) ??
                  user?.image ??
                  "https://th.bing.com/th/id/R.c595b3ea095961a31859d01782a4c9c9?rik=lXgbYGS%2fWYAsMA&pid=ImgRaw&r=0"
                }
                alt={user?.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center space-x-3">
              <p className="text-sm opacity-70">
                Friends:{" "}
                <span className="font-medium opacity-90">
                  {user?._count.friends}
                </span>
              </p>
              <p className="text-sm opacity-70">
                Requests: <span className="font-medium opacity-90">0</span>
              </p>
            </div>
            <div>
              <Label className="opacity-80 mb-1.5">Username</Label>
              <Input
                type="text"
                placeholder="username"
                disabled={!isEdit}
                aria-disabled={!isEdit}
                className="disabled:opacity-100"
                value={isEdit ? profileUpdate.name : user?.name}
                onChange={(e) => onChange(e, "name")}
              />
            </div>
            <div>
              <Label className="opacity-80 mb-1.5">Email</Label>
              <Input
                type="email"
                placeholder="Email"
                disabled={true}
                aria-disabled={!isEdit}
                className="disabled:opacity-100"
                defaultValue={user?.email}
              />
            </div>
            <div>
              <Label className="opacity-80 mb-1.5">Bio</Label>
              <textarea
                placeholder="Bio"
                disabled={!isEdit}
                aria-disabled={!isEdit}
                className="disabled:opacity-100 rounded-md w-full h-[100px] bg-transparent border px-3 py-2 text-sm"
                value={isEdit ? profileUpdate.bio : user?.bio}
                onChange={(e) => onChange(e, "bio")}
              ></textarea>
            </div>
            <div>
              <Label className="opacity-80 mb-1.5">Account Created At</Label>
              <p className="py-1.5 px-3 border rounded-md text-sm cursor-not-allowed">
                {user?.createdAt}
              </p>
            </div>
            <div>
              <Label className="opacity-80 mb-1.5">Registred By</Label>
              <p className="py-1.5 px-1.5 border rounded-md text-sm cursor-not-allowed space-x-2 flex items-center">
                {user?.accounts?.length == 0 ? (
                  <span className="py-1 px-2 rounded-sm capitalize bg-secondary border">
                    Email / Password
                  </span>
                ) : (
                  <>
                    {user?.accounts?.map((item) => (
                      <span className="py-1 px-2 rounded-sm capitalize bg-secondary border">
                        {item.provider}
                      </span>
                    ))}
                  </>
                )}
              </p>
            </div>
          </section>

          <CardFooter className="p-0 m-0 mt-10">
            {isEdit ? (
              <Button className="w-full h-8" onClick={onSubmit}>
                Update Profile
              </Button>
            ) : (
              <Button className="w-full h-8" variant="destructive">
                Log Out
              </Button>
            )}
          </CardFooter>
        </CardContent>
      </Card>
    </main>
  );
};

export default Profile;
