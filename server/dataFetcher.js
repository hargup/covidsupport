const axios = require('axios')
const { forEach } = require('lodash')
var moment = require('moment')
const _ = require('lodash-contrib');
const { delhiFacilitiesData } = require("./source_helpers/delhiFacilitiesData");
const { delhiCovidHospitals,
    AndhraCovidHospitals,
    tnaduCovidHospitals,
    beedCovidHospitals,
    amdCovidHospitals,
    gandhinagarCovidHospitals,
    puneCovidHospitals,
    nashikCovidHospitals,
    barodaCovidHospitals,
    bengaluruCovidHospitals,
    chattisgarhCovidHospitals,
    madhyaPradeshCovidHospitals,
    nagpurCovidHospitals,
    bengalCovidHospitals,
    telanganaCovidHospitals,
    covidresourcesIn } = require("./hospitalResources/genericSourceFetcher");
const { upBeds, upOxygen } = require("./hospitalResources/upSheetData")
const { odishaBeds } = require("./hospitalResources/odishaSheetData")
const { biharBeds, biharOxygen } = require("./hospitalResources/biharSheetData")
const { noidaCovidHospitals, umeedLifeDataFetcher, delhiHospitalData } = require("./hospitalResources/otherHospitalResources")
const { sheetToData } = require("./sheetToData")


const hospitalSampleData = {
    "hospital": "Prakash Hospital, Sangli",
    "city": "Pune",
    "verifiedAt": "2021-04-24T07:09:54.704Z",
    "others": "",
    "bedCount": "300-400",
    "id": "a0982603-e4f3-4839-8a76-ad573a13ccc9",
    "email": "",
    "contactPerson": "",
    "state": "Maharashtra",
    "resources": ["beds"],
    "source": "https://umeed.live"
}


async function sheetToNormalizedData() {
    var data = await sheetToData();
    data = data.map(item => { return { ...item, city: item.state, resources: ["remdesivir"] } })
    return data;
}
// {
// 	"0": {
// 		"id": 5,
// 		"name": "Jaypee Hospital",
// 		"normal": "0",
// 		"oxygen": "178",
// 		"ventilator": "90",
// 		"Vacant_ventilator": "0",
// 		"Vacant_oxygen": "0",
// 		"Vacant_normal": "0",
// 		"address": "Jaypee Hospital Rd, Goberdhanpur, Sector 128, Noida, Uttar Pradesh 201304",
// 		"phone_number": "1204122222",
// 		"location_url": "https://www.google.com/maps/place/Jaypee+Hospital+-+Multispeciality+Hospital+in+Noida/@28.5154426,77.3692531,17z/data=!3m1!4b1!4m5!3m4!1s0x390ce66a55555555:0xecd13afcb2e7cb44!8m2!3d28.5154379!4d77.3714472",
// 		"published_at": "2021-04-24T05:35:19.884Z",
// 		"created_at": "2021-04-24T03:04:57.591Z",
// 		"updated_at": "2021-04-30T07:35:04.594Z"
// 	}
// }


// ============== Post Processors ===========================

function bedsToOtherResources(bedsData) {
    if (bedsData && bedsData.resources && bedsData.resources.includes("beds")) {
        const hasOxygen = bedsData.oxygenBeds && bedsData.oxygenBeds !== "0" && bedsData.oxygenBeds !== 0;
        const hasVentilators = bedsData.ventilatorCount && bedsData.ventilatorCount !== "0" && bedsData.ventilatorCount !== 0;
        const hasIcu = bedsData.ventilatorCount && bedsData.icuCount !== "0" && bedsData.icuCount !== 0;
        var resources = ["beds"]
        if (hasOxygen) {
            resources.push("oxygen")
        }
        if (hasVentilators) {
            resources.push("ventilator")
        }
        if (hasIcu) {
            resources.push("icu")
        }
        return { ...bedsData, resources }
    } else {
        return bedsData
    }

}

const delhiAlternatives = ["dehi", "new delhi", "delhi", "delhi ncr", "delhi ", "delhi manesar", "old delhi", " delhi ncr ", "chattarpur delhi", "chattarpur", "120 km from delhi, behror"]

function normalizeCityNames(city) {
    if (!city)
        return "";
    if (delhiAlternatives.includes(city.toLowerCase())) {
        return "delhi"
    } else {
        return city.toLowerCase()
    }
}




// ============== Data collator =============================

const dataFetchers = [
    { source: "http://umeed.live", fetcherFn: umeedLifeDataFetcher },
    { source: "https://covidnashik.com", fetcherFn: nashikCovidHospitals },
    { source: "https://covidpune.com", fetcherFn: puneCovidHospitals },
    { source: "https://covidgandhinagar.com", fetcherFn: gandhinagarCovidHospitals },
    { source: "https://covidamd.com", fetcherFn: amdCovidHospitals },
    { source: "https://covidbeed.com", fetcherFn: beedCovidHospitals },
    { source: "https://coronabeds.jantasamvad.org", fetcherFn: delhiHospitalData },
    { source: "https://covidtnadu.com", fetcherFn: tnaduCovidHospitals },
    //enable after duplication fixes // {source: "https://coviddelhi.com", fetcherFn: delhiCovidHospitals},
    { source: "https://covidaps.com", fetcherFn: AndhraCovidHospitals },
    { source: "https://covidbaroda.com", fetcherFn: barodaCovidHospitals },
    { source: "https://covidbengaluru.com", fetcherFn: bengaluruCovidHospitals },
    { source: "https://covidcgh.com", fetcherFn: chattisgarhCovidHospitals },
    { source: "https://covidmp.com", fetcherFn: madhyaPradeshCovidHospitals },
    { source: "https://covidwb.com", fetcherFn: bengalCovidHospitals },
    { source: "https://covidtelangana.com", fetcherFn: telanganaCovidHospitals },
    { source: "https://gbncovidtracker.in/", fetcherFn: noidaCovidHospitals },
    {
        source: "https://docs.google.com/spreadsheets/d/1foeKIDRi_U6VTsyv1s_Hi3-5dWbQfIBrARgjeQDgwaU/edit#gid=0",
        fetcherFn: biharBeds
    },
    //  {source: "https://docs.google.com/spreadsheets/d/1foeKIDRi_U6VTsyv1s_Hi3-5dWbQfIBrARgjeQDgwaU/edit#gid=0",
    //  fetcherFn: biharOxygen}
    {
        source: "https://docs.google.com/spreadsheets/d/1lHEdSqvduJKOk_mtkqNHrcjGr5-9vIkA7v6DXc3vUVA/edit#gid=0",
        fetcherFn: odishaBeds
    },
    {
        source: "https://docs.google.com/spreadsheets/d/1l3EYw6r0MlekbJAng1jxmSeDerkFdyF5EIjl1rjgyv4/edit#gid=0",
        fetcherFn: upBeds
    },
    {
        source: "https://docs.google.com/spreadsheets/d/1l3EYw6r0MlekbJAng1jxmSeDerkFdyF5EIjl1rjgyv4/edit#gid=1294747892",
        fetcherFn: upOxygen
    },


    //Source removed {source:"https://covidresource.in", fetcherFn: covidresourcesIn}
]

async function getAllData() {
    var data = [];
    for (var i = 0; i < dataFetchers.length; i++) {
        const { source, fetcherFn } = dataFetchers[i];
        const newData = await fetcherFn()
        data = data.concat(newData.map(item => { return { ...item, source, city: normalizeCityNames(item.city) } }))
        data = data.map(item => bedsToOtherResources(item))
    }
    return data;
}

module.exports = {
    umeedLifeDataFetcher,
    getAllData
}