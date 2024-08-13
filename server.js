const express = require('express');
const studentRoutes = require('./src/student/routes');
const app = express();
const port = 3000;


app.use(express.json()); // for parsing application/json middleware

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.use('/api/v1/students', studentRoutes);

app.listen(port, () => {console.log(`Server is running on port ${port}`)});