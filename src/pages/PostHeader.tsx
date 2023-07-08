import styles from "./PostHeader.module.css";

const PostHeader = ({ post }: any) => {
  if (!post) {
    return <div>loading...</div>;
  }
  return (
    <div className={styles.header}>
      <h4 className={styles.headerItem}>{post.title}</h4>
      <h4 className={styles.headerItem}>{`by ${post.author}`}</h4>
    </div>
  );
};
export default PostHeader;
