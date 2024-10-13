import { columns } from "@/components/manage-categories/column";
import DataTable from "@/components/table/data-table";
import { useDeleteCategory } from "@/hooks/query-categories/useDeleteCategory";
import { useGetAllCategories } from "@/hooks/query-categories/useGetAllCategories";
import useDebounce from "@/hooks/useDebounce";
import { useCategoryStore } from "@/store/useCategotyStore";
import React, { useState } from "react";

function CategoriesPage() {
  const [keyword, setKeyword] = useState("");
  const debounced = useDebounce(keyword, 2000);
  const { modalDelete, setModalDelete, _id, name } = useCategoryStore();
  const mutation = useDeleteCategory();
  const { data, isLoading } = useGetAllCategories({
    page: 1,
    limit: 100,
    sort: "asc",
    keyword: debounced,
  });
  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Manager Categories</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <DataTable
            data={data?.entities ?? []}
            columns={columns}
            setKeyword={setKeyword}
            keyword={keyword}
            link_create="/admin/categories/create-category"
          />
        )}
      </div>
    </>
  );
}

export default CategoriesPage;
