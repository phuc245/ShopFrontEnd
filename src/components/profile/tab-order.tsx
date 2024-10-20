import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TabsContent } from "@/components/ui/tabs";
import { useGetOrderMe } from "@/hooks/query-orders/useGetOrderMe";
import { useOrderStore } from "@/store/useOrderStore";
import { formatPrice } from "@/utils/commons";
import ModalOrderDetail from "./modal-order-detail";

interface TabOrderProps {
  value: string;
}

function TabOrder(props: TabOrderProps) {
  const { data: orders } = useGetOrderMe();
  const { setModalDetail } = useOrderStore();

  let total = 0;
  orders?.forEach((item) => {
    total += item.total;
  });

  function handleModalDetail(id: string) {
    setModalDetail(true, { _id: id });
  }

  return (
    <>
      <TabsContent
        value={props.value}
        className="flex flex-col items-center gap-2 w-full"
      >
        <Table>
          <TableCaption>Danh sách sản phẩm bạn đã mua.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Mã hoá đơn</TableHead>
              <TableHead>Địa chỉ</TableHead>
              <TableHead>Số điện thoại</TableHead>
              <TableHead>Ngày thanh toán</TableHead>
              <TableHead className="text-right">Tổng tiền</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((item) => (
              <TableRow key={item._id}>
                <TableCell
                  onClick={() => handleModalDetail(item._id)}
                  className="font-medium hover:text-orange-400 cursor-pointer"
                >
                  {item._id}
                </TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.phone_number}</TableCell>
                <TableCell>
                  {new Date(item.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  {formatPrice(item.total)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Tổng tiền đã mua</TableCell>
              <TableCell className="text-right">{formatPrice(total)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TabsContent>
      <ModalOrderDetail />
    </>
  );
}

export default TabOrder;
