import axios from "axios";

export const fetchPosts = async (callback: any) => {
  const { data } = await axios.get("/api/posts");
  callback(data.posts);
};
