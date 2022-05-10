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
          model: User,
          attributes: ['username'],
        },
      ]
    });

    // Gets data from posts
    const posts = postData.map((post) => post.get({ plain: true }));

    // Passes posts and session data into mustache
    res.render('all-posts', { 
      layout: 'main',
      posts, 
      logged_in: req.session.loggedIn 
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
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['body'],
        },
      ],
    });
    // Gets data from single post
    const post = postData.get({ plain: true });
    console.log('\x1b[36m', '\n\n----------------Home routes single ID happended-------------------\n\n', postData.Comments, '\x1b[37m');
    // Passes post and session status to mustache
    res.render('single-post', {
      ...post,
      logged_in: req.session.loggedIn
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
