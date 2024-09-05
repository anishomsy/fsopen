const Blog = ({ blog }) => (
  <div>
    <p>
      {blog.title} - {blog.author}
    </p>
  </div>
);

const CreateBlogForm = ({
  handleCreateBlog,
  handleCreateBlogChange,
  values,
}) => {
  return (
    <>
      <h1>create new</h1>
      <form onSubmit={handleCreateBlog}>
        <input
          type="text"
          name="title"
          onChange={handleCreateBlogChange}
          value={values.title}
          placeholder="title"
        />
        <br />
        <input
          type="text"
          name="author"
          onChange={handleCreateBlogChange}
          value={values.author}
          placeholder="author"
        />
        <br />
        <input
          type="text"
          name="url"
          onChange={handleCreateBlogChange}
          value={values.url}
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
      <h1>{message}</h1>
    </>
  );
};

export { Blog, CreateBlogForm, Notification };
