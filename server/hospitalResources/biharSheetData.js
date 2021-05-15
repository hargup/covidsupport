var moment = require('moment')
const _ = require('lodash-contrib'); 
const immer = require("immer");
const {sheetToData} = require("../sheetToData")

function itemToVerifiedAt(item) {
    const dateStr = `${item.Date || item["Date of verification"]} ${item["Time of verification"]} ${moment().year()} +05:30`;
    console.log(dateStr)
    return moment(
        dateStr
      ).toISOString();
}

async function biharBeds() {
    var data = await sheetToData('1foeKIDRi_U6VTsyv1s_Hi3-5dWbQfIBrARgjeQDgwaU', 'Hospital Beds',);
    data = data.filter(item => {return item.District})
    data = data.map(item => {return _.renameKeys(item, {"District": "city",
                                                 " No of Normal beds                   (Non O2-Non ICU)": "bedCount",
                                                 " No of O2 beds": "oxygenBeds",
                                                 " No of ICU beds": "icuCount",
                                                 "No of ventilators ": "ventilatorCount",
                                                 "Hospital Name": "hospital",
                                                 "Address": "address",
                                                 "Phone": "contactNumber"})})
                .map(item => {return {...item, resources: ["beds"],
                   verifiedAt: itemToVerifiedAt(item)}})
               
    return data
}

async function biharOxygen() {
    var data = await sheetToData('1foeKIDRi_U6VTsyv1s_Hi3-5dWbQfIBrARgjeQDgwaU', 'Oxygen Cylinders',);
    data = data.map(item => {return _.renameKeys(item, {"District": "city",
                                                 "Hospital Name": "hospital",
                                                 "Address": "address",
                                                 "Phone": "contactNumber",
                                                 "Type": "others"})})
                .map(item => {return {...item,
                    resources: "oxygen",
                    verifiedAt: itemToVerifiedAt(item)}})
    return data
}

module.exports = {
    biharBeds,
    // biharOxygen
}