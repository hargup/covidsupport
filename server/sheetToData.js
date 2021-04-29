const axios = require('axios')
const { forEach } = require('lodash')
var moment = require('moment')
const _ = require('lodash-contrib'); 

function sheetToSheetAPIUrl(sheetId, sheetName, apiKey){
    return `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`
}

// Example usage
// > dataRowToDataObject(        [
//     ...             "",
//     ...             "Andra Pradesh",
//     ...             "AUROBINDO DRUGS",
//     ...             "D.NO:8-72, BLOCK-IIPRASAD PLAZA,KAMAIAHTHOPU CENTER,M.G.\nROADVIJAYAWADA,VIJAYAWADA,520007",
//     ...             "aurobindodrugs@gmail.com",
//     ...             "0866-3202242"
//     ...         ], ["", "state", "name", "address", "email", "contactNumber"])
function dataRowToDataObject(item, columnMapper) {
    var newObj = {}
    for (var i = 0; i< columnMapper.length; i++) {
        newObj[columnMapper[i]] = item[i];
    }
    return newObj
}

// sheet id: 1J-m84rr-tV47wZrUKn41jlTTID5FNcMs5MwyYHt9fLU
// sheet number: Sheet1
async function sheetToData(sheetUrl, sheetName, columnMapper){
    // 
    // 
    // const {data} = axios.get(sheetToSheetAPIUrl("1J-m84rr-tV47wZrUKn41jlTTID5FNcMs5MwyYHt9fLU", "Sheet1"))
    const {data} = await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/1J-m84rr-tV47wZrUKn41jlTTID5FNcMs5MwyYHt9fLU/values/Sheet1?key=AIzaSyC-AfHslgkSCaq7OkbD7sLiyv8RKhzUBNU`)
    const objArray = data.values.map(item => dataRowToDataObject(item, ["", "state", "name", "address", "email", "contactNumber"]))
    return objArray.slice(2);
}

module.exports = {
    sheetToData,
}