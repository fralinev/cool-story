import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

const Signup = () => {
  const [input, setInput] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const { data } = await axios.post("/api/users/signup", input);
    setInput({ username: "", password: "" });
    setIsLoading(false);
    setMessage(data.message);
  };
  return (
    <div className="signup-form-outer-container">
      <div className="signup-form-inner-container">
        <h1>SIGN UP</h1>
        <form onSubmit={handleSubmit}>
          <label>
            username:&nbsp;&nbsp;
            <input
              type="text"
              name="username"
              value={input.username}
              onChange={handleChange}
            />
          </label>
          <label>
            password:&nbsp;&nbsp;
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={handleChange}
            />
          </label>
          <button>Submit</button>
          <h4>{isLoading ? <div className="lds-dual-ring"></div> : message}</h4>
        </form>
      </div>
    </div>
  );
};
export default Signup;
