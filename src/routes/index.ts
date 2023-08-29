import express from 'express';
import db from '../index';
import { exec } from 'child_process';

const router = express.Router();

// GET (index)
router.get('/', (req: express.Request, res: express.Response) => {
  try {
    exec('open http://localhost:3001/comments', (error, result, stderr) => {
      if (error) {
        res.status(400).write('Error: ' + error.message);
      }

      if (stderr) {
        res.status(400).write('Error: ' + stderr);
      }
      res.status(200).write(result);
    });
  } catch (error) {
    res.status(400).send("Oh no... Another chance?");
  }
});

// GET (list)
router.get('/comments', (req: express.Request, res: express.Response) => {
  try {
    // Create a query for getting the data.
    const sql = 'SELECT * FROM users ORDER BY id DESC';
    const query = db.format(sql, [req.params.id]);

    // Get the record.
    db.query(query, (error, result) => {
      if (error) {
        res.status(400).send('Error: ' + error.message);
      } else {
        // If there is no data, return message.
        if (result.length === 0) {
          res.status(404).send('No data for this id');
        }
        // Return the set of results.
        return res.status(200).send(result);
      }
    });
  } catch (error) {
    res.status(400).send("Oh no... Another chance?");
  }
});

// POST
router.post('/', (req: express.Request, res: express.Response) => {
  try {
    // Create a query for inserting a new set of data.
    const sql = 'INSERT INTO users (name, comment) VALUES (?, ?)';
    const query = db.format(sql, [req.body.name, req.body.comment]);

    // Insert a new record of data.
    db.query(query, (error, result) => {
      if (error) {
        res.status(400).send('Error: ' + error.message);
      }

      // Response.
      res.status(200).send("Woohoo! Success! Why don't you reload your browser?");
    });
  } catch (error) {
    res.status(400).send("Oh no... Something went wrong...");
  }
});

// PUT
router.put('/:id', (req: express.Request, res: express.Response) => {
  try {
    // Create a query for updating the data.
    const sql = 'UPDATE users SET name = ?, comment = ? WHERE id = ?';
    const query = db.format(sql, [req.body.name, req.body.comment, req.params.id]);

    // Update the selected record of data.
    db.query(query, (error, result) => {
      if (error) {
        res.status(400).send('Error: ' + error.message);
      }

      // Response.
      res.status(200).send("Woohoo! Updated! Please refresh and check your browser!");
    });
  } catch (error) {
    res.status(400).send("Oh no... Something went wrong...");
  }
});

// DELETE
router.delete('/:id', (req: express.Request, res: express.Response) => {
  try {
    // Create a query for deleting the data.
    const sql = 'DELETE FROM users WHERE id = ?';
    const query = db.format(sql, [req.params.id]);

    // Delete the selected record of data.
    db.query(query, (error, result) => {
      if (error) {
        res.status(400).send('Error: ' + error);
      }

      // Response.
      res.status(200).send("Yes, you got it all correct! Please refresh and check your browser!");
    })
  } catch (error) {
    res.status(400).send("Oh no... Something went wrong...");
  }
})

// HELP
router.get('/help', (req: express.Request, res: express.Response) => {
  try {
    res.status(200).send('Don\'t forget the format of curl command!\nIt\'s "curl -X [method] [endpoint] -d [attributes]"');
  } catch (error) {
    res.status(400).send("Oh no... Something went wrong...");
  }
})

export default router;
