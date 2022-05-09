const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// The `/api/post` endpoint

router.post('/', withAuth, async (req, res) => {
  const body = req.body;

  try {
  const newPost = await Post.create({ ...body, /*userId: req.session.userId*/ });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
console.log('\x1b[36m', '\n\n----------------This happended-------------------\n\n', req.params.id, '\x1b[37m');
  try {
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }

});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Post.destroy({
      where: {
        id: req.params.id,
        // user_id: req.session.user_id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
