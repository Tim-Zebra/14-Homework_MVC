const router = require('express').Router();
const { Post, Comment, User } = require('../models/');

// The `/` endpoint

// get all posts for homepage
router.get('/', async (req, res) => {
  try {
    // Get all posts and comments
    const postData = await Post.findAll({
      include: [
        {
          model: Comment,
        },
      ],
    });

    // Gets data from posts
    const posts = postData.map((post) => post.get({ plain: true }));

    // Passes posts and session data into mustache
    res.render('all-posts', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single post
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
        },
      ],
    });

    // Gets data from single post
    const post = postData.get({ plain: true });

    // Passes post and session status to mustache
    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
