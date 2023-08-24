import express from 'express';
import db from '../index';

const router = express.Router();

// GET (index)
router.get('/', (req: express.Request, res: express.Response) => {
  try {
    res.status(200).send('Woohoo! You\'ve got a right answer!\nNext, I want you to create POST request.\nSame endpoint with different attributes: name and message.\nJust feel free to set any value for each parameter.\nIf you\'re stack, just call /help!');
  } catch (error) {
    res.status(400).send("Oh no... Another chance?");
  }
});

// GET (show)
router.get('/:id', (req: express.Request, res: express.Response) => {
  try {
    // Create a query for getting the data.
    const sql = 'SELECT * FROM users WHERE id = ?';
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
    })
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

      // Return the set of results.
      res.redirect('/' + result.insertId);
    })
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

      // Return the updated set of results.
      res.redirect('/' + result.insertId);
    })
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
      res.status(200).send(result);
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
