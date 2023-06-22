import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

const Login = () => {
  const [input, setInput] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(input);
    setInput({ username: "", password: "" });
    const { data } = await axios.post("http://localhost:3000/api/users");
    console.log(data);
    setMessage(data.message);
  };

  console.log(message);
  return (
    <div className="login-form-outer-container">
      <div className="login-form-inner-container">
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
          <h2>{message}</h2>
        </form>
      </div>
    </div>
  );
};
export default Login;
