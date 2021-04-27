const axios = require('axios')
var moment = require('moment')
const _ = require('lodash-contrib');

function generalPostProcessor(item) {
    const sample = {
        "hospital_category": "DCHC",
        "total_beds_allocated_to_covid": 16,
        "total_beds_without_oxygen": 16,
        "available_beds_without_oxygen": 16,
        "total_beds_with_oxygen": 0,
        "available_beds_with_oxygen": 0,
        "total_icu_beds_without_ventilator": 0,
        "available_icu_beds_without_ventilator": 0,
        "total_icu_beds_with_ventilator": 0,
        "available_icu_beds_with_ventilator": 0,
        "hospital_name": "24 * 7  Covid Care Center",
        "area": "East",
        "hospital_address": "24* 7 Covid care Center  behind Canta Care Center  bhabha Nagar Nashik",
        "hospital_phone": "8975042579",
        "officer_name": "",
        "officer_designation": "",
        "last_updated_on": 1619274352597
    }
    // TODO: Add a total number of beds in key bedCount
    const renameMap = {"hospital_name": "hospital",
                       "available_beds_without_oxygen": "bedCount",
                       "available_beds_with_oxygen": "oxygenBeds",
                       "available_icu_beds_without_ventilator": "icuCount",
                       "available_icu_beds_with_ventilator": "ventilatorCount",
                       "hospital_address": "address",
                       "hospital_phone": "contactNumber",
                       "last_updated_on": "verifiedAt",
                       "district": "city"}
    const newItem =  _.renameKeys(item, renameMap)
    const tz = moment.unix(newItem.verifiedAt/1000).toISOString()
    return {...newItem, verifiedAt: tz}
    
}

async function nashikCovidHospitals() {
    const {data} = await axios.get("https://covidnashik.com/data/covidnashik.com/bed_data.json")
    return data.map(generalPostProcessor).map(item=>{return {...item, city: "nashik", resources: ["beds"]}})
}

async function puneCovidHospitals() {
    const {data} = await axios.get("https://covidpune.com/data/covidpune.com/bed_data.json")
    return data.map(generalPostProcessor).map(item=>{return {...item, city: "pune", resources: ["beds"]}})
}

async function gandhinagarCovidHospitals() {
    const {data} = await axios.get("https://covidgandhinagar.com/data/covidgandhinagar.com/bed_data.json")
    return data.map(generalPostProcessor).map(item=>{return {...item, city: "gandhinagar", resources: ["beds"]}})
}

async function amdCovidHospitals() {
    const {data} = await axios.get("https://covidamd.com/data/covidamd.com/bed_data.json")
    return data.map(generalPostProcessor).map(item=>{return {...item, city: "ahmedabad", resources: ["beds"]}})
}

async function beedCovidHospitals() {
    const {data} = await axios.get("https://covidbeed.com/data/covidbeed.com/bed_data.json")
    return data.map(generalPostProcessor).map(item=>{return {...item, city: "beed", resources: ["beds"]}})
}

async function tnaduCovidHospitals() {
    // NOTE: This is different from other covid<region>.com website, this is for multiple cities
    // inside Tamil Nadu
    const {data} = await axios.get("https://covidtnadu.com/data/covidtnadu.com/bed_data.json")
    return data.map(generalPostProcessor).map(item=>{return {...item, resources: ["beds"]}})
}

async function AndhraCovidHospitals() {
    const {data} = await axios.get("https://covidaps.com/data/covidaps.com/bed_data.json")
    return data.map(generalPostProcessor).map(item=>{return {...item, resources: ["beds"]}})
}

async function delhiCovidHospitals(){
    const {data} = await axios.get("https://coviddelhi.com/data/coviddelhi.com/bed_data.json")
    return data.map(generalPostProcessor).map(item=>{return {...item, resources: ["beds"]}})
}
async function barodaCovidHospitals(){
    const {data} = await axios.get("https://covidbaroda.com/data/covidbaroda.com/bed_data.json")
    return data.map(generalPostProcessor).map(item=>{return {...item, resources: ["beds"]}})
}

async function bengaluruCovidHospitals(){
    const {data} = await axios.get("https://covidbengaluru.com/data/covidbengaluru.com/bed_data.json")
    return data.map(generalPostProcessor).map(item=>{return {...item, resources: ["beds"]}})
}
async function chattisgarhCovidHospitals(){
    const {data} = await axios.get("https://covidcgh.com/data/covidcgh.com/bed_data.json")
    return data.map(generalPostProcessor).map(item=>{return {...item, resources: ["beds"]}})
}

async function madhyaPradeshCovidHospitals(){
    const {data} = await axios.get("https://covidmp.com/data/covidmp.com/bed_data.json")
    return data.map(generalPostProcessor).map(item=>{return {...item, resources: ["beds"]}})
}

async function nagpurCovidHospitals(){
    const {data} = await axios.get("https://covidnagpur.com/data/covidnagpur.com/bed_data.json")
    return data.map(generalPostProcessor).map(item=>{return {...item, resources: ["beds"]}})
}

async function rajkotCovidHospitals(){
    const {data} = await axios.get("https://covidrkt.com/data/covidrkt.com/bed_data.json")
    return data.map(generalPostProcessor).map(item=>{return {...item, resources: ["beds"]}})
}

async function suratCovidHospitals(){
    const {data} = await axios.get("https://covidsurat.com/data/covidsurat.com/bed_data.json")
    return data.map(generalPostProcessor).map(item=>{return {...item, resources: ["beds"]}})
}

async function bengalCovidHospitals(){
    const {data} = await axios.get("https://covidwb.com/data/covidwb.com/bed_data.json")
    return data.map(generalPostProcessor).map(item=>{return {...item, resources: ["beds"]}})
}

async function telanganaCovidHospitals(){
    const {data} = await axios.get("https://covidtelangana.com/data/covidtelangana.com/bed_data.json")
    return data.map(generalPostProcessor).map(item=>{return {...item, resources: ["beds"]}})
}


module.exports = {
    delhiCovidHospitals,
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
    rajkotCovidHospitals,
    suratCovidHospitals,
    bengalCovidHospitals,
    telanganaCovidHospitals
}