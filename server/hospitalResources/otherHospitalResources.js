const axios = require('axios')
var moment = require('moment')
const _ = require('lodash-contrib'); 
const { delhiFacilitiesData } = require("../source_helpers/delhiFacilitiesData");

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
        return moment(`${delhiTs} ${moment().year()} +05:30`).toISOString()

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
async function noidaCovidHospitals() {
    const sampleInput = {
    		"id": 5,
    		"name": "Jaypee Hospital",
    		"normal": "0",
    		"oxygen": "178",
    		"ventilator": "90",
    		"Vacant_ventilator": "0",
    		"Vacant_oxygen": "0",
    		"Vacant_normal": "0",
    		"address": "Jaypee Hospital Rd, Goberdhanpur, Sector 128, Noida, Uttar Pradesh 201304",
    		"phone_number": "1204122222",
    		"location_url": "https://www.google.com/maps/place/Jaypee+Hospital+-+Multispeciality+Hospital+in+Noida/@28.5154426,77.3692531,17z/data=!3m1!4b1!4m5!3m4!1s0x390ce66a55555555:0xecd13afcb2e7cb44!8m2!3d28.5154379!4d77.3714472",
    		"published_at": "2021-04-24T05:35:19.884Z",
    		"created_at": "2021-04-24T03:04:57.591Z",
    		"updated_at": "2021-04-30T07:35:04.594Z"
    	}

    try {
        const {data : dataRaw} = await axios.get(`https://safe-waters-75143.herokuapp.com/hospitals`)
        const data = dataRaw.map(item => {
            return {...item,
                "hospital": item.name,
                "verifiedAt": item.updated_at,
                "oxygenBeds": item.Vacant_oxygen,
                "bedCount": item.Vacant_normal,
                "ventilatorCount": item.Vacant_ventilator,
                "address": item.address,
                "contactNumber": item.phone_number,
                "location": item.location_url,
                "resources": ["beds"],
                "city": "Noida",
                    }
        })
        return data;
    } catch {
        return [];
    }
}
module.exports = {
    noidaCovidHospitals,
    umeedLifeDataFetcher,
    delhiHospitalData
}