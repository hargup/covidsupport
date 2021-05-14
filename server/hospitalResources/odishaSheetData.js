var moment = require('moment')
const _ = require('lodash-contrib'); 
const immer = require("immer");
const {sheetToData} = require("../sheetToData")

// TODO: Do not consider the empty rows
// Remove the enteries without city

function itemToVerifiedAt(item) {
    const dateStr = `${item.Date} ${item.Time} ${moment().year()} +05:30`;
    console.log(dateStr)
    return moment(
        dateStr
      ).toISOString();
}

function normalizeOdishaData(item)
{
    const normalizedData = immer.produce(item, (draftItem) =>{

        var resources = [];
        if (draftItem.Product === "Hospital Beds") {
          resources.push("beds");
          draftItem.bedCount = draftItem["No of beds "];
        }
        if (
          draftItem["Type (Normal/ICU/O2/All)"] === "O2" ||
          draftItem["Type (Normal/ICU/O2/All)"] === "Oxygen"
        ) {
          resources.push("oxygen");
          draftItem.oxygenBeds = draftItem["No of beds "];
        }
        if (draftItem["Type (Normal/ICU/O2/All)"] === "ICU") {
          resources.push("icu");
          draftItem.icuCount = draftItem["No of beds "];
        }
        draftItem.resources = resources;
        draftItem.verifiedAt = itemToVerifiedAt(draftItem);
        draftItem.contactNumber = []
        if(draftItem["Secondary Number"]) {draftItem.contactNumber.push(draftItem["Secondary Number"])}
        if(draftItem["Primary Number"]) {draftItem.contactNumber.push(draftItem["Primary Number"])}


    })
    return normalizedData;
}

async function odishaBeds() {
    var data = await sheetToData('1lHEdSqvduJKOk_mtkqNHrcjGr5-9vIkA7v6DXc3vUVA', 'Hospital Beds',);
    data = data.filter(item => {return item.District})
    data = data.map(item => {return _.renameKeys(item, {"District": "city",
                                                 "Hospital Name": "hospital",
                                                 "Address": "address"})})
                    .map(item => {return normalizeOdishaData(item)})
    return data
}


module.exports = {
    odishaBeds
}