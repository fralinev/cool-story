import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../Table";
import SearchArchives from "./SearchArchives";

const Archives = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get("/api/posts");
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <SearchArchives />
      <Table data={posts} />
    </div>
  );
};
export default Archives;
