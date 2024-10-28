import { useGetBlog } from "@/hooks/query-blogs/useGetBlog";
import { useParams } from "react-router-dom";

function BlogDetailPage() {
  const _id = useParams().id ?? "";
  const { data: blog } = useGetBlog(_id);

  return (
    <div className="p-4 w-full flex flex-col gap-4">
      <h1 className="text-3xl font-bold">{blog?.title}</h1>
      <div className="flex gap-2 items-center">
        <h1>Bởi: {blog?.created_by}</h1>
        {blog && <h1>{new Date(blog?.created_at).toLocaleDateString()}</h1>}
      </div>
      <div
        className="w-full"
        dangerouslySetInnerHTML={{ __html: blog?.content ?? "" }}
      />
    </div>
  );
}

export default BlogDetailPage;
