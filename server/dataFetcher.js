const axios = require('axios')
const { forEach } = require('lodash')
var moment = require('moment')
const _ = require('lodash-contrib'); 
const { delhiFacilitiesData } = require("./delhiFacilitiesData");
const {delhiCovidHospitals,
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
    telanganaCovidHospitals} =  require("./genericSourceFetcher");
// moment.tz.setDefault("Asia/Kolkata");
// TODO: Ensure that the city names are given correctly in the data


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

async function umeedLifeDataFetcher() {
    const {data: plasmaDataRaw} = await axios.get("http://13.232.206.34:5000/api/v1/plasma/fetchRandomPlasmaDonorDetails")
    const plasmaData = plasmaDataRaw.data.map(d => {return {...d, resources: ["plasma"]}})

    const {data: oxygenDataRaw} = await axios.get("http://13.232.206.34:5000/api/v1/oxygen/fetchRandomOxygenDetails")
    const oxygenData = oxygenDataRaw.data.map(d => {return {...d, resources: ["oxygen"]}})

    const {data: bedsDataRaw} = await axios.get("http://13.232.206.34:5000/api/v1/beds/fetchRandomBedDetails")
    const bedsData = bedsDataRaw.data.map(d => {return {...d, resources: ["beds"]}})

    const {data: medicineDataRaw} = await axios.get("http://13.232.206.34:5000/api/v1/medicine/fetchRandomMedicineDetails")
    const medicineData = medicineDataRaw.data.map(d => {return {...d, resources: d["medicineName"].toLowerCase()}})

    const data = [].concat(plasmaData, oxygenData, bedsData, medicineData)

    return data;
}

function delhiTsToISO(delhiTs){
    // NOTE: THe year is hardcoded here
    try{
        return moment(`${delhiTs} ${moment().year()}`).utcOffset("+05:30").toISOString()

    } catch {
        return null;
    }

}

function hostpitalToHospitalData(facilitiesData, bedsData, hospital){
    const sample = {
        "hospital": "Prakash Hospital, Sangli",
        "city": "Pune",
        "verifiedAt": "2021-04-24T07:09:54.704Z",
        "contactNumber": "8668606730, 8983346714",
        "others": "",
        "bedCount": "300-400",
        "id": "a0982603-e4f3-4839-8a76-ad573a13ccc9",
        "email": "",
        "contactPerson": "",
        "state": "Maharashtra",
        "resources": ["beds"],
        "source": "https://umeed.live"
    }

    const normalbedData = bedsData.beds[hospital]
    const icuData = bedsData.covid_icu_beds[hospital]
    const ventilatorData = bedsData.ventilators[hospital]
    console.log(normalbedData)
    console.log(icuData)
    console.log(ventilatorData)

    const hosptialData = {
        "hospital": hospital,
        "type": normalbedData && normalbedData.type,
        "verifiedAt": delhiTsToISO(normalbedData && normalbedData.last_updated_at),
        "icuCount": icuData && icuData.vacant,
        "bedCount": normalbedData && normalbedData.vacant,
        "ventilatorCount": ventilatorData && ventilatorData.vacant,
        "address": facilitiesData && facilitiesData[hospital] && facilitiesData[hospital].address,
        "contactNumber": facilitiesData && facilitiesData[hospital] && facilitiesData[hospital].contact_numbers.join(', '),
        "location": facilitiesData && facilitiesData[hospital] && facilitiesData[hospital].location,
        "resources": ["beds"],
        "city": "Delhi",
    }
    return hosptialData
}

async function delhiHospitalData() {
    try{
        const {data : bedsDataJs} = await axios.get(`https://coronabeds.jantasamvad.org/covid-info.js`)
        eval(bedsDataJs)
        const bedsData = gnctd_covid_data;
        const hospitals = Object.keys(bedsData.beds)
        const hospitalData = hospitals.map(hospital => hostpitalToHospitalData(delhiFacilitiesData, bedsData, hospital))
        return hospitalData
    } catch {
        return [];

    }
}

// ============== Post Processors ===========================

function bedsToOtherResources(bedsData) {
    if(bedsData.resources.includes("beds")) {
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
        return {...bedsData, resources}
    } else {
        return bedsData
    }

}

const delhiAlternatives = ["dehi", "new delhi", "delhi", "delhi ncr", "delhi ","delhi manesar", "old delhi", " delhi ncr ", "chattarpur delhi", "chattarpur", "120 km from delhi, behror"]

function normalizeCityNames(city){
    if(delhiAlternatives.includes(city.toLowerCase())){
        return "delhi"
    } else {
        return city.toLowerCase()
    }
}

// ============== Data collator =============================

const dataFetchers = [
                {source: "http://umeed.live", fetcherFn: umeedLifeDataFetcher},
                {source: "https://covidnashik.com/", fetcherFn: nashikCovidHospitals},
                {source: "https://covidpune.com", fetcherFn: puneCovidHospitals},
                {source: "https://covidgandhinagar.com/", fetcherFn: gandhinagarCovidHospitals},
                {source: "https://covidamd.com/", fetcherFn: amdCovidHospitals},
                {source: "https://covidbeed.com/", fetcherFn: beedCovidHospitals},
                {source: "https://coronabeds.jantasamvad.org", fetcherFn: delhiHospitalData},
                {source: "https://covidtnadu.com", fetcherFn: tnaduCovidHospitals},
                {source: "https://coviddelhi.com", fetcherFn: delhiCovidHospitals},
                {source: "https://covidaps.com", fetcherFn: AndhraCovidHospitals},
                {source: "https://covidbaroda.com", fetcherFn: barodaCovidHospitals},
                {source: "https://covidbengaluru.com", fetcherFn: bengaluruCovidHospitals},
                {source: "https://covidcgh.com", fetcherFn: chattisgarhCovidHospitals},
                {source: "https://covidmp.com", fetcherFn: madhyaPradeshCovidHospitals},
                {source: "https://covidwb.com", fetcherFn: bengalCovidHospitals},
                {source: "https://covidtelangana.com", fetcherFn: telanganaCovidHospitals}
            ]

async function getAllData() {
    var data = [];
    for(var i=0; i < dataFetchers.length; i++) {
        const {source, fetcherFn} = dataFetchers[i];
        const newData = await fetcherFn()
        data = data.concat(newData.map(item => {return {...item, source, city: normalizeCityNames(item.city)}}))
        data = data.map(item => bedsToOtherResources(item))
    }
    return data;
}

module.exports = {
    umeedLifeDataFetcher,
    getAllData
}