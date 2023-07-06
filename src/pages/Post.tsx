import { useState, useEffect } from "react";
import axios from "axios";

const Post = ({ post, setPosts }: any) => {
  const [hovered, setHovered] = useState(-1);

  const deletePost = async (id: any) => {
    const response = await axios.delete(`/api/posts/${id}`);
    setPosts((prev: any) => {
      return prev.filter((post: any) => post._id !== id);
    });
  };

  const deleteButton = (
    <button onClick={() => deletePost(post._id)}>Delete</button>
  );

  if (!post) {
    return <div>loading...</div>;
  }

  return (
    <div
      onMouseEnter={() => setHovered(post._id)}
      onMouseLeave={() => setHovered(-1)}
    >
      <div className="post">
        <h4>{post.title}</h4>
        <h4>{`by ${post.author}`}</h4>
        <p>{post.body}</p>
        {hovered === post._id ? deleteButton : null}
      </div>
      <hr />
    </div>
  );
};
export default Post;
