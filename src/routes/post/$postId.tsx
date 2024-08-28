import { createFileRoute } from "@tanstack/react-router";
import { User } from "lucide-react";
import Spinner from "../../components/Spinner";
import usePost from "../../hooks/usePost";

export const Route = createFileRoute("/post/$postId")({
  component: Post,
});

export default function Post() {
  const { postId } = Route.useParams();
  const { data: post, error, isLoading } = usePost(postId);

  if (isLoading) return <Spinner />;

  if (error)
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="rounded-lg bg-red-100 p-4 text-red-700 shadow-md">
          Error fetching post
        </div>
      </div>
    );

  if (!post)
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="rounded-lg bg-yellow-100 p-4 text-yellow-700 shadow-md">
          Post not found
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-xl bg-white shadow-2xl">
          <div className="p-8">
            <h1 className="mb-4 text-4xl font-extrabold text-gray-900">
              {post.title}
            </h1>
            <div className="mb-6 flex items-center text-gray-600">
              <User className="mr-2 h-5 w-5" />
              <span className="font-medium">User ID: {post.userId}</span>
            </div>
            <div className="prose prose-lg text-gray-700">
              <p>{post.body}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
