import { UserContext } from "@/context/UserContext";
import styles from "./Reaction.module.css";
import { useContext } from "react";
import axios from "axios";
import { MdRemoveCircle } from "react-icons/md";
import { fetchPosts } from "../../server/utils";

const Reaction = ({ post, setPosts }: any) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const handleInterestClick = async (e: any, post_id: any, post_title: any) => {
    if (currentUser.username === "anon") {
      return alert("plz sign in to vote");
    }
    const alreadyFor = currentUser.interest.for.find(
      (obj: any) => obj.postid === post_id
    );
    const alreadyAgainst = currentUser.interest.against.find(
      (obj: any) => obj.postid === post_id
    );

    if (e.target.innerHTML === "Interesting" && alreadyFor)
      return console.log("already for, no request sent");
    if (e.target.innerHTML === "Not Interesting" && alreadyAgainst)
      return console.log("already against, no request sent");

    await axios.put(`/api/users/interest/${currentUser._id}`, {
      post_id,
      post_title,
      value: e.target.innerHTML,
    });

    if (e.target.innerHTML === "Interesting") {
      setCurrentUser((prev: any) => {
        return {
          ...prev,
          interest: {
            ...prev.interest,
            for: [...prev.interest.for, { postId, postTitle }],
            // against: prev.interest.against.filter((item: any) => {
            //   return item.postid !== postid;
            // }),
          },
        };
      });
    }
    // if (e.target.innerHTML === "Not Interesting") {
    //   setCurrentUser((prev: any) => {
    //     return {
    //       ...prev,
    //       interest: {
    //         ...prev.interest,
    //         against: [...prev.interest.against, { postid, posttitle }],
    //         for: prev.interest.for.filter((item: any) => {
    //           return item.postid !== postid;
    //         }),
    //       },
    //     };
    //   });
    // }

    fetchPosts(setPosts);
  };

  const deletePost = async (id: any) => {
    const response = await axios.delete(`/api/posts/${id}`);
    setPosts((prev: any) => {
      return prev.filter((post: any) => post._id !== id);
    });
  };

  if (!post) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <div className={styles.reactionSection}>
        <p>{post.score.good} people found this interesting </p>
        <div
          className={styles.reactionOptions}
          onClick={(e) => handleInterestClick(e, post._id, post.title)}
        >
          <div
            className={
              currentUser?.interest?.for.find(
                (obj: any) => obj.postid === post._id
              )
                ? styles.reactionSelected
                : styles.reaction
            }
          >
            Interesting
          </div>

          {currentUser?.roles.admin ? (
            <div
              className={styles.adminDelete}
              onClick={() => deletePost(post._id)}
            >
              <MdRemoveCircle />
              Delete Post
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default Reaction;
