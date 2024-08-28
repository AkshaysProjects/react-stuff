import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import Post from "../types/Post";

const getPosts = async ({ pageParam = 1 }: { pageParam?: number }) => {
  console.log(pageParam, pageParam * 10);
  return axios
    .get<
      Post[]
    >(`https://jsonplaceholder.typicode.com/posts?_start=${pageParam}&_limit=10`)
    .then((res) => res.data);
};

export default function usePosts() {
  return useInfiniteQuery({
    queryKey: ["posts"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getPosts({ pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length === 10) return undefined;
      return lastPage.length === 10 ? allPages.length * 10 : undefined;
    },
  });
}
