import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TabsContent } from "@/components/ui/tabs";
import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { FiUpload } from "react-icons/fi";

interface TabImageProps {
  value: string;
  image: File | undefined;
  setImage: Dispatch<SetStateAction<File | undefined>>;
  extraImage: File[] | undefined;
  setExtraImage: Dispatch<SetStateAction<File[]>>;
}

function TabImages(props: TabImageProps) {
  function handleImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file && !file.type.startsWith("image/")) {
      alert("Vui lòng chọn một file ảnh!");
      return;
    }
    props.setImage(file);
  }

  function handleExtraImage(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) {
      const validFiles = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      );
      if (validFiles.length !== files.length) {
        alert("Một hoặc nhiều file không phải là ảnh. Vui lòng chọn lại!");
      }
      props.setExtraImage(validFiles);
    }
  }

  return (
    <TabsContent value={props.value} className="flex gap-4">
      <div className="flex flex-col gap-4 w-full">
        {/* Ảnh đại diện */}
        <div className="flex flex-col items-start">
          <Label htmlFor="main-image">Ảnh đại diện</Label>
          <Input
            required
            onChange={handleImage}
            id="main-image"
            type="file"
            className="hidden"
          />
          <button
            onClick={() => document.getElementById("main-image")?.click()}
            className="mt-2 flex items-center bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            <FiUpload className="mr-2" />
            Tải lên ảnh đại diện
          </button>
          {props.image && (
            <img
              src={URL.createObjectURL(props.image)}
              width={120}
              height={120}
              alt="Ảnh đại diện"
              className="rounded-xl object-cover mt-2"
            />
          )}
        </div>

        <Separator className="mx-auto my-4 w-[90%]" />

        {/* Ảnh phụ */}
        <div className="flex flex-col items-start">
          <Label htmlFor="extra-images">Ảnh phụ</Label>
          <Input
            onChange={handleExtraImage}
            id="extra-images"
            multiple
            type="file"
            className="hidden"
          />
          <button
            onClick={() => document.getElementById("extra-images")?.click()}
            className="mt-2 flex items-center bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            <FiUpload className="mr-2" />
            Tải lên ảnh phụ
          </button>
          <ScrollArea className="h-[300px] w-full border mt-2">
            <div className="flex flex-wrap gap-4 p-2">
              {props.extraImage?.map((image) => (
                <img
                  key={image.name}
                  src={URL.createObjectURL(image)}
                  width={120}
                  height={120}
                  alt="Ảnh phụ"
                  className="rounded-xl object-cover"
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </TabsContent>
  );
}

export default TabImages;
