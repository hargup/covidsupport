# Single place to search all Covid Data Sources
At [covidsupport.neera.ai](covidsupport.neera.ai) we provide a single place to search all covid sources. 

# How does this work?
- We get fetch data from multiple sources.
- Convert into one standard format
- This data is searched and filtered on the frontend.

The data collection part is available here. You can use the full app at [covidsupport.neera.ai](covidsupport.neera.ai)

# How to run the project locally
## Frontend
```bash
cd web && npm install
npm start
```
## Backend
```bash
cd server && npm install
node server.js
```

# The standard data format

```javascript
const sample_data = {
  hospital: "Prakash Hospital, Sangli",
  city: "Pune",
  verifiedAt: "2021-04-24T07:09:54.704Z", // ISO format use https://momentjs.com/docs/#/displaying/as-iso-string/ to conver to this
  contactNumber: "8668606730, 8983346714",
  bedCount: "400", // This is count of vacant beds
  oxygenBeds: "30", // This is count of vacant beds with oxygen
  icuCount: "30", // This is count of vacant icu beds
  ventilatorCount: "10", // // This is count of vacant icu beds with  ventilator
  email: "",
  contactPerson: "CMO",
  state: "Maharashtra",
  resources: ["beds", "oxygen", "icu"], // An array, values should be one of "beds", "oxygen", "ventilator", "icu", "plasma", "fabiflu", "tocilizumab" or "remdesivir"
  source: "https://umeed.live",
};
```

# How to add a new data source?
- Go to your data source, open the developer console, in the network tab you'll probably see an API request sending data to the client.
- Write a function to get this data, and convert it to the standard format specified above.
- Add that function along with source in the `dataFetchers` in `dataFetcher.js` file, and send a pull request.

# Covered sources

- https://covidamd.com -> Ahemdabad covid beds
- https://covidbeed.com -> Beed covid beds
- https://covidgandhinagar.com -> Gandhinagar covid beds
- https://covidnashik.com -> Nashik covid beds
- https://covidpune.com -> Pune covid beds
- https://covidtnadu.com -> Tamil Nadu covid beds
- https://coronabeds.jantasamvad.org -> Delhi covid beds
- http://umeed.live -> Multiple resources for mulitple cities

# Requested Sources
- https://www.pratirakshak.co.in/new-report.php -> Ranchi Beds
- https://bbmpgov.com/chbms/ -> Bangalore Beds
- https://covidinfo.rajasthan.gov.in/covid-isolation-hospital.aspx -> Rajasthan Beds
- https://covid19jagratha.kerala.nic.in/home/addHospitalDashBoard -> Kerala Beds
- https://statedashboard.odisha.gov.in/Pages/district -> Odisha Beds
- https://cg.nic.in/health/covid19/RTPBedAvailable.aspx -> Chhattisgarh Beds
- https://live.angelnextdoor.in/resources.php -> Verified Lead for medicines
- https://covidresources.in/ -> Various verified covid resources
- https://docs.google.com/spreadsheets/d/1roxOi2_Uw4YBzLd5s8vC8cp6lbuM9016tWeWTcx2q5Y/edit#gid=758140453 -> Lucknow beds info
- https://covidbedsindia.in/ -> Map of covid beds
