import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const Post = ({ post, setPosts }: any) => {
  const { currentUser } = useContext(UserContext);

  const [hovered, setHovered] = useState(-1);

  const deletePost = async (id: any) => {
    const response = await axios.delete(`/api/posts/${id}`);
    setPosts((prev: any) => {
      return prev.filter((post: any) => post._id !== id);
    });
  };

  const handleGoodClick = async (id: any) => {
    if (currentUser.username === "anon") {
      return alert("plz sign in to vote");
    }
    const response = await axios.put(`/api/posts/${id}`, {
      good: 1,
    });
    console.log(response.data);
  };
  const handleBadClick = async (id: any) => {
    if (currentUser.username === "anon") {
      return alert("plz sign in to vote");
    }
    const response = await axios.put(`/api/posts/${id}`, {
      bad: 1,
    });
    console.log(response.data);
  };

  const deleteButton = (
    <button onClick={() => deletePost(post._id)}>Delete</button>
  );

  const interestButtons = (
    <>
      <h6>Interesting?</h6>
      <button onClick={() => handleGoodClick(post._id)}>yes</button>
      <span>&nbsp;</span>
      <button onClick={() => handleBadClick(post._id)}>no</button>
    </>
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

        {hovered === post._id ? interestButtons : null}
        <br />
        {hovered === post._id ? deleteButton : null}
      </div>
      <hr />
    </div>
  );
};
export default Post;
