/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import { IssueSchema } from './issue/model';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

const mongoUri = 'mongodb://localhost:27017/issue-tracker';
mongoose
  .connect(mongoUri)
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.error('Failed to connect mongodb', err));
app.use(cors());
app.use(express.json());

const Issue = mongoose.model('Issue', IssueSchema);

app.get('/api/issue-tracker', async (req, res, next) => {
  try {
    const issues = await Issue.find();
    res.json(issues)
  } catch (error) {
    res.status(500).json({ error, message: 'Failed to fetch issues.'});
  }
})

app.get('/api/issue-tracker/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(404).json({ message: 'Unable to find issuess'});
    }
    return issue;
  } catch (error) {
    res.status(500).json({ error, message: 'Failed to fetch issues.'});
  }
})

app.post('/api/issue-tracker', async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const newIssue = new Issue({ title, description })
    await newIssue.save();
    res.json(newIssue);
  } catch (error) {
    res.status(500).json({ error, message: 'Failed to create issues.'});
  }
});

app.delete('/api/issue-tracker/:id', async( req, res, next) => {
  try {

    const { id } = req.params;
    const deletedIssue = await Issue.findByIdAndDelete(id);
    if (!deletedIssue) {
      return res.status(404).json({ message: 'Issue not found'});
    }
    return deletedIssue
  } catch (error) {
    res.status(500).json({ error, message: 'Failed to delete issues.'});
  }
})

app.put('/api/issue-tracker/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
      const updatedIssue = await Issue.findByIdAndUpdate(id, { title, description }, { new: true });
      if (!updatedIssue) {
          return res.status(404).json({ message: 'Issue not found' });
      }
      res.json(updatedIssue);
  } catch (error) {
      res.status(500).json({ error, message: 'Failed to update issue' });
  }
    
  } catch (error) {
    res.status(500).json({ error, message: 'Failed to update issues.'});
  } 
})

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
