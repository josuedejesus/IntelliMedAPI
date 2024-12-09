const express = require('express');
const router = express.Router();

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const recordController = require('../controllers/RecordController');

router.post('/add-record', upload.single('file'), recordController.AddRecord);
router.post('/get-record', recordController.GetRecords);
router.post('/remove-record', recordController.RemoveRecord);


module.exports = router;