var moment = require('moment')
const _ = require('lodash-contrib');
const immer = require("immer");
const { sheetToData } = require("../sheetToData")

function itemToVerifiedAt(item) {
    const dateStr = `${item["Date of Verification"]} ${item["Time of Verification"]} ${moment().year()} +05:30`;
    console.log(dateStr)
    return moment(
        dateStr
    ).toISOString();
}


async function upBeds() {
    var data = await sheetToData('1l3EYw6r0MlekbJAng1jxmSeDerkFdyF5EIjl1rjgyv4', 'Hospital Beds',);
    data = data.filter(item => { return item.District })
    data = data.map(item => {
        return _.renameKeys(item, {
            "District": "city",
            "No of Normal beds                   (Non O2-Non ICU)": "bedCount",
            "No of O2 (Oxygen)  beds": "oxygenBeds",
            "No of ICU beds": "icuCount",
            "No of ventilators ": "ventilatorCount",
            "Hospital Name": "hospital",
            "Address": "address",
            "Primary Number": "contactNumber"
        })
    })
        .map(item => {
            return {
                ...item, resources: ["beds"],
                verifiedAt: itemToVerifiedAt(item)
            }
        })
    return data
}

async function upOxygen() {
    var data = await sheetToData('1l3EYw6r0MlekbJAng1jxmSeDerkFdyF5EIjl1rjgyv4', 'Oxygen',);
    data = data.map(item => {
        return _.renameKeys(item, {
            "District": "city",
            "Hospital Name": "hospital",
            "Address": "address",
            "Primary Number": "contactNumber",
            "Type": "others"
        })
    })
        .map(item => {
            return {
                ...item,
                resources: "oxygen",
                verifiedAt: itemToVerifiedAt(item)
            }
        })
    return data
}

module.exports = {
    upBeds,
    upOxygen
}
