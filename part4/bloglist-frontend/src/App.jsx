import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import { loginUser } from "./services/login";
import { LoginForm } from "./components/Login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  useEffect(() => {
    const user = window.localStorage.getItem("userInfo");
    if (!user) {
      return setUserInfo(null);
    }
    return setUserInfo(JSON.parse(user));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginUser(loginForm.username, loginForm.password);
      setLoginForm({ username: "", password: "" });
      setUserInfo(user);
      window.localStorage.setItem("userInfo", JSON.stringify(user));

      return;
    } catch (error) {
      console.log(error);
    }
    return;
  };

  const handleLogout = () => {
    window.localStorage.removeItem("userInfo");
    setUserInfo(null);
    return;
  };

  const handleLoginFormChange = (event) => {
    const newObject = {
      ...loginForm,
      [event.target.name]: event.target.value,
    };
    setLoginForm(newObject);
    return;
  };

  return (
    <div>
      <div>
        {userInfo === null ? (
          <LoginForm
            handleLoginFormChange={handleLoginFormChange}
            handleLogin={handleLogin}
            values={loginForm}
          />
        ) : (
          <div>
            <p>
              {userInfo.name} is logged in
              <button onClick={handleLogout}>logout</button>
            </p>
          </div>
        )}
      </div>
      <div>
        <h2>blogs</h2>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default App;
