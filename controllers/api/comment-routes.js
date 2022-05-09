const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

// The `/api/comment` endpoint

router.post('/', withAuth, async (req, res) => {
  console.log('\x1b[36m', '\n\n----------------This happended-------------------\n\n', req.body, '\x1b[37m');
  try {
    const newComment = await Comment.create({
      ...req.body,
      userId: req.session.userId,
    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
