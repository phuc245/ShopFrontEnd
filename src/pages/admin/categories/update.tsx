import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormCreateCategory } from "@/hooks/query-categories/useFormCreateCategory";
import { useGetAllNameCategories } from "@/hooks/query-categories/useGetAllName";
import { useGetCategory } from "@/hooks/query-categories/useGetCategory";
import { useUpdateCategory } from "@/hooks/query-categories/useUpdateCategory";
import useToastMessage from "@/hooks/useToastMessage";
import React, { useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { z } from "zod";

function UpdateCategoryPage() {
  const _id = useParams().id ?? "";

  const { form, formSchema } = useFormCreateCategory();
  const { toastLoading } = useToastMessage();

  const { data: categories } = useGetAllNameCategories();
  const { data: category } = useGetCategory(_id);
  const mutation = useUpdateCategory();

  //chạy sau cùng
  useEffect(() => {
    form.setValue("name", category?.name ?? "");
    form.setValue("status", category?.status ?? true);
    form.setValue("parent_id", category?.parent_id ?? "");
  }, [category]);

  function handleUpdate(data: z.infer<typeof formSchema>) {
    toastLoading("Vui lòng đợi");
    mutation.mutate({ _id, body: data });
  }

  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-2xl font-bold">Manager Category</h1>{" "}
      <Link to={"/admin/categories"}>
        <Button className="flex gap-2">
          <IoMdArrowRoundBack /> Quay lại
        </Button>
      </Link>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdate)}
          className="flex flex-col gap-2 items-center"
        >
          <div className="flex flex-col gap-2 rounded-lg border p-4 ">
            <h1 className="text-xl self-center">Create Category</h1>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-72">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="parent_id"
              render={({ field }) => (
                <FormItem className="w-72">
                  <FormLabel>Danh Mục Cha</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục cha" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories
                        ?.filter((item) => item._id !== _id)
                        .map((item) => (
                          <SelectItem key={item._id} value={item._id}>
                            {item.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-72 flex items-center gap-4">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button className="self-end">Lưu</Button>
        </form>
      </Form>
    </div>
  );
}

export default UpdateCategoryPage;
