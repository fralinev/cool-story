import Post from "./Post";

const PostDisplay = ({ posts }: any) => {
  return (
    <>
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
    </>
  );
};
export default PostDisplay;
