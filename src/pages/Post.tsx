const Post = ({ username, text }: any) => {
  const date: any = new Date();
  return (
    <div>
      <div className="post">
        <h4>{username}</h4>
        {/* <h4>{date.toString()}</h4> */}
        <p>{text}</p>
      </div>
      <hr />
    </div>
  );
};
export default Post;
