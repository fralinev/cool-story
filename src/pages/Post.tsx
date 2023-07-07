import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const Post = ({ post, setPosts }: any) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [hovered, setHovered] = useState(-1);

  const deletePost = async (id: any) => {
    const response = await axios.delete(`/api/posts/${id}`);
    setPosts((prev: any) => {
      return prev.filter((post: any) => post._id !== id);
    });
  };

  const handleInterestClick = async (e: any, postid: any, posttitle: any) => {
    if (currentUser.username === "anon") {
      return alert("plz sign in to vote");
    }

    const response = await axios.put(`/api/users/interest/${currentUser._id}`, {
      postid,
      posttitle,
      value: e.target.innerHTML,
    });
    setCurrentUser((prev: any) => {
      return {
        ...prev,
        interest: {
          ...prev.interest,
          for: [...prev.interest.for, { postid, posttitle }],
          against: prev.interest.against.filter((item: any) => {
            return item.postid !== postid;
          }),
        },
      };
    });

    console.log(response.data);
  };

  const deleteButton = (
    <button onClick={() => deletePost(post._id)}>Delete</button>
  );

  const interestButtons = (
    <>
      <h6>Interesting?</h6>
      <div>
        <span
          className=""
          style={{ cursor: "pointer" }}
          onClick={(e) => handleInterestClick(e, post._id, post.title)}
        >
          Yes
        </span>
        <span>&nbsp;</span>
        <span
          className=""
          style={{ cursor: "pointer" }}
          onClick={(e) => handleInterestClick(e, post._id, post.title)}
        >
          No
        </span>
      </div>
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
      <br />
      <h2>
        {currentUser?.interest?.for.find((obj: any) => obj.postid === post._id)
          ? "INTERESTING"
          : null}
      </h2>
      <hr />
    </div>
  );
};
export default Post;
