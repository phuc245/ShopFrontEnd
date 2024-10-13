import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TabsContent } from "@/components/ui/tabs";
import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

interface TabImageProps {
  value: string;
  image: File | undefined;
  setImage: Dispatch<SetStateAction<File | undefined>>;
  extraImage: File[] | undefined;
  setExtraImage: Dispatch<SetStateAction<File[]>>;
}

function TabImages(props: TabImageProps) {
  function hanldeImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    props.setImage(file);
  }

  function handleExtraImage(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    files && props.setExtraImage(Array.from(files));
  }

  return (
    <TabsContent value={props.value} className="flex  gap-2 ">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <div className="w-[20%]">
            <Label htmlFor="picture">Ảnh đại diện</Label>
            <Input required onChange={hanldeImage} id="picture" type="file" />
          </div>
          {props.image && (
            <img
              src={URL.createObjectURL(props.image)}
              width={120}
              height={120}
              alt="Picture of the author"
              className="rounded-xl object-cover"
            />
          )}
        </div>
        <Separator className="mx-auto my-4 w-[90%]" />
        <div className="flex items-center gap-4">
          <div className="w-[20%]">
            <Label htmlFor="picture">Ảnh Phụ</Label>
            <Input
              onChange={handleExtraImage}
              id="picture"
              multiple
              type="file"
            />
          </div>
          <ScrollArea className="h-[300px] w-1/2 border">
            <div className="flex flex-wrap gap-4 p-2">
              {props.extraImage?.map((image) => (
                <img
                  key={image.name}
                  src={URL.createObjectURL(image)}
                  width={120}
                  height={120}
                  alt="Picture of the author"
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
