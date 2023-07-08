import styles from "./PostBody.module.css";

const PostBody = ({ post }: any) => {
  if (!post) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <p className={styles.postBody}>{post.body}</p>
    </div>
  );
};
export default PostBody;
