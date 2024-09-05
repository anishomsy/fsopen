import { useState, useEffect } from "react";
import { Blog, CreateBlogForm } from "./components/Blog";
import blogService from "./services/blogs";
import { loginUser } from "./services/login";
import { LoginForm } from "./components/Login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [userInfo, setUserInfo] = useState(null);
  const [blogForm, setBlogForm] = useState({ title: "", author: "", url: "" });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  useEffect(() => {
    const loggedInUserInfo = window.localStorage.getItem("userInfo");
    if (!loggedInUserInfo) {
      return setUserInfo(null);
    }
    const user = JSON.parse(loggedInUserInfo);
    blogService.setToken(user.token);
    return setUserInfo(user);
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginUser(loginForm.username, loginForm.password);
      setLoginForm({ username: "", password: "" });
      setUserInfo(user);
      window.localStorage.setItem("userInfo", JSON.stringify(user));

      blogService.setToken(user.token);

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
  const handleCreateBlogChange = (event) => {
    const newObject = {
      ...blogForm,
      [event.target.name]: event.target.value,
    };
    setBlogForm(newObject);

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

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    try {
      const blog = await blogService.create(blogForm);
      const newBlogs = blogs.concat(blog);
      setBlogs(newBlogs);
      setBlogForm({ title: "", author: "", url: "" });
    } catch (error) {
      if (error.response.data.error) {
        return handleLogout();
      }
      console.log(error.response.data);
    }
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
            <CreateBlogForm
              handleCreateBlog={handleCreateBlog}
              handleCreateBlogChange={handleCreateBlogChange}
              values={blogForm}
            />
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
