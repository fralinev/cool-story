import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

const Signup = () => {
  const [input, setInput] = useState({ username: "", password: "" });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(input);
    const { data } = await axios.post("/api/users/signup", input);
    setInput({ username: "", password: "" });

    console.log(data);
  };
  return (
    <div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>
            username
            <input
              type="text"
              name="username"
              value={input.username}
              onChange={handleChange}
            />
          </label>
          <label>
            password
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={handleChange}
            />
          </label>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};
export default Signup;
