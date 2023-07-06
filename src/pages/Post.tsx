import { useState, useEffect } from "react";
import axios from "axios";

const Post = ({ post, setPosts }: any) => {
  const [hovered, setHovered] = useState(-1);

  const deletePost = async (id: any) => {
    // const response = await axios.delete(`/api/posts/${id}`);
    // setPosts((prev: any) => {
    //   return prev.filter((post: any) => post._id !== id);
    // });
  };

  const deleteButton = (
    <button onClick={() => deletePost(post ? post._id : null)}>Delete</button>
  );

  return (
    <div
      onMouseEnter={() => setHovered(post ? post._id : null)}
      onMouseLeave={() => setHovered(-1)}
    >
      <div className="post">
        <h4>{post ? post.title : null}</h4>
        <h4>{post ? `by ${post.author}` : null}</h4>
        <p>{post ? post.body : null}</p>
        {hovered === post._id ? deleteButton : null}
      </div>
      <hr />
    </div>
  );
};
export default Post;
