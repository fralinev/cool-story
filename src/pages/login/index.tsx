import { ChangeEvent, FormEvent, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { UserContext, UserContextType } from "../../context/UserContext";

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useContext(UserContext as React.Context<UserContextType>);

  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    setInput({ username: "", password: "" });
    const { data } = await axios.post("/api/users/login", input);
    setIsLoading(false);
    setMessage(data.message);
    if (data.message === "OK") {
      setUser(data.user);
      router.push("/");
    }
  };

  return (
    <div className="form-outer-container">
      <div className="form-inner-container">
        <h1>LOG IN</h1>

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
export default Login;
