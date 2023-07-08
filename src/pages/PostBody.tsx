import styles from "./PostBody.module.css";

const PostBody = ({ post }: any) => {
  return (
    <div>
      <p className={styles.postBody}>{post.body}</p>
    </div>
  );
};
export default PostBody;
