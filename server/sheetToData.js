const axios = require('axios')
const { forEach } = require('lodash')
var moment = require('moment')
const _ = require('lodash-contrib'); 
var moment = require('moment');

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
async function sheetToData(sheetId, sheetName, columnMapper){
    const {data} = await axios.get(sheetToSheetAPIUrl(sheetId, sheetName, 'AIzaSyC-AfHslgkSCaq7OkbD7sLiyv8RKhzUBNU'))
    const firstCol = data.values[0]
    const objArray = data.values
        .map(item => dataRowToDataObject(item,
            columnMapper || firstCol))
    return objArray.slice(1);
}

module.exports = {
    sheetToData,
}