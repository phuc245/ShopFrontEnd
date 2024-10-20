// src/components/Login.js

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
import { useCustomerLogin } from "@/hooks/query-customer/useCustomerLogin";

import { useFormLogin } from "@/hooks/useFormLogin";
import useToastMessage from "@/hooks/useToastMessage";
import { LocalUtils } from "@/utils/local-util";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const LoginHomePage = () => {
  const { form, formSchema } = useFormLogin();
  const { toastLoading } = useToastMessage();
  const mutation = useCustomerLogin();
  const token = LocalUtils.getLocalToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  function handleLogin(data: z.infer<typeof formSchema>) {
    toastLoading("Vui lòng đợi");
    mutation.mutate(data);
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center">Đăng Nhập</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="mt-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500">
                    <Input type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="w-full mt-6 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500">
              Đăng Nhập
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center">
          <div className="flex gap-2 justify-between">
            <Link to="/register" className=" text-blue-500 hover:underline">
              Đăng ký
            </Link>
            <Link
              to={"/forgot-password"}
              className="text-blue-500 hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginHomePage;
