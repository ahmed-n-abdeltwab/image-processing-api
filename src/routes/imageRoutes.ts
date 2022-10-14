import express from 'express';

const router = express.Router();

// import the controllers
import getUpdatedImage from '../controllers/imageController';

// route the controllers
router.route('/').get(getUpdatedImage);

export default router;
