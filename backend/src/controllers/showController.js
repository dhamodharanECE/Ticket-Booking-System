const Show = require('../models/Show');

exports.createShow = async (req, res) => {
  try {
    const { name, startTime, totalSeats } = req.body;
    const show = await Show.create({ name, startTime, totalSeats, bookedSeats: [] });
    res.status(201).json(show);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getShows = async (req, res) => {
  try {
    const shows = await Show.find().sort({ startTime: 1 });
    res.json(shows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getShowById = async (req, res) => {
  try {
    const show = await Show.findById(req.params.id);
    if (!show) return res.status(404).json({ message: 'Not found' });
    res.json(show);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};