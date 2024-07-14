const express = require('express');
const router = express.Router();
const {getHomePage,
     addUserPage,
      addUser,
      editUserPage,
      updateUser,
      deleteUser,
      loginUser,
      getProduct,
      getNews,
      logins,
      logoutUser,
      loginAdmin,
      loginsAdmin,
      admin} = require('../controllers/homeController');

router.get('/', getHomePage);
router.get('/add_user', addUserPage);
router.post('/add_user', addUser);
router.get('/edit_user/:id', editUserPage);
router.post('/update_user/:id', updateUser);
router.get('/delete_user/:id', deleteUser);
router.get('/badminton', getProduct);
router.get('/login', loginUser);
router.post('/login', logins);
router.get('/logout', logoutUser);
router.get('/news', getNews);
router.get('/login-admin', loginAdmin);
router.post('/login-admin', loginsAdmin);
router.get('/admin', admin)

module.exports = router;
