const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const supertest = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const api = supertest(app);

const Blog = require('../models/blog');
const helper = require('../tests/test_helper');
const User = require('../models/user');
let token;

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe('when only one user is in DB', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('secret', 10);

    const user = new User({
      username: 'Steve',
      passwordHash
    });

    await user.save();

    const userForToken = {
      username: user.username,
      id: user.id
    };

    token = jwt.sign(userForToken, process.env.SECRET);

    await Blog.deleteMany({});
    const blogs = helper.initialBlogs.map(
      (blog) => new Blog({ ...blog, user: user.id })
    );
    await Blog.insertMany(blogs);
  });

  test('when username missing', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      password: 'newPassword'
    };

    await api.post('/api/users').send(newUser).expect(400);

    const usersAtEnd = await helper.usersInDb();

    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('fails cause username is already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'Steve',
      name: 'Stevan',
      password: '123'
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('expected `username` to be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

describe('when there are some initial blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('the first blog is about react', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].title).toBe('React patterns');
  });
});

describe('adding a blogs', () => {
  test('when blog is not valid', async () => {
    const newBlog = {
      author: 'Some name'
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(400);

    const notesAtTheEnd = await helper.blogsInDb();

    expect(notesAtTheEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('Can add a valid blog', async () => {
    const newBlog = {
      author: 'zika',
      title: 'zikina beseda',
      url: 'zikabesedi.com',
      likes: 1786
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtTheEnd = await helper.blogsInDb();
    const contentOfBlogs = blogsAtTheEnd.map((blog) => blog.title);

    expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length + 1);
    expect(contentOfBlogs).toContain('zikina beseda');
  });

  test('likes are missing', async () => {
    const newBlog = {
      author: 'pera',
      title: 'perina beseda',
      url: 'perabesedi.com'
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /application\/json/);

    const blogsAtTheEnd = await helper.blogsInDb();
    const savedBlog = blogsAtTheEnd.find(
      (blog) => blog.title === newBlog.title
    );

    expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length + 1);
    expect(savedBlog.likes).toBe(0);
  });

  test('title or url missing', async () => {
    const newBlog = {
      author: 'ogi',
      url: 'ogibesedi.com',
      likes: 33
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(400);

    const blogsAtTheEnd = await helper.blogsInDb();

    expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('blog to have id property', async () => {
    const response = await api.get('/api/blogs');

    return response.body.every((blog) => expect(blog.id).toBeDefined());
  });

  test('when token is bad', async () => {
    const newBlog = {
      title: 'full stack',
      author: 'ogi',
      url: 'ogibesedi.com',
      likes: 33
    };

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer bedToken`);

    console.log('RESPONSE', response);

    expect(response.status).toBe(401);
  });
});

describe('deletion of a blog', () => {
  test('could delete a blog', async () => {
    const newBlog = {
      title: 'Full Stack',
      author: 'StackMaster',
      url: 'https://stack.com/',
      likes: 1
    };

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`);

    await api
      .delete(`/api/blogs/${result.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);
  });
});

describe('update blog', () => {
  test('can update valid blog', async () => {
    const newBlog = {
      title: 'Full Stack',
      author: 'StackMaster',
      url: 'https://stack.com/',
      likes: 1
    };

    const response = await api
      .post('/api/blogs/')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`);

    newBlog.likes += 1;

    await api
      .put(`/api/blogs/${response.body.id}`)
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const newResult = await api.get(`/api/blogs/${response.body.id}`);
    expect(newResult.body.likes).toBe(newBlog.likes);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
