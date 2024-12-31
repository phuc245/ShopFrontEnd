// // src/hooks/query-reviews/useGetReviews.ts

// import { useQuery } from "@tanstack/react-query";

// export const useGetReviews = (productId: string) => {
//   return useQuery(
//     ["reviews", productId], // Khóa cache của query, sử dụng `productId` để cache riêng cho từng sản phẩm
//     () => getReviews.getByProductId(productId).then((res) => res.data),
//     {
//       enabled: !!productId, // Chỉ thực hiện query khi có `productId`
//     }
//   );
// };
