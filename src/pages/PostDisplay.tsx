import Post from "./Post";
import { use, useEffect, useState } from "react";
import axios from "axios";

const PostDisplay = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get("/api/posts");
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  useEffect(() => {});

  return (
    <div className="post-display-outer-container">
      <div className="post-display-inner-container">
        {posts.map((post: any) => {
          return (
            <Post
              key={post._id}
              username={post.user.username}
              text={post.text}
            ></Post>
          );
        })}
      </div>
    </div>
  );
};
export default PostDisplay;
