import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

interface TabDescriptionProps {
  value: string;
  form: any;
}

function TabDescription(props: TabDescriptionProps) {
  return (
    <TabsContent value={props.value} className="flex flex-col gap-2 ">
      <FormField
        control={props.form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nhập thông tin mô tả</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Nhập thông tin mô tả"
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
    </TabsContent>
  );
}

export default TabDescription;
