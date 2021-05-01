const axios = require('axios');
const config = require("./config");

function sendNotification(req,res){


    var headers = {
        Authorization: "AccessKey"+ config.whatsAppAPIkey,
        "Content-Type":"application/json"
    }
    var Data = { "to":req.body.recepient,
        "from":config.whatsAppChannelId,
        "type":"text",
        "content":{ "text":req.body.text } }
    axios.post(config.messageEndpoint, Data, { headers: headers })
        .then((res) => res.send(res))
        .catch(err => res.send(err))

}



//default Template.
// HI {{1}}, {{2}} has a upgent requirement of {{3}}, Please confirm on {{4}} if you can provide the help needed. 
function sendMessageTemplate(req,res){
    //use this endpoint for template setting
    res.send("sworking free endpoint")
}

module.exports = {
    sendNotification,
    sendMessageTemplate
}