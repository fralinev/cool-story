import axios from "axios";

export const getPosts = async () => {
  const { data } = await axios.get("/api/posts");
  return data;
};
