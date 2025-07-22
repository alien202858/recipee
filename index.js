const express = require('express');
const mongoose = require('mongoose');
const app = express()
const cors = require('cors');
const port = process.env.PORT || 3000;

main().catch(err => console.log(err));



app.use(express.json());
app.use(cors());

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
}

app.get('/', (req, res) => {
  res.send('Veggify Recipe App Server is running!')
})

main().then(()=> console.log("CONNECTED")).catch(err=>console.log(err));

const ItemRoutes = require("./src/routes/itemRoute");
const CategoryRoutes = require("./src/routes/categoryRoute");

app.use('/api', ItemRoutes);
app.use('/api', CategoryRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
