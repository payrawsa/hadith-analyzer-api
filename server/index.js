const express = require("express");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path")

const hadithRawiPath = path.join(__dirname, "../data/all_rawis.csv")
const hadithPath = path.join(__dirname, "../data/all_hadiths_clean.csv")

const hadithPathResults = []; 
const hadithRawiPathResults = []; 

//read hadith files

fs.createReadStream(hadithPath)
.pipe(csv())
.on('data', (data)=>hadithPathResults.push(data))

fs.createReadStream(hadithRawiPath)
  .pipe(csv())
  .on('data', (data) => hadithRawiPathResults.push(data));

//set port and express app

const PORT = process.env.PORT || 3001;

const app = express();

//api endpoints

app.get("/hadith", (req, res) => {
  res.json(hadithPathResults);
  });

app.get("/rawis", (req,res)=>{
    res.json(hadithRawiPathResults);
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});