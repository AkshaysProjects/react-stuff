import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPost = async (postId: string) => {
  return axios
    .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((res) => res.data);
};

export default function usePost(postId: string) {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPost(postId),
  });
}
