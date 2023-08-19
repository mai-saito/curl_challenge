import express from 'express';

const router = express.Router();

// GET
router.get('/', (req: express.Request, res: express.Response) => {
  try {
    res.status(200).send('Woohoo! You\'ve got a right answer!\nNext, I want you to create POST request.\nSame endpoint with different attributes: name and message.\nJust feel free to set any value for each parameter.\nIf you\'re stack, just call /help!');
  } catch (error) {
    res.status(400).send("Oh no... Another chance?");
  }
});

// POST
router.post('/', (req: express.Request, res: express.Response) => {
  try {
    res.status(200).send('Again, you made it!\nLet\'s update the data you have just created!\nYou will make a PUT request with this. Same attributes!');
  } catch (error) {
    res.status(400).send("Oh no... Another chance?");
  }
});

// HELP
router.get('/help', (req: express.Request, res: express.Response) => {
  try {
    res.status(200).send('Don\'t forget the format of curl command!\nIt\'s "curl -X [method] [endpoint] -d [attributes]"');
  } catch (error) {
    res.status(400).send("Oh no... Another chance?");
  }
})

export default router;
