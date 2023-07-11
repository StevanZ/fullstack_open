var _ = require('lodash');

const totalLikes = (blogs) => {
  const likesSum = (acc, cur) => acc + cur.likes;

  return blogs.lenght === 0 ? 0 : blogs.reduce(likesSum, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return 0;

  const likes = blogs.map((blog) => blog.likes);
  const mostLikedBlog = blogs.find((blog) => blog.likes === Math.max(...likes));
  return {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return 0;

  const countedBlogs = _.groupBy(blogs, 'author');
  return Object.keys(countedBlogs).reduce((a, b) =>
    countedBlogs[a] > countedBlogs[b]
      ? { author: a, blogs: countedBlogs[a].length }
      : { author: b, blogs: countedBlogs[b].length }
  );
};

const mostLikedBlogAndAuthor = (blogs) => {
  if (blogs.length === 0) return 0;

  const countedBlogs = _.groupBy(blogs, 'likes');
  const maxLiked = Math.max(...Object.keys(countedBlogs));
  return {
    author: countedBlogs[maxLiked][0].author,
    likes: countedBlogs[maxLiked][0].likes
  };
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikedBlogAndAuthor
};
