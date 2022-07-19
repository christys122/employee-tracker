const express = require('express');
const db = require('./db/connection');
const cTable = require('console.table');
const apiRoutes = require('./apiRoutes')

const PORT = process.env.PORT || 3004;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', apiRoutes);

//catch all
app.use((req, res) => {
  res.status(404).end();
});

//port info
db.connect(err => {
  if (err) throw err;
  console.log('db connected');

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});