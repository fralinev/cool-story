import Post from "./Post";
import styles from "./PostDisplay.module.css";

const PostDisplay = ({ posts, setPosts }: any) => {
  if (!posts || posts.length === 0) {
    return <div>loading...</div>;
  }

  return (
    <>
      <div className="post-display-outer-container">
        <div className="post-display-inner-container">
          {posts.map((post: any) => {
            return <Post key={post._id} post={post} setPosts={setPosts}></Post>;
          })}
        </div>
      </div>
    </>
  );
};
export default PostDisplay;
