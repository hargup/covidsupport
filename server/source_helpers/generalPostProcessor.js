var moment = require('moment')
const _ = require('lodash-contrib');
const axios = require('axios')

function addressToCity(address) {
    const tokens = address.split(',').map(t=>t.trim())
    // Return the second last thing
    // Example if address 'Door No. 22-8-496 to 501, Ist and 2nd floor, Chatta Bazar ‘X’ Road, Opp: City Civil Courts, Purani Haveli, , Hyderabad, Hyderabad, Telangana'
    // City is the second last token after spliting by ","
    return tokens[tokens.length - 2]
}
//for all covid<city/state> sites
async function genericCovidHospitals(bedsUrl,plasmaUrl,city,state) {
    let data = axios.get(bedsUrl);
    let plasma = axios.get(plasmaUrl);
    let consolidatedData = axios.all([data, plasma])
    .then(
        axios.spread((...responses) => {
        let bedsData = typeof(responses[0].data) == "object" ? responses[0].data: [];
        let plasmaData = typeof(responses[1].data) == "object"? responses[1].data: [];
        bedsData =  bedsData && bedsData.map(generalPostProcessor).map(item=>{return {...item, city: city || item.district || item.area, state, resources: ["beds"]}});
        plasmaData =  plasmaData && plasmaData.map(generalPostProcessor).map(item=>{return {...item, city: city || addressToCity(item.address), state, resources: ["plasma"]}});
        plasmaData = plasmaData && plasmaData.filter(item=> item.status == "available");
        return [].concat(plasmaData, bedsData)
        })
    )
    .catch(errors => {
        // react on errors.
        console.error(errors);
        return [];
    });

    return consolidatedData;
}
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
                       "district": "city",
                        "name" : "hospital",   
                        "phone" : "contactNumber" 
                    }
    const newItem =  _.renameKeys(item, renameMap)
    const tz = newItem.verifiedAt==0? null :moment.unix(newItem.verifiedAt/1000).toISOString()
    return {...newItem, verifiedAt: tz}
    
}

function covidresourcesInDataProcessor(city,cityData){
    const renameMap = {"name": "hospital",
                        "description": "others",
                       "name": "address",
                       "contact": "contactPerson",
                       "contact": "contactNumber",
                       "lastVerified": "verifiedAt",
                       "district": "city"
                        }
    if(!cityData.length){
        return [];
    }
    else{

        cityData.map(resource => {
            
            resource.resources=[];
            if(resource.category.indexOf("Bed")>=0)
                resource.resources.push("beds");
            if(resource.category.indexOf("Oxygen")>=0)
                resource.resources.push("oxygen")
            if(resource.category.indexOf("Plasma")>=0)
                resource.resources.push("plasma")
            resource.city = city;
            // resource = _.renameKeys(resource, renameMap)
            // TODO: rename keys to match FE
            
        })
        //cityData.city= city;
        return cityData;
    }
}
module.exports={
    genericCovidHospitals,
    covidresourcesInDataProcessor
}