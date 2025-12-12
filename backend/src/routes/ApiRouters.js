const express = require('express');
const router = express.Router();
const showController = require('../controllers/showController');
const bookingController = require('../controllers/bookingController');

router.post('/admin/shows', showController.createShow);
router.get('/shows', showController.getShows);
router.get('/shows/:id', showController.getShowById);
router.post('/shows/book', bookingController.bookSeats);

module.exports = router;