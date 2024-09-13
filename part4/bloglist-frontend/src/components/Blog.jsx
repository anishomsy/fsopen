import { useState } from "react";

import PropTypes from "prop-types";

const Blog = ({ blog, handleBlogDelete, userId = null, handleLike }) => {
  const [isView, setIsview] = useState(false);
  const toggleView = () => {
    setIsview(!isView);
  };

  const handleLikeBtnClick = async () => {
    const newBlogObject = {
      ...blog,
      user: { ...blog.user },
      likes: blog.likes + 1,
    };
    handleLike(newBlogObject);
  };
  const handleDelete = () => {
    // const permission = window.confirm(
    //   `Remove blog "${blog.title}" by ${blog.author}`,
    // );
    // if (!permission) {
    //   return null;
    // }
    return handleBlogDelete(blog.id);
  };

  return (
    <div className="blog">
      <div>
        {blog.title} - {blog.author}
        <button onClick={toggleView}>{isView ? "hide" : "view"}</button>
      </div>
      {!isView ? (
        ""
      ) : (
        <div>
          <p id="blogUrl">{blog.url}</p>
          <p id="blogLikes">
            likes:{blog.likes}
            <button onClick={handleLikeBtnClick}>like</button>
          </p>
          <p id="blogUserName">{blog.user.name}</p>

          {userId === blog.user.id ? (
            <button type="button" onClick={handleDelete}>
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
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
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
          data-testid="newBlogTitle"
          id="newBlogTitle"
          type="text"
          name="title"
          onChange={handleNewBlogFormChange}
          value={blogForm.title}
          placeholder="title"
        />
        <br />
        <input
          data-testid="newBlogAuthor"
          id="newBlogAuthor"
          type="text"
          name="author"
          onChange={handleNewBlogFormChange}
          value={blogForm.author}
          placeholder="author"
        />
        <br />
        <input
          data-testid="newBlogUrl"
          id="newBlogUrl"
          type="text"
          name="url"
          onChange={handleNewBlogFormChange}
          value={blogForm.url}
          placeholder="url"
        />
        <br />
        <button
          type="submit"
          data-testid="newBlogCreateBtn"
          id="newBlogCreateBtn"
        >
          create
        </button>
      </form>
    </>
  );
};

CreateBlogForm.propTypes = { createBlog: PropTypes.func.isRequired };

export { Blog, CreateBlogForm };
