const router = require('express').Router();
const { createPost, getPosts, getPost, putPost, delPost } = require('../controllers/postsController');

router.post('/posts/create', createPost);
router.get('/posts/list', getPosts);
router.get('/posts/get_post/:id', getPost);
router.put('/update/post/:id', putPost);
router.delete('/delete/post/:id', delPost);

module.exports = router;