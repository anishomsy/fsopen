import { useState } from "react";

import blogService from "../services/blogs";

const Blog = ({ blog, handleBlogDelete, userId = null }) => {
  const [isView, setIsview] = useState(false);
  const [updatedBlog, setUpdatedBlog] = useState(null);
  const toggleView = () => {
    setIsview(!isView);
  };

  const blogToShow = updatedBlog ? updatedBlog : blog;

  const handleLike = async () => {
    try {
      const newBlogObject = {
        ...blogToShow,
        user: { ...blogToShow.user },
        likes: blogToShow.likes + 1,
      };
      const result = await blogService.update(blogToShow.id, newBlogObject);
      setUpdatedBlog(result);
    } catch (error) {
      console.log(error);
    }

    return;
  };
  const handleDelete = () => {
    const permission = confirm(
      `Remove blog "${blogToShow.title}" by ${blogToShow.author}`,
    );
    if (!permission) {
      return null;
    }
    return handleBlogDelete(blogToShow.id);
  };

  return (
    <div className="blog">
      <div>
        {blogToShow.title} - {blogToShow.author}
        <button onClick={toggleView}>{isView ? "hide" : "view"}</button>
      </div>
      {!isView ? (
        ""
      ) : (
        <div>
          <p>{blogToShow.url}</p>
          <p>
            likes:{blogToShow.likes}
            <button onClick={handleLike}>like</button>
          </p>
          <p>{blogToShow.user.name}</p>

          {userId === blogToShow.user.id ? (
            <button type="" onClick={handleDelete}>
              delete
            </button>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

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

export { Blog, CreateBlogForm };
