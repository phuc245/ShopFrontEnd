import {
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
import { TabsContent } from "@/components/ui/tabs";
import React from "react";

interface TabInfoProps {
  value: string;
  form: any;
  categories: any;
}

function TabInfo(props: TabInfoProps) {
  return (
    <TabsContent value={props.value} className="flex flex-col gap-2">
      <FormField
        control={props.form.control}
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
      <FormField
        control={props.form.control}
        name="author"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tên Tác Giả</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex gap-2">
        <FormField
          control={props.form.control}
          name="cost"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel>Giá gốc(giá mua)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(event) => field.onChange(+event.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={props.form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel>Giá tiền</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(event) => field.onChange(+event.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex gap-2 ">
        <FormField
          control={props.form.control}
          name="sale"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel>Giảm giá %</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(event) => field.onChange(+event.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={props.form.control}
          name="stock"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel>Số lượng trong kho</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(event) => field.onChange(+event.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={props.form.control}
        name="category_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Danh Mục</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {props?.categories?.map((item: any) => (
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
    </TabsContent>
  );
}

export default TabInfo;
