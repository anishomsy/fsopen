const _ = require("lodash");
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
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

const mostBlogs = (blogs = []) => {
  if (blogs.length === 0) {
    return null;
  }
  const count = _.countBy(blogs, "author");
  return _.maxBy(
    _.map(count, (value, key) => ({ author: key, blogs: value })),
    "blogs",
  );
};

const mostLikes = (blogs = []) => {
  if (blogs.length === 0) {
    return null;
  }
  // if (blogs.length === 1) {
  //   console.log("the length is one", blogs);
  //   return;
  // }
  const grouped = _.groupBy(blogs, "author");
  return _.maxBy(
    _.map(grouped, (values, key) => {
      return {
        author: key,
        likes: _.sumBy(values, "likes"),
      };
    }),
    "likes",
  );
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
