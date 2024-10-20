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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCheckout } from "@/hooks/query-cart/useCheckout";
import { useFormCheckout } from "@/hooks/query-cart/useFormCheckout";
import { useGetCart } from "@/hooks/query-cart/useGetCart";
import { useGetMeCustomer } from "@/hooks/query-customer/useGetMeCustomer";
import useToastMessage from "@/hooks/useToastMessage";
import { calSale, formatPrice, totalItems } from "@/utils/commons";
import React, { useEffect } from "react";
import { z } from "zod";

function CheckoutPage() {
  const { form, formSchema } = useFormCheckout();
  const { data: cart } = useGetCart();
  const { data: customer } = useGetMeCustomer();
  const mutation = useCheckout();
  const { toastLoading } = useToastMessage();

  useEffect(() => {
    form.setValue("address", customer?.address ?? "");
    form.setValue("email", customer?.email ?? "");
    form.setValue("phone_number", customer?.phone_number ?? "");
  }, [customer]);

  function handleCheckout(data: z.infer<typeof formSchema>) {
    toastLoading("Vui lòng đợi");
    mutation.mutate(data);
  }

  return (
    <div className="p-8">
      <Form {...form}>
        <form
          className="flex gap-4"
          onSubmit={form.handleSubmit(handleCheckout)}
        >
          <div className="w-1/2">
            <h1 className="text-2xl my-4">Nhập thông tin của bạn</h1>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Địa chi</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Địa chỉ" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Địa chỉ" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <h1 className="text-2xl my-4">Giỏ hàng</h1>
            <ScrollArea className="h-[300px]">
              {cart?.map((item) => (
                <li
                  key={item._id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center">
                    <img
                      src={item.product_id.image_url}
                      alt={item.product_id.image_url}
                      className="w-20 h-20 rounded-lg mr-4"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">
                        {item.product_id.name}
                      </h2>
                      <p className="text-gray-600">
                        Giá:{" "}
                        {calSale(
                          item.product_id.price,
                          item.product_id.sale
                        ).toLocaleString()}{" "}
                        VNĐ
                      </p>
                      <div className="flex gap-2 items-center">
                        <p className="text-gray-600">Số lượng: </p>

                        <span className="mx-2">{item.quantity}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ScrollArea>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">Tiền Ship:</h2>
                <p className="text-gray-600 text-xl">{formatPrice(30000)}</p>
              </div>
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">Tống tiền:</h2>
                <p className="text-gray-600 text-xl">
                  {formatPrice(totalItems(cart ?? []) + 30000)}
                </p>
              </div>
            </div>
            <Button className="self-end mt-8">Thanh toán</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default CheckoutPage;
