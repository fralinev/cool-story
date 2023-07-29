import { useEffect } from "react";
import styles from "./TableArchive.module.css";

const TableArchive = ({ posts }: any) => {
  if (!posts) {
    return <div>loading...</div>;
  }
  if (posts.length === 0) {
    return <div>No Results</div>;
  }
  //   useEffect(() => {
  //     console.log(posts);
  //   });

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Body</th>
          <th>Id</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post: any) => {
          return (
            <tr key={post.id} className={styles.tableArchiveRow}>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>{post.body}</td>
              <td>{post._id}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default TableArchive;
