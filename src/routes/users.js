const express = require('express');
const UserRepo = require('../repos/user-repo');

const router = express.Router();

router.get('/users', async (req, res) => {
  // Run a query to get all users
  const users = await UserRepo.find();

  // Send the result back to the person
  // who made this request
  res.send(users);
});

router.get('/users/one', async (req, res) => {
  const { email } = req.body;

  const user = await UserRepo.findByEmail(email);

  if (user) {
    res.send(user);
  } else {
    res.sendStatus(404);
  }
});

router.post('/users', async (req, res) => {
  const { username, bio, age, email } = req.body;
  

  const userExist = await UserRepo.findByEmail(email);
  if (userExist) return res.status(400).json('user already exist')
  
  const user = await UserRepo.insert(username, bio, age, email);

  res.send(user);
});

router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, bio } = req.body;

  const user = await UserRepo.update(id, username, bio);

  if (user) {
    res.send(user);
  } else {
    res.sendStatus(404);
  }
});

router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  const user = await UserRepo.delete(id);

  if (user) {
    res.send(user);
  } else {
    res.sendStatus(404);
  }
});

router.get("/users/email", async (req, res) => {
 
  try {
    const existingUser = await UserRepo.findOne()
  if (existingUser) {
    res.send(existingUser)
  } else {
   
    res.send('not found')
  }
  } catch (error) {
    console.log(error)
  }
  
  
})
module.exports = router;
