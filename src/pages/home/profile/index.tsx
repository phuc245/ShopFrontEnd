import TabInfo from "@/components/profile/tab-info";
import TabOrder from "@/components/profile/tab-order";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function ProfilePage() {
  return (
    <div className="p-4 w-full">
      <Tabs className="flex p-4 gap-20" defaultValue="account">
        <TabsList className="h-auto !bg-transparent flex flex-col justify-start items-start gap-4">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="order">Order History</TabsTrigger>
        </TabsList>
        <div className="flex flex-col items-center w-full">
          <TabInfo value="account" />
          <TabOrder value="order" />
        </div>
      </Tabs>
    </div>
  );
}

export default ProfilePage;
