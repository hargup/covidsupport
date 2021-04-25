const express = require("express")
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const apicache = require('apicache')
const { getAllData } = require("./dataFetcher");

app.use(express.json())
app.use(cors())
app.options('*', cors())
app.use(morgan('tiny'))
let cache = apicache.middleware

app.get('/api/allData',cache('5 minutes'), async function(req, res) {
  const data = await getAllData();
  res.send(data);
  return;
})


// --------------  Start the APP -------------------
app.listen(5001)
console.log("Mobile Covid App search server started")