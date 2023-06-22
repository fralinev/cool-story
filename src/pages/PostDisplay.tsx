import Post from "./Post";

const PostDisplay = () => {
  return (
    <div className="post-display-outer-container">
      <div className="post-display-inner-container">
        <Post></Post>
        <hr />
        <Post></Post>
        <hr />
        <Post></Post>
        <hr />
        <Post></Post>
      </div>
    </div>
  );
};
export default PostDisplay;
