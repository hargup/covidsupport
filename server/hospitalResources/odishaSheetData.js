var moment = require('moment')
const _ = require('lodash-contrib'); 
const immer = require("immer");
const {sheetToData} = require("../sheetToData")

function itemToVerifiedAt(item) {
    const dateStr = `${item["Date of verification"]} ${item["Time of verification"]} ${moment().year()} +05:30`;
    console.log(dateStr)
    return moment(
        dateStr
      ).toISOString();
}


async function odishaBeds() {
    var data = await sheetToData('1lHEdSqvduJKOk_mtkqNHrcjGr5-9vIkA7v6DXc3vUVA', 'Hospital Beds',);
    data = data.filter(item => {return item.District})
    data = data.map(item => {return _.renameKeys(item, {"District": "city",
                                                        "No of Normal beds                   (Non O2-Non ICU)": "bedCount",
                                                        "No of O2 (Oxygen)  beds": "oxygenBeds",
                                                        "No of ICU beds": "icuCount",
                                                        "No of ventilators ": "ventilatorCount",
                                                        "Hospital Name": "hospital",
                                                        "Address": "address",
                                                        "Primary Number": "contactNumber"})})
                                                    .map(item => {return {...item, resources: ["beds"],
                                                    verifiedAt: itemToVerifiedAt(item)}})
    return data
}

async function odishaOxygen() {
    var data = await sheetToData('1lHEdSqvduJKOk_mtkqNHrcjGr5-9vIkA7v6DXc3vUVA', 'Oxygen Cylinders',);
    data = data.map(item => {return _.renameKeys(item, {"District": "city",
                                                 "Hospital Name": "hospital",
                                                 "Address": "address",
                                                 "Primary Number": "contactNumber",
                                                 "Type": "others"})})
                .map(item => {return {...item,
                    resources: "oxygen",
                    verifiedAt: itemToVerifiedAt(item)}})
    return data
}

module.exports = {
    odishaBeds,
    odishaOxygen
}