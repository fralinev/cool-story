const Post = () => {
  const date: any = new Date();
  return (
    <div>
      <div className="post">
        <h4>username</h4>
        <h4>{date.toString()}</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
          enim consectetur molestias, quibusdam expedita architecto a, nisi
          voluptatem laboriosam minima, eos praesentium libero! Ullam sint, vel
          voluptatum laborum dolorem illo?
        </p>
      </div>
    </div>
  );
};
export default Post;
