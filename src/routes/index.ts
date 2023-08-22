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
    // Get data from DB.
    const sql = 'SELECT * FROM users WHERE id = ?';
    const query = db.format(sql, [req.params.id]);

    db.query(query, (error, result) => {
      if (error) {
        res.status(400).send('Error: ' + error.message);
      } else {
        // If there is no data, return message.
        if (result.length === 0) {
          res.status(404).send('No data for this id');
        }
        // Return the set of results.
        res.status(200).send(result);
      }
    })
  } catch (error) {
    res.status(400).send("Oh no... Another chance?");
  }
});

// POST
router.post('/', (req: express.Request, res: express.Response) => {
  try {
    // Insert a new record.
    const sql = 'INSERT INTO users (name, comment) VALUES (?, ?)';
    const query = db.format(sql, [req.body.name, req.body.comment]);

    db.query(query, (error, result) => {
      if (error) {
        res.status(400).send('Error: ' + error.message);
      }
      // TODO: Return value
      // Return the set of results.
      res.status(200).send(result);
    })
  } catch (error) {
    res.status(400).send("Oh no... Something went wrong...");
  }
});

// PUT
router.put('/:id', (req: express.Request, res: express.Response) => {
  try {
    // Update the record.
    const sql = 'UPDATE users SET name = ?, comment = ? WHERE id = ?';
    const query = db.format(sql, [req.body.name, req.body.comment, req.params.id]);

    db.query(query, (error, result) => {
      if (error) {
        res.status(400).send('Error: ' + error.message);
      }
      // TODO: Return value
      // Return the updated set of results.
      res.status(200).send(result);
    })
  } catch (error) {
    res.status(400).send("Oh no... Something went wrong...");
  }
});

// HELP
router.get('/help', (req: express.Request, res: express.Response) => {
  try {
    res.status(200).send('Don\'t forget the format of curl command!\nIt\'s "curl -X [method] [endpoint] -d [attributes]"');
  } catch (error) {
    res.status(400).send("Oh no... Something went wrong...");
  }
})

export default router;
