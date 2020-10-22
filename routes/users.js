var express = require('express');
var router = express.Router();
const datauser = require('./../data/user');
const auth = require('../middleware/auth');

/* GET users listing. */
router.get('/', auth, async function(req, res, next) {
  res.json(await datauser.getAllUsers());
});

// creacion de usuario
router.post('/', async (req, res) => {
  res.json(await datauser.pushUser(req.body));
});

// login de usuario
router.post('/login', async (req, res) => {
  try {
      const user = await datauser.findByCredentials(req.body.email, req.body.password);

      // generar un token
      const token = await datauser.generateAuthToken(user);
      res.send({user, token});
  } catch (error) {
      res.status(401).send(error.message);
  }
});

module.exports = router;
