const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const recipesRouter = require('./routes/recipes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/recipes', recipesRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
