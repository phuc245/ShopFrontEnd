// src/components/Login.js

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForgotPassword } from "@/hooks/query-customer/useForgotPassword";
import { useState } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const mutation = useForgotPassword();

  function handleForgotPassword() {
    mutation.mutate(email);
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex gap-2 flex-col w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center">Quên mật khẩu</h2>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Nhập email"
        />
        <Button
          onClick={handleForgotPassword}
          className="w-full mt-6 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
        >
          Gửi
        </Button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
