import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import Spinner from "../components/Spinner";
import usePosts from "../hooks/usePosts";

export const Route = createLazyFileRoute("/posts")({
  component: Posts,
});

function Posts() {
  const [page, setPage] = useState(0);
  const {
    data: posts,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = usePosts();

  if (isLoading || isFetching || !posts) return <Spinner />;

  const changePage = (page: number) => {
    if (page > posts.pages.length - 1) fetchNextPage();
    setPage(page);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-3xl font-bold">Posts</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.pages[page].map((post) => (
          <Link
            to={`/posts/${post.id}`}
            key={post.id}
            className="rounded-lg border bg-white p-4 shadow-lg transition duration-200 ease-in-out hover:bg-gray-100"
          >
            <h2 className="mb-2 text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-700">{post.body.slice(0, 100)}...</p>
          </Link>
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => changePage(page - 1)}
          className="rounded bg-gray-300 px-4 py-2 text-gray-700 disabled:opacity-50"
          disabled={page === 0}
        >
          Previous
        </button>
        <button
          onClick={() => changePage(page + 1)}
          className="rounded bg-gray-300 px-4 py-2 text-gray-700 disabled:opacity-50"
          disabled={!hasNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
