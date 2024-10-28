import { useGetAllBlogs } from "@/hooks/query-blogs/useGetAllBlog";
import React from "react";
import { Link } from "react-router-dom";

function BlogHomePage() {
  const { data: blogs } = useGetAllBlogs({
    page: 1,
    limit: 100,
    sort: "asc",
    keyword: "",
  });
  return (
    <div className="p-4 w-full">
      <h1 className="text-3xl font-bold">Xu hướng sản phẩm</h1>
      <div className="flex flex-col gap-2 mt-4 w-full">
        {blogs?.entities?.map((blog) => (
          <div key={blog._id} className="flex w-full gap-4 border p-2 ">
            <Link to={`/blogs/${blog._id}`}>
              <img
                className="object-cover h-[300px] rounded-lg"
                src={blog.image_url}
                width={300}
              ></img>
            </Link>
            <div className="flex flex-col gap-2 ">
              <Link to={`/blogs/${blog._id}`}>
                <h1 className="text-xl font-bold hover:text-orange-500">
                  {blog.title}
                </h1>
              </Link>
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              <div className="flex gap-2 items-center">
                <p className="text-sm">Bởi: {blog.created_by}</p>
                <p>{new Date(blog.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogHomePage;
