import Tiptap from "@/components/tiptap";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateBlog } from "@/hooks/query-blogs/useCreateBlog";
import { useFormBlog } from "@/hooks/query-blogs/useFormBlog";
import useToastMessage from "@/hooks/useToastMessage";
import { ChangeEvent, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { z } from "zod";

function CreateBlogPage() {
  const mutation = useCreateBlog();
  const [image, setImage] = useState<File | null>(null);
  const { form, formSchema } = useFormBlog();
  const { toastLoading } = useToastMessage();

  const handleCreateBlog = (data: z.infer<typeof formSchema>) => {
    toastLoading("Vui lòng đợi");
    mutation.mutate({ ...data, main_image: image });
  };

  function hanldeImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  }
  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-2xl font-bold">Manager Blog</h1>
      <Link to={"/admin/blogs"}>
        <Button className="flex gap-2">
          <IoMdArrowRoundBack /> Quay lại
        </Button>
      </Link>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateBlog)}
          className="flex flex-col gap-2 items-center "
        >
          <div className="flex flex-col gap-2 rounded-lg item-center p-4 w-full">
            <h1 className="text-xl self-center">Create Blog</h1>
            <div className="flex flex-col gap-4">
              <div className="w-[20%]">
                <Label htmlFor="picture">Ảnh đại diện</Label>
                <Input
                  required
                  onChange={hanldeImage}
                  id="picture"
                  type="file"
                />
              </div>
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  width={120}
                  height={120}
                  alt="Picture of the author"
                  className="rounded-xl object-cover"
                />
              )}
            </div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu đề</FormLabel>
                  <FormControl>
                    <Input placeholder="tiêu đề" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="created_by"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên người tạo:</FormLabel>
                  <FormControl>
                    <Input placeholder="người tạo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung</FormLabel>
                  <FormControl>
                    <Tiptap value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="self-end">Tạo</Button>
        </form>
      </Form>
    </div>
  );
}

export default CreateBlogPage;
