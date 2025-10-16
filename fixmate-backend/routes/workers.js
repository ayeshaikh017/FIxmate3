const express = require('express');
const router = express.Router();
const { workerOnly } = require('../middleware/auth');

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Get workers', data: [] });
});

router.get('/:id', (req, res) => {
  res.json({ success: true, message: 'Get worker by ID' });
});

router.put('/profile', workerOnly, (req, res) => {
  res.json({ success: true, message: 'Update worker profile' });
});

module.exports = router;
