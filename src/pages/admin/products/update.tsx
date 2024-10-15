import ImageDeleteIcon from "@/components/image-delete-icon";
import TabDescription from "@/components/manage-products/tab-description";
import TabImages from "@/components/manage-products/tab-images";
import TabInfo from "@/components/manage-products/tab-info";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Textarea } from "@/components/ui/textarea";
import { useGetAllNameCategories } from "@/hooks/query-categories/useGetAllName";

import { useAddExtraImage } from "@/hooks/query-products/useAddExtraimage";
import { useChangeImage } from "@/hooks/query-products/useChangeImage";
import { useUpdateCategory } from "@/hooks/query-categories/useUpdateCategory";
import { useCreateProduct } from "@/hooks/query-products/useCreateProduct";
import { useDeleteExtraImages } from "@/hooks/query-products/useDeleteExtraImages";
import { useFormCreateProduct } from "@/hooks/query-products/useFormCreateProduct";
import { useGetProduct } from "@/hooks/query-products/useGetProduct";
import { useUpdateProduct } from "@/hooks/query-products/useUpdateProduct";
import useToastMessage from "@/hooks/useToastMessage";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import React, { ChangeEvent, useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { z } from "zod";

function UpdateProductPage() {
  const id = useParams().id ?? "";
  const [activeTab, setActiveTab] = useState("info");
  const { form, formSchema } = useFormCreateProduct();
  const { data: categories } = useGetAllNameCategories();
  const [image, setImage] = useState<File>();
  const mutationImage = useChangeImage();
  const { toastLoading } = useToastMessage();
  const [extraImages, setExtraImages] = useState<File[]>([]);
  const mutationAddExtraImage = useAddExtraImage();
  const mutationDeleteExtraImage = useDeleteExtraImages();

  const { data: product } = useGetProduct(id);

  useEffect(() => {
    form.setValue("name", product?.name ?? "");
    form.setValue("status", product?.status ?? true);
    form.setValue("price", product?.price ?? 0);
    form.setValue("cost", product?.cost ?? 0);
    form.setValue("sale", product?.sale ?? 0);
    form.setValue("stock", product?.stock ?? 0);
    form.setValue("category_id", product?.category_id ?? "");
    form.setValue("description", product?.description ?? "");
  }, [product]);

  const mutation = useUpdateProduct();

  const handleCreate = (values: z.infer<typeof formSchema>) => {
    toastLoading("Vui lòng đợi");
    mutation.mutate({ id, data: values });
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    toastLoading("Vui lòng đợi!");
    file && mutationImage.mutate({ id, data: file });
    setImage(file);
  };

  const handleDeleteExtraImages = (productId: string, imageId: string) => {
    toastLoading("Vui lòng đợi");
    mutationDeleteExtraImage.mutate({ id: productId, data: [imageId] });
  };

  const handleAddExtraImages = (e: ChangeEvent<HTMLInputElement>) => {
    toastLoading("Vui lòng đợi");
    const files = e.target.files;
    files && mutationAddExtraImage.mutate({ id, data: Array.from(files) });
    e.target.value = "";
  };

  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-2xl font-bold">Manager Product</h1>{" "}
      <Link to={"/admin/products"}>
        <Button className="flex gap-2">
          <IoMdArrowRoundBack /> Quay lại
        </Button>
      </Link>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreate)}
          className="flex  gap-2 "
        >
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên sản phẩm</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Giá gốc</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Giá tiền</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2 ">
              <FormField
                control={form.control}
                name="sale"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Giảm giá %</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Số lượng trong kho</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className=" flex items-center gap-4">
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
            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Danh Mục</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.map((item: any) => (
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nhập thông tin mô tả</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      rows={20}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    You can <span>@mention</span> other users and organizations.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2 flex flex-col gap-4">
            <div className="flex gap-4">
              <Input
                onChange={handleChangeImage}
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
                  src={product?.image_url}
                  alt="Main Image"
                  width={100}
                  height={100}
                  className="rounded-lg object-cover"
                />
              )}
            </div>
            <div className="flex flex-col gap-4">
              <Input
                onChange={handleAddExtraImages}
                id="hiddenFileInput"
                type="file"
                multiple
              />
              <ScrollArea className="h-[300px] w-full border overflow-y-auto">
                <div className="flex flex-wrap items-center justify-between gap-2 p-2">
                  {product?.images?.map((image) => (
                    <ImageDeleteIcon
                      key={image.image_id}
                      id={id}
                      image={image}
                      onDelete={handleDeleteExtraImages}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          <Button className="self-end">Save</Button>
        </form>
      </Form>
    </div>
  );
}

export default UpdateProductPage;
