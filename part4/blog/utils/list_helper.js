const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  if (!blogs.length && typeof blogs === "object") {
    return blogs.likes;
  }
  const total = blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);
  return total;
};

const favoriteBlog = (blogs = []) => {
  if (blogs.length === 0) {
    return null;
  }
  if (!blogs.length && typeof blogs === "object") {
    return blogs;
  }

  // set favorite to be the first object
  let favorite = blogs[0];

  blogs.map((blog) => {
    if (blog.likes > favorite.likes) {
      favorite = blog;
    }
  });
  return favorite;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
