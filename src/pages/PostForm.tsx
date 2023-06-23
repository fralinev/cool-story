import { useState, useContext, ChangeEvent, FormEvent } from "react";
import { UserContext } from "@/context/UserContext";
import axios from "axios";

const PostForm = () => {
  const { currentUser } = useContext(UserContext);
  const [story, setStory] = useState({ user: currentUser, text: "" });
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddStoryClick = () => {
    if (!currentUser) {
      return alert("plz sign in!");
    }
    setShowForm((prev) => !prev);
    setMessage("");
  };
  const handleStoryChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setStory((prev) => {
      return { ...prev, text: event.target.value };
    });
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const { data } = await axios.post("/api/posts", story);
    setIsLoading(false);
    setMessage(data.message);
    setShowForm(false);
    setStory({ user: currentUser, text: "" });
  };

  return (
    <div className="post-form-outer-container">
      <button onClick={handleAddStoryClick}>
        {showForm ? "Nevermind" : "Add a story"}
      </button>
      {showForm ? (
        <form className="post-form" onSubmit={handleSubmit}>
          <textarea value={story.text} onChange={handleStoryChange} />
          <button>submit</button>
        </form>
      ) : null}
      <h4>{isLoading ? <div className="lds-dual-ring"></div> : message}</h4>
    </div>
  );
};
export default PostForm;
