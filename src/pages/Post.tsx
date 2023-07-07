import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import Reaction from "./Reaction";

const Post = ({ post, setPosts }: any) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [hovered, setHovered] = useState(-1);

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

        <br />
      </div>
      <br />

      <Reaction post={post} setPosts={setPosts} />
      <hr />
    </div>
  );
};
export default Post;
