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

function normalizeBiharData(item)
{
    // console.log("Inside normalizeBiharData")
    // console.log(item)
    // console.log(`type: ${item["Type (Normal/ICU/O2/All)"]}`)
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

async function biharBeds() {
    var data = await sheetToData('1foeKIDRi_U6VTsyv1s_Hi3-5dWbQfIBrARgjeQDgwaU', 'Hospital Beds',);
    data = data.filter(item => {return item.District})
    data = data.map(item => {return _.renameKeys(item, {"District": "city",
                                                 "Hospital Name": "hospital",
                                                 "Address": "address"})})
                    .map(item => {return normalizeBiharData(item)})
               
    // const x = normalizeBiharData(data[3])
    // console.log(x)
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