const Post = ({ username, text }: any) => {
  return (
    <div>
      <div className="post">
        <h4>{username}</h4>
        <p>{text}</p>
      </div>
      <hr />
    </div>
  );
};
export default Post;
