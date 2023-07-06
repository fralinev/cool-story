import Post from "./Post";
import { useEffect } from "react";

const PostDisplay = ({ posts, setPosts }: any) => {
  if (!posts) {
    return <div>loading...</div>;
  }

  return (
    <>
      <div className="post-display-outer-container">
        <div className="post-display-inner-container">
          {posts
            ? posts.map((post: any) => {
                return (
                  <Post key={post._id} post={post} setPosts={setPosts}></Post>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
};
export default PostDisplay;
