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

module.exports = {
  dummy,
  totalLikes,
};
