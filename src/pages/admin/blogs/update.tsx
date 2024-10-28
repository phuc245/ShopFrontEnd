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
import { useFormBlog } from "@/hooks/query-blogs/useFormBlog";
import { useGetBlog } from "@/hooks/query-blogs/useGetBlog";
import { useUpdateBlog } from "@/hooks/query-blogs/useUpdateBlog";
import { useUpdateImageBlog } from "@/hooks/query-blogs/useUpdateImageBlog";
import useToastMessage from "@/hooks/useToastMessage";
import { ChangeEvent, useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { z } from "zod";

function UpdateBlogPage() {
  const _id = useParams().id ?? "";
  const mutation = useUpdateBlog();
  const { form, formSchema } = useFormBlog();
  const { data: blog } = useGetBlog(_id);
  const { toastLoading } = useToastMessage();
  const mutationImage = useUpdateImageBlog();
  const [image, setImage] = useState<File>();

  const handleCreateBlog = (data: z.infer<typeof formSchema>) => {
    toastLoading("Vui lòng đợi");
    mutation.mutate({ _id, body: data });
  };

  const handleUpdateImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    toastLoading("Vui lòng đợi!");
    file && mutationImage.mutate({ id: _id, data: file });
    setImage(file);
  };

  useEffect(() => {
    if (blog) {
      form.setValue("title", blog.title ?? "");
      form.setValue("content", blog.content ?? "");
      form.setValue("created_by", blog.created_by ?? "");
    }
  }, [blog]);

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
            <h1 className="text-xl self-center">Update Blog</h1>
            <div className="flex flex-col gap-4">
              <Input
                onChange={handleUpdateImage}
                id="hiddenFileInput"
                type="file"
              />
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Main Image"
                  width={100}
                  height={100}
                />
              ) : (
                <img
                  src={blog?.image_url}
                  alt="Main Image"
                  width={100}
                  height={100}
                  className="rounded-lg object-cover"
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

export default UpdateBlogPage;
