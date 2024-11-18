import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useFeedBack } from "@/hooks/query-feedback/useFeedback";
import useToastMessage from "@/hooks/useToastMessage";
import { useState } from "react";

function ContactPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const mutation = useFeedBack();
  const { toastLoading } = useToastMessage();

  function handleFeedBack() {
    toastLoading("Vui lòng đợi");
    mutation.mutate({ name, email, phone_number: phoneNumber, message });
  }

  return (
    <div className="container w-full p-8">
      <div className="mx-12 flex gap-8">
        {/* Phần bản đồ */}
        <div className="w-1/2">
          <iframe
            className="w-full h-96" // Chiều cao của bản đồ
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.226254431065!2d106.65729731450321!3d10.762622292332964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752c5582f20e8d%3A0x2a5e36cb1f519bcb!2zVmlldCBOYW0sIEhvbG8gMTY0LCBWaWV0bmFt!5e0!3m2!1svi!2s!4v1693572862150!5m2!1svi!2s"
            title="Bản đồ Thành phố Hồ Chí Minh"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        {/* Phần thông tin liên hệ */}
        <div className="flex w-1/2 flex-col gap-4">
          <h1>Liên hệ</h1>
          <Separator />
          <h1>Gửi thắc mắc cho chúng tôi</h1>
          <Separator />
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tên của bạn"
          />
          <div className="flex justify-between">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <Input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Số điện thoại của bạn"
            />
          </div>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Nội dung"
          />
          <Button type="button" onClick={handleFeedBack}>
            Gửi
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
