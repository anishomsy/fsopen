import { useState, useEffect } from "react";
import { Blog, CreateBlogForm, Notification } from "./components/Blog";
import blogService from "./services/blogs";
import { loginUser } from "./services/login";
import { LoginForm } from "./components/Login";
import Togglable from "./components/Togglable";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);

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

  const Notify = (info) => {
    if (info === null) {
      return setNotificationMessage(null);
    }
    setNotificationMessage(info);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);

    return;
  };

  const handleLogin = async (loginFormObject) => {
    try {
      const user = await loginUser(loginFormObject);
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

  const handleCreateBlog = async (newBlogObject) => {
    try {
      const blog = await blogService.create(newBlogObject);
      const newBlogs = blogs.concat(blog);

      setBlogs(newBlogs);

      Notify({
        message: `a new blog '${blog.title}' by ${blog.author} was created`,
        type: "success",
      });
    } catch (error) {
      if (error.response.data.error === "token expired") {
        Notify({
          message: error.response.data.error,
          type: "error",
        });

        return handleLogout();
      }
      error.response.data.map((val) => {
        return Notify({
          message: val.message,
          type: "error",
        });
      });
    }
  };

  return (
    <div>
      <div>
        {notificationMessage === null ? null : (
          <Notification
            message={notificationMessage.message}
            type={notificationMessage.type}
          />
        )}
      </div>
      <div>
        {userInfo === null ? (
          <Togglable toggleLabel="login">
            <LoginForm loginUserInfo={handleLogin} />
          </Togglable>
        ) : (
          <div>
            <p>
              {userInfo.name} is logged in
              <button onClick={handleLogout}>logout</button>
            </p>
            <Togglable toggleLabel="new blog">
              <CreateBlogForm createBlog={handleCreateBlog} />
            </Togglable>
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
