import React, { useState } from "react";
import MainLoginForm from "./logincomps/MainLoginForm";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";


const lsData = {
  Assam: {
    Guwahati: [
      { name: "CBSE School 1", code: "S001" },
      { name: "CBSE School 2", code: "S002" },
    ],
    Jorhat: [
      { name: "CBSE School 3", code: "S003" },
      { name: "CBSE School 4", code: "S004" },
    ]
  },
  Bihar: {
    Patna: [
      { name: "CBSE School 7", code: "S007" },
      { name: "CBSE School 8", code: "S008" },
    ],
    Gaya: [
      { name: "CBSE School 9", code: "S009" },
      { name: "CBSE School 10", code: "S010" },
    ]
  },
  Maharashtra: {
    Mumbai: [
      { name: "CBSE School 12", code: "S012" },
      { name: "CBSE School 13", code: "S013" },
    ],
    Pune: [
      { name: "CBSE School 14", code: "S014" },
      { name: "CBSE School 15", code: "S015" },
    ]
  },
  Karnataka: {
    Bangalore: [
      { name: "CBSE School 18", code: "S018" },
      { name: "CBSE School 19", code: "S019" },
    ],
    Mysore: [
      { name: "CBSE School 20", code: "S020" },
      { name: "CBSE School 21", code: "S021" },
    ]
  },
  WestBengal: {
    Kolkata: [
      { name: "CBSE School 23", code: "S023" },
      { name: "CBSE School 24", code: "S024" },
    ],
    Purulia: [
      { name: "CBSE School 25", code: "S025" },
      { name: "CBSE School 26", code: "S026" },
    ]
  },
  UttarPradesh: {
    Lucknow: [
      { name: "CBSE School 28", code: "S028" },
      { name: "CBSE School 29", code: "S029" },
    ],
    Kanpur: [
      { name: "CBSE School 30", code: "S030" },
      { name: "CBSE School 31", code: "S031" },
    ]
  },
  TamilNadu: {
    Chennai: [
      { name: "CBSE School 33", code: "S033" },
      { name: "CBSE School 34", code: "S034" },
    ],
    Coimbatore: [
      { name: "CBSE School 35", code: "S035" },
      { name: "CBSE School 36", code: "S036" },
    ]
  },
  Rajasthan: {
    Jaipur: [
      { name: "CBSE School 38", code: "S038" },
      { name: "CBSE School 39", code: "S039" },
    ],
    Jodhpur: [
      { name: "CBSE School 40", code: "S040" },
      { name: "CBSE School 41", code: "S041" },
    ]
  },
  Kerala: {
    Thiruvananthapuram: [
      { name: "CBSE School 43", code: "S043" },
      { name: "CBSE School 44", code: "S044" },
    ],
    Kochi: [
      { name: "CBSE School 45", code: "S045" },
      { name: "CBSE School 46", code: "S046" },
    ]
  },
  Gujarat: {
    Ahmedabad: [
      { name: "CBSE School 48", code: "S048" },
      { name: "CBSE School 49", code: "S049" },
    ],
    Surat: [
      { name: "CBSE School 50", code: "S050" },
      { name: "CBSE School 51", code: "S051" },
    ]
  },
  MadhyaPradesh: {
    Bhopal: [
      { name: "CBSE School 53", code: "S053" },
      { name: "CBSE School 54", code: "S054" },
    ],
    Indore: [
      { name: "CBSE School 55", code: "S055" },
      { name: "CBSE School 56", code: "S056" },
    ]
  },
  Punjab: {
    Amritsar: [
      { name: "CBSE School 58", code: "S058" },
      { name: "CBSE School 59", code: "S059" },
    ],
    Ludhiana: [
      { name: "CBSE School 60", code: "S060" },
      { name: "CBSE School 61", code: "S061" },
    ]
  },

  AndhraPradesh: {
    Ananthapuramu: [
      { name: "CBSE School 62", code: "S0581" },
      { name: "CBSE School 63", code: "S0591" },
    ],
    Chittoor: [
      { name: "CBSE School 64", code: "S0601" },
      { name: "CBSE School 65", code: "S0611" },
    ]
  },
}


const states = [
  {
    state: "Andaman & Nicobar",
    districts: [
      "Nicobar",
      "North And Middle Andaman",
      "South Andaman"
    ]
  },
  {
    state: "Andhra Pradesh",
    districts: [
      "Ananthapuramu",
      "Chittoor",
      "East Godavari",
      "Guntur",
      "Krishna",
      "Kurnool",
      "Prakasam",
      "Sri Potti Sriramulu Nellore",
      "Srikakulam",
      "Vijayawada",
      "Visakhapatnam",
      "Vizianagaram",
      "West Godavari",
      "Y.s.r."
    ]
  },
  {
    state: "Arunachal Pradesh",
    districts: [
      "Anjaw",
      "Changlang",
      "Dibang Valley",
      "East Kameng",
      "East Siang",
      "Lohit",
      "Longding",
      "Lower Dibang Valley",
      "Lower Subansiri",
      "Namsai",
      "Papum Pare",
      "Tawang",
      "Tirap",
      "Upper Siang",
      "Upper Subansiri",
      "West Kameng",
      "West Siang"
    ]
  },
  {
    state: "Chandigarh",
    districts: [
      "Chandigarh"
    ]
  },
  {
    state: "Chattisgarh",
    districts: [
      "Balod",
      "Baloda Bazar",
      "Balrampur Ramanujganj",
      "Bastar",
      "Bemetara",
      "Bijapur",
      "Bilaspur",
      "Dantewada",
      "Dhamtari",
      "Durg",
      "Gariyaband",
      "Janjgir-champa",
      "Jashpur",
      "Kabeerdham",
      "Kanker",
      "Kondagaon",
      "Korba",
      "Mahasamund",
      "Manendragarh Chirmiri Bharatpur Mcb",
      "Mungeli",
      "Narayanpur",
      "Raipur",
      "Rajnandgaon",
      "Sukma",
      "Surajpur",
      "Surguja"
    ]
  },
  {
    state: "Dadar & Nagar Haveli",
    districts: [
      "Dadra And Nagar Haveli"
    ]
  },
  {
    state: "Daman & Diu",
    districts: [
      "Daman",
      "Diu"
    ]
  },
  {
    state: "Delhi",
    districts: [
      "Central Delhi",
      "East Delhi",
      "New Delhi",
      "North Delhi",
      "North East Delhi",
      "North West Delhi",
      "South Delhi",
      "South East Delhi",
      "South West Delhi",
      "West Delhi"
    ]
  },
  {
    state: "Haryana",
    districts: [
      "Ambala",
      "Bhiwani",
      "Charkhi Dadri",
      "Faridabad",
      "Fatehabad",
      "Gurugram",
      "Hissar",
      "Jhajjar",
      "Jind",
      "Kaithal",
      "Karnal",
      "Kurukshetra",
      "Mahendragarh",
      "Nuh",
      "Palwal",
      "Panchkula",
      "Panipat",
      "Rewari",
      "Rohtak",
      "Sirsa",
      "Sonipat",
      "Yamunanagar"
    ]
  },
  {
    state: "Himachal Pradesh",
    districts: [
      "Bilaspur",
      "Chamba",
      "Hamirpur",
      "Kangra",
      "Kinnaur",
      "Kullu",
      "Lahul And Spiti",
      "Mandi",
      "Shimla",
      "Sirmaur",
      "Solan",
      "Una"
    ]
  },
  {
    state: "Jammu & Kashmir",
    districts: [
      "Anantnag",
      "Bandipora",
      "Baramulla",
      "Budgam",
      "Doda",
      "Jammu",
      "Kathua",
      "Kishtwar",
      "Kulgam",
      "Kupwara",
      "Poonch",
      "Pulwama",
      "Rajouri",
      "Ramban",
      "Samba",
      "Srinagar",
      "Udhampur"
    ]
  },
  {
    state: "Jharkhand",
    districts: [
      "Bokaro",
      "Chatra",
      "Deoghar",
      "Dhanbad",
      "Dumka",
      "East Singhbhum",
      "Garhwa",
      "Giridih",
      "Godda",
      "Gumla",
      "Hazaribagh",
      "Jamtara",
      "Khunti",
      "Koderma",
      "Latehar",
      "Lohardaga",
      "Pakur",
      "Palamu",
      "Ramgarh",
      "Ranchi",
      "Sahebganj",
      "Saraikela Kharsawan",
      "Simdega",
      "West Singhbhum"
    ]
  },
  {
    state: "Kerala",
    districts: [
      "Alappuzha",
      "Ernakulam",
      "Idukki",
      "Kannur",
      "Kasaragod",
      "Kollam",
      "Kottayam",
      "Kozhikode",
      "Malappuram",
      "Palakkad",
      "Pathanamthitta",
      "Thiruvananthapuram",
      "Thrissur",
      "Wayanad"
    ]
  },
  {
    state: "Ladakh",
    districts: [
      "Kargil",
      "Leh"
    ]
  },
  {
    state: "Lakshadweep",
    districts: [
      "Lakshadweep"
    ]
  },
  {
    state: "Madhya Pradesh",
    districts: [
      "Agar Malwa",
      "Alirajpur",
      "Anuppur",
      "Ashoknagar",
      "Balaghat",
      "Barwani",
      "Betul",
      "Bhind",
      "Bhopal",
      "Burhanpur",
      "Chhatarpur",
      "Chhindwara",
      "Damoh",
      "Datia",
      "Dewas",
      "Dhar",
      "Dindori",
      "Guna",
      "Gwalior",
      "Harda",
      "Indore",
      "Jabalpur",
      "Jhabua",
      "Katni",
      "Khandwa",
      "Khargone",
      "Mandla",
      "Mandsaur",
      "Morena",
      "Narmadapuram",
      "Narsinghpur",
      "Neemuch",
      "Panna",
      "Raisen",
      "Rajgarh",
      "Ratlam",
      "Rewa",
      "Sagar",
      "Satna",
      "Sehore",
      "Seoni",
      "Shahdol",
      "Shajapur",
      "Sheopur",
      "Shivpuri",
      "Sidhi",
      "Singrauli",
      "Tikamgarh",
      "Ujjain",
      "Umaria",
      "Vidisha"
    ]
  },
  {
    state: "Maharashtra",
    districts: [
      "Ahmednagar",
      "Akola",
      "Amravati",
      "Beed",
      "Bhandara",
      "Buldhana",
      "Chandrapur",
      "Chhatrapati Sambhajinagar",
      "Dharashiv",
      "Dhule",
      "Gadchiroli",
      "Gondia",
      "Hingoli",
      "Jalgaon",
      "Jalna",
      "Kolhapur",
      "Latur",
      "Mumbai",
      "Mumbai Suburban",
      "Nagpur",
      "Nanded",
      "Nandurbar",
      "Nashik",
      "Palghar",
      "Parbhani",
      "Pune",
      "Raigad",
      "Ratnagiri",
      "Sangli",
      "Satara",
      "Sindhudurg",
      "Solapur",
      "Thane",
      "Wardha",
      "Washim",
      "Yavatmal"
    ]
  },
  {
    state: "Uttar Pradesh",
    districts: [
      "Agra",
      "Aligarh",
      "Ambedkar Nagar",
      "Amethi",
      "Amroha",
      "Auraiya",
      "Ayodhya",
      "Azamgarh",
      "Baghpat",
      "Bahraich",
      "Ballia",
      "Banda",
      "Barabanki",
      "Bareilly",
      "Basti",
      "Bhadohi",
      "Bijnor",
      "Budaun",
      "Bulandshahar",
      "Chandauli",
      "Chitrakoot",
      "Deoria",
      "Etah",
      "Etawah",
      "Farrukhabad",
      "Fatehpur",
      "Firozabad",
      "Gautam Buddha Nagar",
      "Ghaziabad",
      "Ghazipur",
      "Gonda",
      "Gorakhpur",
      "Hamirpur",
      "Hapur",
      "Hardoi",
      "Hathras",
      "Jalaun",
      "Jaunpur",
      "Jhansi",
      "Kannauj",
      "Kanpur Dehat",
      "Kanpur Nagar",
      "Kasganj",
      "Kaushambi",
      "Kushinagar",
      "Lakhimpur Kheri",
      "Lalitpur",
      "Lucknow",
      "Maharajganj",
      "Mahoba",
      "Mainpuri",
      "Mathura",
      "Mau",
      "Meerut",
      "Mirzapur",
      "Moradabad",
      "Muzaffarnagar",
      "Pilibhit",
      "Pratapgarh",
      "Raebareli",
      "Rampur",
      "Saharanpur",
      "Sambhal",
      "Sant Kabir Nagar",
      "Shahjahanpur",
      "Shamli",
      "Shrawasti",
      "Siddharth Nagar",
      "Sitapur",
      "Sonbhadra",
      "Sultanpur",
      "Unnao",
      "Varanasi"
    ]
  },
  {
    state: "Tripura",
    districts: [
      "Dhalai",
      "Khowai",
      "North Tripura",
      "South Tripura",
      "Unakoti",
      "West Tripura"
    ]
  },
  {
    state: "Telangana",
    districts: [
      "Adilabad",
      "Hyderabad",
      "Karimnagar",
      "Khammam",
      "Mahabubnagar",
      "Medak",
      "Nalgonda",
      "Nizamabad",
      "Rangareddy",
      "Warangal",
      "Yadadri Bhuvanagiri"
    ]
  },
  {
    state: "Tamilnadu",
    districts: [
      "Ariyalur",
      "Chengalpattu",
      "Chennai",
      "Coimbatore",
      "Cuddalore",
      "Dharmapuri",
      "Dindigul",
      "Erode",
      "Kanchipuram",
      "Kanyakumari",
      "Karur",
      "Krishnagiri",
      "Madurai",
      "Nagapattinam",
      "Namakkal",
      "Nilgiris",
      "Perambalur",
      "Pudukkottai",
      "Ramanathapuram",
      "Ranipet",
      "Salem",
      "Sivaganga",
      "Tenkasi",
      "Thanjavur",
      "Theni",
      "Thiruvallur",
      "Thiruvarur",
      "Thoothukkudi",
      "Tiruchirappalli",
      "Tirunelveli",
      "Tirupathur",
      "Tiruppur",
      "Tiruvannamalai",
      "Vellore",
      "Viluppuram",
      "Virudhunagar"
    ]
  },
  {
    state: "Sikkim",
    districts: [
      "East Sikkim",
      "North Sikkim",
      "South Sikkim",
      "West Sikkim"
    ]
  },
  {
    state: "Rajasthan",
    districts: [
      "Ajmer",
      "Alwar",
      "Banswara",
      "Baran",
      "Barmer",
      "Bharatpur",
      "Bhilwara",
      "Bikaner",
      "Bundi",
      "Chittorgarh",
      "Churu",
      "Dausa",
      "Dholpur",
      "Dungarpur",
      "Hanumangarh",
      "Jaipur",
      "Jaisalmer",
      "Jalore",
      "Jhalawar",
      "Jhunjhunu",
      "Jodhpur",
      "Karauli",
      "Kota",
      "Nagaur",
      "Pali",
      "Pratapgarh",
      "Rajsamand",
      "Sawai Madhopur",
      "Sikar",
      "Sirohi",
      "Sri Ganganagar",
      "Tonk",
      "Udaipur"
    ]
  },
  {
    state: "Punjab",
    districts: [
      "Amritsar",
      "Barnala",
      "Bathinda",
      "Faridkot",
      "Fatehgarh Sahib",
      "Fazilka",
      "Ferozepur",
      "Gurdaspur",
      "Hoshiarpur",
      "Jalandhar",
      "Kapurthala",
      "Ludhiana",
      "Mansa",
      "Moga",
      "Pathankot",
      "Patiala",
      "Rupnagar",
      "Sangrur",
      "Sas Nagar",
      "Shahid Bhagat Singh Nagar",
      "Sri Muktsar Sahib",
      "Tarn Taran"
    ]
  },
  {
    state: "Puducherry",
    districts: [
      "Mahe",
      "Puducherry"
    ]
  },
  {
    state: "Odisha",
    districts: [
      "Anugul",
      "Balangir",
      "Baleshwar",
      "Bargarh",
      "Bhadrak",
      "Boudh",
      "Cuttack",
      "Deogarh",
      "Dhenkanal",
      "Gajapati",
      "Ganjam",
      "Jagatsinghapur",
      "Jajpur",
      "Jharsuguda",
      "Kalahandi",
      "Kandhamal",
      "Kendrapara",
      "Keonjhar",
      "Khordha",
      "Koraput",
      "Malkangiri",
      "Mayurbhanj",
      "Nabarangpur",
      "Nayagarh",
      "Nuapada",
      "Puri",
      "Rayagada",
      "Sambalpur",
      "Sonepur",
      "Sundargarh"
    ]
  },
  {
    state: "Nagaland",
    districts: [
      "Chumoukedima",
      "Dimapur",
      "Kiphire",
      "Kohima",
      "Longleng",
      "Mokokchung",
      "Mon",
      "Peren",
      "Phek",
      "Tuensang",
      "Wokha",
      "Zunheboto"
    ]
  },
  {
    state: "Mizoram",
    districts: [
      "Aizawl",
      "Champhai",
      "Kolasib",
      "Lunglei",
      "Mamit",
      "Serchhip"
    ]
  },
  {
    state: "Meghalaya",
    districts: [
      "East Garo Hills",
      "East Jaintia Hills",
      "East Khasi Hills",
      "Ri Bhoi",
      "South West Khasi Hills",
      "West Garo Hills",
      "West Khasi Hills"
    ]
  },
  {
    state: "Manipur",
    districts: [
      "Bishnupur",
      "Chandel",
      "Churachandpur",
      "Imphal-east",
      "Imphal-west",
      "Kangpokpi",
      "Senapati",
      "Tamenglong",
      "Thoubal",
      "Ukhrul"
    ]
  },
  {
    state: "Assam",
    districts: [
      "Baksa",
      "Barpeta",
      "Bongaigaon",
      "Cachar",
      "Chirang",
      "Darrang",
      "Dhemaji",
      "Dhubri",
      "Dibrugarh",
      "Dima Hasao",
      "Goalpara",
      "Golaghat",
      "Hailakandi",
      "Hojai",
      "Jorhat",
      "Kamrup",
      "Kamrup Metropolitan",
      "Karbi Anglong",
      "Karimganj",
      "Kokrajhar",
      "Lakhimpur",
      "Marigaon",
      "Nagaon",
      "Nalbari",
      "Sivasagar",
      "Sonitpur",
      "Tinsukia",
      "West Karbi Anglong"
    ]
  },
  {
    state: "Bihar",
    districts: [
      "Araria",
      "Arwal",
      "Aurangabad",
      "Banka",
      "Begusarai",
      "Bhojpur",
      "Buxar",
      "Champaran East",
      "Champaran West",
      "Darbhanga",
      "Gaya",
      "Gopalganj",
      "Jamui",
      "Jehanabad",
      "Kaimur",
      "Katihar",
      "Khagaria",
      "Kishanganj",
      "Lakhisarai",
      "Madhepura",
      "Madhubani",
      "Munger",
      "Muzaffarpur",
      "Nalanda",
      "Nawada",
      "Patna",
      "Purnia",
      "Rohtas",
      "Saharsa",
      "Samastipur",
      "Saran",
      "Sheikhpura",
      "Sheohar",
      "Sitamarhi",
      "Siwan",
      "Supaul",
      "Vaishali"
    ]
  },

  {
    state: "Goa",
    districts: [
      "Goa North",
      "Goa South"
    ]
  },
  {
    state: "Gujarat",
    districts: [
      "Ahmedabad",
      "Amreli",
      "Anand",
      "Arvalli",
      "Banaskantha",
      "Bharuch",
      "Bhavnagar",
      "Botad",
      "Chhotaudepur",
      "Dang",
      "Devbhumi Dwarka",
      "Dohad",
      "Gandhinagar",
      "Gir Somnath",
      "Jamnagar",
      "Junagadh",
      "Kachchh",
      "Kheda",
      "Mahesana",
      "Mahisagar",
      "Morbi",
      "Narmada",
      "Navsari",
      "Panch Mahals",
      "Patan",
      "Porbandar",
      "Rajkot",
      "Sabarkantha",
      "Surat",
      "Surendranagar",
      "Tapi",
      "Vadodara",
      "Valsad"
    ]
  },
  {
    state: "West Bengal",
    districts: [
      "Alipurduar",
      "Bankura",
      "Birbhum",
      "Cooch Behar",
      "Dakshin Dinajpur",
      "Hooghly",
      "Howrah",
      "Jalpaiguri",
      "Jhargram",
      "Kalimpong",
      "Kolkata",
      "Malda",
      "Murshidabad",
      "Nadia",
      "North 24-pargana",
      "Paschim Bardhaman",
      "Paschim Medinipur",
      "Purba Bardhaman",
      "Purba Medinipur",
      "Purulia",
      "South 24-pargana",
      "Uttar Dinajpur"
    ]
  },
  {
    state: "Uttarakhand",
    districts: [
      "Almora",
      "Bageshwar",
      "Chamoli",
      "Champawat",
      "Dehradun",
      "Haridwar",
      "Nainital",
      "Pauri Garhwal",
      "Pithoragarh",
      "Rudraprayag",
      "Tehri-garhwal",
      "Udham Singh Nagar",
      "Uttarkashi"
    ]
  }
];

const Login = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [schools, setSchools] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  const normalizeStateKey = (state) => {
    return state.replace(/\s+/g, '').replace(/&/g, '')     // Removes spaces and "&", e.g., 'Jammu & Kasmir' -> 'JammuKasmir'

  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    console.log("Selected State:", state); // Debugging line
    setSelectedState(state);
    setSelectedDistrict("");
    setSchools([]); // Reset schools when state changes
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    console.log("Selected District:", district); // Debugging line
    setSelectedDistrict(district);

    // Normalize the state key for lsData lookup
    const normalizedStateKey = normalizeStateKey(selectedState);

    // Get schools based on normalized state key and district
    const districtSchools = lsData[normalizedStateKey]?.[district] || [];
    setSchools(districtSchools);
  };


  return (
    <div className="container-fluid py-3 h-100">
      <div className="row align-items-center justify-content-around">
        <div className="d-flex justify-content-between flex-column flex-lg-row">
          <div className="col-12 col-lg-6 py-5">
            <div className="container">
              <div className="font-ubd text-initial text-center">
                <p className="mb-0">Welcome to</p>
                <h2 className="text-primary d-inline-block">SafeInSchool (SIS)</h2>
                <br />
                <div className="text-dark fs-6" style={{ width: "70%", textAlign: "center", display: "flex", margin: "auto" }}>
                  Log in to your account and start your journey of contributing to the overall safety of your school.
                  Become a part of a community of thousands of schools and their stakeholders
                  who are actively pursuing school safety goals through SIS.
                </div>

              </div>
              <MainLoginForm />
            </div>
          </div>

          <div className="col-12 col-lg-6 py-3">
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: "20px",
                marginTop: isMobile ? "-50px" : "50px",
              }}
            >
              {/* State Selection */}
              <FormControl fullWidth sx={{
                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#9e9e9e',
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#9e9e9e',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#9e9e9e',
                },
              }}>
                <InputLabel id="state-select-label">Select State</InputLabel>
                <Select
                  labelId="state-select-label"
                  id="state-select"
                  value={selectedState}
                  label="Select State"
                  onChange={handleStateChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {states.map((state) => (
                    <MenuItem key={state.state} value={state.state}>
                      {state.state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* District Selection */}
              <FormControl fullWidth sx={{
                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#9e9e9e',
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#9e9e9e',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#9e9e9e',
                },
              }}>
                <InputLabel id="district-select-label">Select District</InputLabel>
                <Select
                  labelId="district-select-label"
                  id="district-select"
                  value={selectedDistrict}
                  label="Select District"
                  onChange={handleDistrictChange}
                  disabled={!selectedState}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {states.find(state => state.state === selectedState)?.districts.map((district) => (
                    <MenuItem key={district} value={district}>
                      {district}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Display the Schools in a Table or No schools found message */}
            {schools.length > 0 ? (
              <Box mt={4} sx={{ overflowX: 'auto' }}>
                <Paper elevation={3}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">State</TableCell>
                        <TableCell align="center">District</TableCell>
                        <TableCell align="center">School Name</TableCell>
                        <TableCell align="center">School Code</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {schools.map((school, index) => (
                        <TableRow key={index}>
                          <TableCell align="center">{selectedState}</TableCell>
                          <TableCell align="center">{selectedDistrict}</TableCell>
                          <TableCell align="center">{school.name}</TableCell>
                          <TableCell align="center">{school.code}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </Box>
            ) : (
              <Box mt={4} textAlign="center">
                <Typography variant="h6" color="textSecondary">
                  No schools found for the selected district.
                </Typography>
              </Box>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
