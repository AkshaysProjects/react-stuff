import { zodResolver } from "@hookform/resolvers/zod";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createLazyFileRoute("/new-post")({
  component: CreatePost,
});

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z
    .string()
    .max(1000, "Description must be less than 1000 characters"),
});

type PostFormValues = z.infer<typeof postSchema>;

function CreatePost() {
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<PostFormValues> = async (data) => {
    try {
      await axios.post("https://jsonplaceholder.typicode.com/posts", {
        title: data.title,
        body: data.description,
      });
      setIsSubmitSuccessful(true);

      // Start countdown and navigate after it finishes
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate({ to: "/posts" }); // Redirect to home page
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create New Post
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Share your thoughts with the world
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="title" className="sr-only">
                Title
              </label>
              <input
                id="title"
                type="text"
                {...register("title")}
                className={`relative block w-full appearance-none rounded-none border px-3 py-2 ${
                  errors.title ? "border-red-300" : "border-gray-300"
                } rounded-t-md text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                placeholder="Title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="description" className="sr-only">
                Description
              </label>
              <textarea
                id="description"
                {...register("description")}
                rows={4}
                className={`relative block w-full appearance-none rounded-none border px-3 py-2 ${
                  errors.description ? "border-red-300" : "border-gray-300"
                } rounded-b-md text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                placeholder="What's on your mind?"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {isSubmitSuccessful && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
              <span className="ml-2 text-sm text-gray-600">
                {isSubmitSuccessful
                  ? `Post created successfully! Redirecting in ${countdown}...`
                  : ""}
              </span>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Need help?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Create Post"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
