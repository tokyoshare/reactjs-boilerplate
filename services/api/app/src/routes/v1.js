
const express = require('express');

const UserRoutes = require('./v1/UserRoutes');
//const ReviewRoutes = require('./v1/ReviewRoutes');

const router = express.Router();

router.use('/users', UserRoutes);
//router.use('/reviewers', ReviewRoutes);

router.get('/', (req, res) => {
  res.json({ status: 'success', message: 'Parcel Pending API', data: { version_number: 'v1.0.0' } });
});

module.exports = router;
