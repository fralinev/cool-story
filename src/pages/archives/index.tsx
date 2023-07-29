import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../Table";
import SearchArchives from "./SearchArchives";
import TableArchive from "./TableArchive";

const Archives = () => {
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const { data } = await axios.get("/api/posts?instruction=full");
  //     setPosts(data.posts);
  //   };
  //   fetchPosts();
  // }, []);

  const handleSearch = async (e: any, searchTerm: any, searchOption: any) => {
    e.preventDefault();
    const response = await axios.get(
      `/api/search?term=${searchTerm}&option=${searchOption}`
    );
    setPosts(response.data);
    console.log(response.data);
  };

  return (
    <div>
      <SearchArchives onSearch={handleSearch} />
      <TableArchive posts={posts} />
      {/* <Table data={posts} /> */}
    </div>
  );
};
export default Archives;
