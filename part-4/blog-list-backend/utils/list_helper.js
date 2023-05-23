const dummy = (array) => {
  return 1;
};

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

module.exports = { dummy, totalLikes, favoriteBlog };
