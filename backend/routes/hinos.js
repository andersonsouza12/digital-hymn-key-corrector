const express = require('express');
const router = express.Router();
const hinoController = require('../controllers/hinoController');

router.get('/', hinoController.getHinos);
router.post('/responder', hinoController.postResposta);

module.exports = router;
