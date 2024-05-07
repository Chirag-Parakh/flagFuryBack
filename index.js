const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors'); 
app.use(bodyParser.json());
app.use(cors());
const {Account , Teams} = require('./db.js')
const JWT_SECRET = require("./config.js");

app.get('/', (req, res) => {
    res.send("this is index.js page");
})

app.post('/login', async (req, res) => {

    const { username, password } = req.body;

    try {
        const userExist = await Account.findOne({ username });
        if (!userExist) {
            return res.status(404).json({ "message": "User doesn't exist" });
        }
        if ((userExist.password !== password)) {
            return res.status(401).json({ "message": "Incorrect password" });
        }
        const token = jwt.sign({ username }, JWT_SECRET);
        return res.json({ message: "Signin successful",  token: `Bearer ${token}` });
    } catch (error) {
        console.error("Error in signin:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
})

app.post('/test', async (req, res) => {
    const { level } = req.body;
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({ message: 'Log in first' });
    }
    const token = authorizationHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const teamName = decoded.username;
      const team = await Teams.findOneAndUpdate(
        { TeamName: teamName },
        { levelReached: level },
        { new: true, upsert: true }
      );
      return res.json({ message: `Level ${level} completed. Reached level: ${team.levelReached +1}` });
    } catch (error) {
      console.error('Error updating level:', error);
      return res.status(401).json({ message: 'Unauthorized' });
    }
  });

  app.get('/current-level', async (req, res) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json({ message: 'Log in first' });
      }
      const token = authorizationHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const teamName = decoded.username;
      const team = await Teams.findOne({ TeamName: teamName });
      const currentLevel = team ? team.levelReached : 0; 
      return res.json({ level: currentLevel });
    } catch (error) {
      console.error('Error fetching current level:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.get('/leaderboard', async (req, res) => {
    try {
      const leaderboard = await Teams.find().sort({ levelReached: -1 , updatedAt: 1 });
      res.json(leaderboard);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

app.listen(3000)