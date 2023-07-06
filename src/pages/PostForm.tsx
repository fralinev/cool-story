import { useState, useContext, ChangeEvent, FormEvent, useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import PostDisplay from "./PostDisplay";

const PostForm = () => {
  const { currentUser } = useContext(UserContext);
  const [posts, setPosts] = useState<any>([]);
  const [story, setStory] = useState({
    title: "",
    author: currentUser?.username,
    body: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get("/api/posts");
      setPosts(data.posts);
      console.log(currentUser);
    };

    fetchPosts();
  }, []);

  const handleAddStoryClick = () => {
    if (!currentUser) {
      return alert("plz sign in to post");
    }
    setShowForm((prev: any) => !prev);
    setMessage("");
  };

  const handleStoryChange = (
    event: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>
  ) => {
    setStory((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let response;
    setIsLoading(true);
    response = await axios.post("/api/posts", story);
    setIsLoading(false);
    setMessage(response.data.message);
    setShowForm(false);
    setStory({ title: "", author: currentUser?.username, body: "" });
    response = await axios.get("/api/posts");
    setPosts(response.data.posts);
  };

  if (!posts || posts.length === 0) {
    return <div>loading...</div>;
  }

  return (
    <>
      <PostDisplay posts={posts} setPosts={setPosts} />
      <div className="post-form-outer-container">
        <button onClick={handleAddStoryClick}>
          {showForm ? "Nevermind" : "Add a story"}
        </button>
        {showForm ? (
          <form className="post-form" onSubmit={handleFormSubmit}>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={story.title}
                onChange={handleStoryChange}
              />
            </label>
            <textarea
              name="body"
              value={story.body}
              onChange={handleStoryChange}
            />
            <button>submit</button>
          </form>
        ) : null}
        <h4>{isLoading ? <div className="lds-dual-ring"></div> : message}</h4>
      </div>
    </>
  );
};
export default PostForm;
