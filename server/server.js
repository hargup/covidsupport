const express = require("express")
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const apicache = require('apicache')
const { getAllData } = require("./dataFetcher");
const { sheetToData } = require("./sheetToData")
const config = require("./config")
const {sendNotification,sendMessageTemplate} = require("./notification")
app.use(express.json())
app.use(cors())
app.options('*', cors())
app.use(morgan('tiny'))
let cache = apicache.middleware

const verifyAPIKey = (req, res, next)=>{
  if(config.apiKey == req.headers.authorization)
      next();
  else
    return res.status(403).json({
      status: 403,
      message: 'UNAUTHORIZED'
    })
}


app.get('/api/allData',cache('5 minutes'), async function(req, res) {
  const data = await getAllData();
  res.send(data);
  return;
})
app.post('/api/sendNotification', verifyAPIKey,sendNotification);
app.post('/api/sendMessageTemplate',verifyAPIKey,sendMessageTemplate);

app.get('/api/sheetData', async function(req, res) {
  const data = await sheetToData();
  res.send(data);
  return
})



// --------------  Start the APP -------------------
app.listen(5001)
console.log("Mobile Covid App search server started")