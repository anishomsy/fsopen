import { useState } from "react";

const LoginForm = ({ loginUserInfo }) => {
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const handleLoginFormChange = (event) => {
    const newObject = {
      ...loginForm,
      [event.target.name]: event.target.value,
    };
    setLoginForm(newObject);
    return;
  };

  const handleLogin = (event) => {
    event.preventDefault();
    loginUserInfo(loginForm);

    setLoginForm({ username: "", password: "" });
    return;
  };

  return (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          onChange={handleLoginFormChange}
          value={loginForm.username}
          placeholder="username"
        />
        <br />
        <input
          type="password"
          name="password"
          onChange={handleLoginFormChange}
          value={loginForm.password}
          placeholder="password"
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export { LoginForm };
