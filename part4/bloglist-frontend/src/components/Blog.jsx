import { useState } from "react";

const Blog = ({ blog }) => (
  <div>
    <p>
      {blog.title} - {blog.author}
    </p>
  </div>
);

const CreateBlogForm = ({ createBlog }) => {
  const [blogForm, setBlogForm] = useState({ title: "", author: "", url: "" });

  const handleNewBlogFormChange = (event) => {
    const newObject = {
      ...blogForm,
      [event.target.name]: event.target.value,
    };
    setBlogForm(newObject);

    return;
  };

  const handleCreateBlog = (event) => {
    event.preventDefault();
    console.log(blogForm);
    createBlog(blogForm);

    setBlogForm({ title: "", author: "", url: "" });
    return;
  };

  return (
    <>
      <h1>create new</h1>
      <form onSubmit={handleCreateBlog}>
        <input
          type="text"
          name="title"
          onChange={handleNewBlogFormChange}
          value={blogForm.title}
          placeholder="title"
        />
        <br />
        <input
          type="text"
          name="author"
          onChange={handleNewBlogFormChange}
          value={blogForm.author}
          placeholder="author"
        />
        <br />
        <input
          type="text"
          name="url"
          onChange={handleNewBlogFormChange}
          value={blogForm.url}
          placeholder="url"
        />
        <br />
        <button type="submit">create</button>
      </form>
    </>
  );
};

const Notification = ({ message, type }) => {
  return (
    <>
      <h3>{message}</h3>
    </>
  );
};

export { Blog, CreateBlogForm, Notification };
