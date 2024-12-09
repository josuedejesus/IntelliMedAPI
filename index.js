const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

const UserRoutes = require('./routes/UserRoutes');
const ChatRoutes = require('./routes/ChatRoutes');
const RecordRoutes = require('./routes/RecordRoutes');

app.use('/user', UserRoutes);
app.use('/chat', ChatRoutes);
app.use('/record', RecordRoutes);

const port = 4000;

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://0.0.0.0:${port}`);
});


