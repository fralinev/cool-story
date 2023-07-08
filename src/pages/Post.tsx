import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import Reaction from "./Reaction";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";

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
        <PostHeader post={post} />
        <PostBody post={post} />
      </div>
      <br />

      <Reaction post={post} setPosts={setPosts} />
      <hr />
    </div>
  );
};
export default Post;
