const axios = require('axios')
const{genericCovidHospitals, covidresourcesInDataProcessor} =require("./source_helpers/generalPostProcessor.js")
const _ = require('lodash-contrib');



async function nashikCovidHospitals(){
    const bedsUrl = "https://covidnashik.com/data/covidnashik.com/bed_data.json";
    const plasmaUrl = "https://covidnashik.com/data/covidnashik.com/plasma_data.json"
    return await genericCovidHospitals(bedsUrl,plasmaUrl,'nashik','Maharashtra');
}

async function puneCovidHospitals() {
    const bedsUrl = "https://covidpune.com/data/covidpune.com/bed_data.json";
    const plasmaUrl = "https://covidpune.com/data/covidpune.com/plasma_data.json"
    return await genericCovidHospitals(bedsUrl,plasmaUrl,'pune','Maharashtra');
}

async function gandhinagarCovidHospitals() {
    const bedsUrl = "https://covidgandhinagar.com/data/covidgandhinagar.com/bed_data.json";
    const plasmaUrl = "https://covidgandhinagar.com/data/covidgandhinagar.com/plasma_data.json"
    return await genericCovidHospitals(bedsUrl,plasmaUrl,'gandhinagar','Gujrat');
}

async function amdCovidHospitals() {
    const bedsUrl = "https://covidamd.com/data/covidamd.com/bed_data.json";
    const plasmaUrl = "https://covidamd.com/data/covidamd.com/plasma_data.json"
    return await genericCovidHospitals(bedsUrl,plasmaUrl,'ahmedabad','Gujrat');
}

async function beedCovidHospitals() {
    const bedsUrl = "https://covidbeed.com/data/covidbeed.com/bed_data.json";
    const plasmaUrl = "https://covidbeed.com/data/covidbeed.com/plasma_data.json"
    return await genericCovidHospitals(bedsUrl,plasmaUrl,'beed','Maharashtra');
}

async function tnaduCovidHospitals() {
    // NOTE: This is different from other covid<region>.com website, this is for multiple cities
    // inside Tamil Nadu
    const bedsUrl = "https://covidtnadu.com/data/covidtnadu.com/bed_data.json";
    const plasmaUrl = "https://covidtnadu.com/data/covidtnadu.com/plasma_data.json"
    return await genericCovidHospitals(bedsUrl,plasmaUrl,'','Tamil Nadu');
}

async function AndhraCovidHospitals() {
    const bedsUrl = "https://covidaps.com/data/covidaps.com/bed_data.json";
    const plasmaUrl = "https://covidaps.com/data/covidaps.com/plasma_data.json"
    return await genericCovidHospitals(bedsUrl,plasmaUrl,'','Andhra Pradesh');
}

async function delhiCovidHospitals(){
    const bedsUrl = "https://coviddelhi.com/data/coviddelhi.com/bed_data.json";
    const plasmaUrl = "https://coviddelhi.com/data/coviddelhi.com/plasma_data.json"
    return await genericCovidHospitals(bedsUrl,plasmaUrl,'delhi','Delhi');
}
async function barodaCovidHospitals(){
    const bedsUrl = "https://covidbaroda.com/data/covidbaroda.com/bed_data.json";
    const plasmaUrl = "https://covidbaroda.com/data/covidbaroda.com/plasma_data.json"
    return await genericCovidHospitals(bedsUrl,plasmaUrl,'baroda','Gujrat');
}

async function bengaluruCovidHospitals(){
    const bedsUrl = "https://covidbengaluru.com/data/covidbengaluru.com/bed_data.json";
    const plasmaUrl = "https://covidbengaluru.com/data/covidbengaluru.com/plasma_data.json"
    return await genericCovidHospitals(bedsUrl,plasmaUrl,'bengaluru','Karnataka');
}
async function chattisgarhCovidHospitals(){
    const bedsUrl = "https://covidcgh.com/data/covidcgh.com/bed_data.json";
    const plasmaUrl = "https://covidcgh.com/data/covidcgh.com/plasma_data.json"
    return await genericCovidHospitals(bedsUrl,plasmaUrl,'','Chhattisgarh');
}

async function madhyaPradeshCovidHospitals(){
    const bedsUrl = "https://covidmp.com/data/covidmp.com/bed_data.json";
    const plasmaUrl = "https://covidmp.com/data/covidmp.com/plasma_data.json"
    return await genericCovidHospitals(bedsUrl,plasmaUrl,'','Madhya Pradesh');
}

async function nagpurCovidHospitals(){
    const bedsUrl = "https://covidnagpur.com/data/covidnagpur.com/bed_data.json";
    const plasmaUrl = "https://covidnagpur.com/data/covidnagpur.com/plasma_data.json"
    return await genericCovidHospitals(bedsUrl,plasmaUrl,'nagpur','Maharashtra');
}

async function rajkotCovidHospitals(){
    const bedsUrl = "https://covidrkt.com/data/covidrkt.com/bed_data.json";
    const plasmaUrl = "https://covidrkt.com/data/covidrkt.com/plasma_data.json"
    return await genericCovidHospitals(bedsUrl,plasmaUrl,'rajkot','Gujrat');
}

async function suratCovidHospitals(){
    const bedsUrl = "https://covidsurat.com/data/covidsurat.com/bed_data.json";
    const plasmaUrl = "https://covidsurat.com/data/covidsurat.com/plasma_data.json"
    return await genericCovidHospitals(bedsUrl,plasmaUrl,'surat','Gujrat');
}

async function bengalCovidHospitals(){
    const bedsUrl = "https://covidwb.com/data/covidwb.com/bed_data.json";
    const plasmaUrl = "https://covidwb.com/data/covidwb.com/plasma_data.json"
    return await genericCovidHospitals(bedsUrl,plasmaUrl,'','West Bengal');
}

async function telanganaCovidHospitals(){
    const bedsUrl = "https://covidtelangana.com/data/covidtelangana.com/bed_data.json";
    const plasmaUrl = "https://covidtelangana.com/data/covidtelangana.com/plasma_data.json"
    return await genericCovidHospitals(bedsUrl,plasmaUrl,'','Telangana');
}

async function covidresourcesIn(){
    const {data} =await axios.get("https://api.covidresources.in/data.json")
    let cityData = Object.keys(data).map((key) => covidresourcesInDataProcessor(key,data[key]));
    cityData = [].concat.apply([], cityData)
    return cityData;
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
    telanganaCovidHospitals,
    covidresourcesIn
}