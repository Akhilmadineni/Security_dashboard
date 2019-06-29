

/*
    Makes the search bar interactive using select2 and uses an object containing
    the three-letter country IDs and their textual representations.
*/
(function($) {
    $(function() {
        var isoCountries = [{
                "text": "Worldwide",
                "id": "World"
            },
            {
                "text": "Afghanistan",
                "id": "AFG",
                "country-code": "004"
            },
            {
                "text": "Åland Islands",
                "id": "ALA",
                "country-code": "248"
            },
            {
                "text": "Albania",
                "id": "ALB",
                "country-code": "008"
            },
            {
                "text": "Algeria",
                "id": "DZA",
                "country-code": "012"
            },
            {
                "text": "American Samoa",
                "id": "ASM",
                "country-code": "016"
            },
            {
                "text": "Andorra",
                "id": "AND",
                "country-code": "020"
            },
            {
                "text": "Angola",
                "id": "AGO",
                "country-code": "024"
            },
            {
                "text": "Anguilla",
                "id": "AIA",
                "country-code": "660"
            },
            {
                "text": "Antarctica",
                "id": "ATA",
                "country-code": "010"
            },
            {
                "text": "Antigua and Barbuda",
                "id": "ATG",
                "country-code": "028"
            },
            {
                "text": "Argentina",
                "id": "ARG",
                "country-code": "032"
            },
            {
                "text": "Armenia",
                "id": "ARM",
                "country-code": "051"
            },
            {
                "text": "Aruba",
                "id": "ABW",
                "country-code": "533"
            },
            {
                "text": "Australia",
                "id": "AUS",
                "country-code": "036"
            },
            {
                "text": "Austria",
                "id": "AUT",
                "country-code": "040"
            },
            {
                "text": "Azerbaijan",
                "id": "AZE",
                "country-code": "031"
            },
            {
                "text": "Bahamas",
                "id": "BHS",
                "country-code": "044"
            },
            {
                "text": "Bahrain",
                "id": "BHR",
                "country-code": "048"
            },
            {
                "text": "Bangladesh",
                "id": "BGD",
                "country-code": "050"
            },
            {
                "text": "Barbados",
                "id": "BRB",
                "country-code": "052"
            },
            {
                "text": "Belarus",
                "id": "BLR",
                "country-code": "112"
            },
            {
                "text": "Belgium",
                "id": "BEL",
                "country-code": "056"
            },
            {
                "text": "Belize",
                "id": "BLZ",
                "country-code": "084"
            },
            {
                "text": "Benin",
                "id": "BEN",
                "country-code": "204"
            },
            {
                "text": "Bermuda",
                "id": "BMU",
                "country-code": "060"
            },
            {
                "text": "Bhutan",
                "id": "BTN",
                "country-code": "064"
            },
            {
                "text": "Bolivia",
                "id": "BOL",
                "country-code": "068"
            },
            {
                "text": "Bonaire, Sint Eustatius, Saba",
                "id": "BES",
                "country-code": "535"
            },
            {
                "text": "Bosnia and Herzegovina",
                "id": "BIH",
                "country-code": "070"
            },
            {
                "text": "Botswana",
                "id": "BWA",
                "country-code": "072"
            },
            {
                "text": "Bouvet Island",
                "id": "BVT",
                "country-code": "074"
            },
            {
                "text": "Brazil",
                "id": "BRA",
                "country-code": "076"
            },
            {
                "text": "British Indian Ocean Territory",
                "id": "IOT",
                "country-code": "086"
            },
            {
                "text": "Brunei Darussalam",
                "id": "BRN",
                "country-code": "096"
            },
            {
                "text": "Bulgaria",
                "id": "BGR",
                "country-code": "100"
            },
            {
                "text": "Burkina Faso",
                "id": "BFA",
                "country-code": "854"
            },
            {
                "text": "Burundi",
                "id": "BDI",
                "country-code": "108"
            },
            {
                "text": "Cambodia",
                "id": "KHM",
                "country-code": "116"
            },
            {
                "text": "Cameroon",
                "id": "CMR",
                "country-code": "120"
            },
            {
                "text": "Canada",
                "id": "CAN",
                "country-code": "124"
            },
            {
                "text": "Cabo Verde",
                "id": "CPV",
                "country-code": "132"
            },
            {
                "text": "Cayman Islands",
                "id": "CYM",
                "country-code": "136"
            },
            {
                "text": "Central African Republic",
                "id": "CAF",
                "country-code": "140"
            },
            {
                "text": "Chad",
                "id": "TCD",
                "country-code": "148"
            },
            {
                "text": "Chile",
                "id": "CHL",
                "country-code": "152"
            },
            {
                "text": "China",
                "id": "CHN",
                "country-code": "156"
            },
            {
                "text": "Christmas Island",
                "id": "CXR",
                "country-code": "162"
            },
            {
                "text": "Cocos (Keeling) Islands",
                "id": "CCK",
                "country-code": "166"
            },
            {
                "text": "Colombia",
                "id": "COL",
                "country-code": "170"
            },
            {
                "text": "Comoros",
                "id": "COM",
                "country-code": "174"
            },
            {
                "text": "Congo",
                "id": "COG",
                "country-code": "178"
            },
            {
                "text": "Congo",
                "id": "COD",
                "country-code": "180"
            },
            {
                "text": "Cook Islands",
                "id": "COK",
                "country-code": "184"
            },
            {
                "text": "Costa Rica",
                "id": "CRI",
                "country-code": "188"
            },
            {
                "text": "Côte d'Ivoire",
                "id": "CIV",
                "country-code": "384"
            },
            {
                "text": "Croatia",
                "id": "HRV",
                "country-code": "191"
            },
            {
                "text": "Cuba",
                "id": "CUB",
                "country-code": "192"
            },
            {
                "text": "Curaçao",
                "id": "CUW",
                "country-code": "531"
            },
            {
                "text": "Cyprus",
                "id": "CYP",
                "country-code": "196"
            },
            {
                "text": "Czech Republic",
                "id": "CZE",
                "country-code": "203"
            },
            {
                "text": "Denmark",
                "id": "DNK",
                "country-code": "208"
            },
            {
                "text": "Djibouti",
                "id": "DJI",
                "country-code": "262"
            },
            {
                "text": "Dominica",
                "id": "DMA",
                "country-code": "212"
            },
            {
                "text": "Dominican Republic",
                "id": "DOM",
                "country-code": "214"
            },
            {
                "text": "Ecuador",
                "id": "ECU",
                "country-code": "218"
            },
            {
                "text": "Egypt",
                "id": "EGY",
                "country-code": "818"
            },
            {
                "text": "El Salvador",
                "id": "SLV",
                "country-code": "222"
            },
            {
                "text": "Equatorial Guinea",
                "id": "GNQ",
                "country-code": "226"
            },
            {
                "text": "Eritrea",
                "id": "ERI",
                "country-code": "232"
            },
            {
                "text": "Estonia",
                "id": "EST",
                "country-code": "233"
            },
            {
                "text": "Ethiopia",
                "id": "ETH",
                "country-code": "231"
            },
            {
                "text": "Falkland Islands (Malvinas)",
                "id": "FLK",
                "country-code": "238"
            },
            {
                "text": "Faroe Islands",
                "id": "FRO",
                "country-code": "234"
            },
            {
                "text": "Fiji",
                "id": "FJI",
                "country-code": "242"
            },
            {
                "text": "Finland",
                "id": "FIN",
                "country-code": "246"
            },
            {
                "text": "France",
                "id": "FRA",
                "country-code": "250"
            },
            {
                "text": "French Guiana",
                "id": "GUF",
                "country-code": "254"
            },
            {
                "text": "French Polynesia",
                "id": "PYF",
                "country-code": "258"
            },
            {
                "text": "French Southern Territories",
                "id": "ATF",
                "country-code": "260"
            },
            {
                "text": "Gabon",
                "id": "GAB",
                "country-code": "266"
            },
            {
                "text": "Gambia",
                "id": "GMB",
                "country-code": "270"
            },
            {
                "text": "Georgia",
                "id": "GEO",
                "country-code": "268"
            },
            {
                "text": "Germany",
                "id": "DEU",
                "country-code": "276"
            },
            {
                "text": "Ghana",
                "id": "GHA",
                "country-code": "288"
            },
            {
                "text": "Gibraltar",
                "id": "GIB",
                "country-code": "292"
            },
            {
                "text": "Greece",
                "id": "GRC",
                "country-code": "300"
            },
            {
                "text": "Greenland",
                "id": "GRL",
                "country-code": "304"
            },
            {
                "text": "Grenada",
                "id": "GRD",
                "country-code": "308"
            },
            {
                "text": "Guadeloupe",
                "id": "GLP",
                "country-code": "312"
            },
            {
                "text": "Guam",
                "id": "GUM",
                "country-code": "316"
            },
            {
                "text": "Guatemala",
                "id": "GTM",
                "country-code": "320"
            },
            {
                "text": "Guernsey",
                "id": "GGY",
                "country-code": "831"
            },
            {
                "text": "Guinea",
                "id": "GIN",
                "country-code": "324"
            },
            {
                "text": "Guinea-Bissau",
                "id": "GNB",
                "country-code": "624"
            },
            {
                "text": "Guyana",
                "id": "GUY",
                "country-code": "328"
            },
            {
                "text": "Haiti",
                "id": "HTI",
                "country-code": "332"
            },
            {
                "text": "Heard Island",
                "id": "HMD",
                "country-code": "334"
            },
            {
                "text": "Holy See",
                "id": "VAT",
                "country-code": "336"
            },
            {
                "text": "Honduras",
                "id": "HND",
                "country-code": "340"
            },
            {
                "text": "Hong Kong",
                "id": "HKG",
                "country-code": "344"
            },
            {
                "text": "Hungary",
                "id": "HUN",
                "country-code": "348"
            },
            {
                "text": "Iceland",
                "id": "ISL",
                "country-code": "352"
            },
            {
                "text": "India",
                "id": "IND",
                "country-code": "356"
            },
            {
                "text": "Indonesia",
                "id": "IDN",
                "country-code": "360"
            },
            {
                "text": "Iran (Islamic Republic of)",
                "id": "IRN",
                "country-code": "364"
            },
            {
                "text": "Iraq",
                "id": "IRQ",
                "country-code": "368"
            },
            {
                "text": "Ireland",
                "id": "IRL",
                "country-code": "372"
            },
            {
                "text": "Isle of Man",
                "id": "IMN",
                "country-code": "833"
            },
            {
                "text": "Israel",
                "id": "ISR",
                "country-code": "376"
            },
            {
                "text": "Italy",
                "id": "ITA",
                "country-code": "380"
            },
            {
                "text": "Jamaica",
                "id": "JAM",
                "country-code": "388"
            },
            {
                "text": "Japan",
                "id": "JPN",
                "country-code": "392"
            },
            {
                "text": "Jersey",
                "id": "JEY",
                "country-code": "832"
            },
            {
                "text": "Jordan",
                "id": "JOR",
                "country-code": "400"
            },
            {
                "text": "Kazakhstan",
                "id": "KAZ",
                "country-code": "398"
            },
            {
                "text": "Kenya",
                "id": "KEN",
                "country-code": "404"
            },
            {
                "text": "Kiribati",
                "id": "KIR",
                "country-code": "296"
            },
            {
                "text": "Korea",
                "id": "PRK",
                "country-code": "408"
            },
            {
                "text": "Korea (Republic of)",
                "id": "KOR",
                "country-code": "410"
            },
            {
                "text": "Kuwait",
                "id": "KWT",
                "country-code": "414"
            },
            {
                "text": "Kyrgyzstan",
                "id": "KGZ",
                "country-code": "417"
            },
            {
                "text": "Latvia",
                "id": "LVA",
                "country-code": "428"
            },
            {
                "text": "Lebanon",
                "id": "LBN",
                "country-code": "422"
            },
            {
                "text": "Lesotho",
                "id": "LSO",
                "country-code": "426"
            },
            {
                "text": "Liberia",
                "id": "LBR",
                "country-code": "430"
            },
            {
                "text": "Libya",
                "id": "LBY",
                "country-code": "434"
            },
            {
                "text": "Liechtenstein",
                "id": "LIE",
                "country-code": "438"
            },
            {
                "text": "Lithuania",
                "id": "LTU",
                "country-code": "440"
            },
            {
                "text": "Luxembourg",
                "id": "LUX",
                "country-code": "442"
            },
            {
                "text": "Macao",
                "id": "MAC",
                "country-code": "446"
            },
            {
                "text": "Macedonia",
                "id": "MKD",
                "country-code": "807"
            },
            {
                "text": "Madagascar",
                "id": "MDG",
                "country-code": "450"
            },
            {
                "text": "Malawi",
                "id": "MWI",
                "country-code": "454"
            },
            {
                "text": "Malaysia",
                "id": "MYS",
                "country-code": "458"
            },
            {
                "text": "Maldives",
                "id": "MDV",
                "country-code": "462"
            },
            {
                "text": "Mali",
                "id": "MLI",
                "country-code": "466"
            },
            {
                "text": "Malta",
                "id": "MLT",
                "country-code": "470"
            },
            {
                "text": "Marshall Islands",
                "id": "MHL",
                "country-code": "584"
            },
            {
                "text": "Martinique",
                "id": "MTQ",
                "country-code": "474"
            },
            {
                "text": "Mauritania",
                "id": "MRT",
                "country-code": "478"
            },
            {
                "text": "Mauritius",
                "id": "MUS",
                "country-code": "480"
            },
            {
                "text": "Mayotte",
                "id": "MYT",
                "country-code": "175"
            },
            {
                "text": "Mexico",
                "id": "MEX",
                "country-code": "484"
            },
            {
                "text": "Micronesia",
                "id": "FSM",
                "country-code": "583"
            },
            {
                "text": "Moldova (Republic of)",
                "id": "MDA",
                "country-code": "498"
            },
            {
                "text": "Monaco",
                "id": "MCO",
                "country-code": "492"
            },
            {
                "text": "Mongolia",
                "id": "MNG",
                "country-code": "496"
            },
            {
                "text": "Montenegro",
                "id": "MNE",
                "country-code": "499"
            },
            {
                "text": "Montserrat",
                "id": "MSR",
                "country-code": "500"
            },
            {
                "text": "Morocco",
                "id": "MAR",
                "country-code": "504"
            },
            {
                "text": "Mozambique",
                "id": "MOZ",
                "country-code": "508"
            },
            {
                "text": "Myanmar",
                "id": "MMR",
                "country-code": "104"
            },
            {
                "text": "Namibia",
                "id": "NAM",
                "country-code": "516"
            },
            {
                "text": "Nauru",
                "id": "NRU",
                "country-code": "520"
            },
            {
                "text": "Nepal",
                "id": "NPL",
                "country-code": "524"
            },
            {
                "text": "Netherlands",
                "id": "NLD",
                "country-code": "528"
            },
            {
                "text": "New Caledonia",
                "id": "NCL",
                "country-code": "540"
            },
            {
                "text": "New Zealand",
                "id": "NZL",
                "country-code": "554"
            },
            {
                "text": "Nicaragua",
                "id": "NIC",
                "country-code": "558"
            },
            {
                "text": "Niger",
                "id": "NER",
                "country-code": "562"
            },
            {
                "text": "Nigeria",
                "id": "NGA",
                "country-code": "566"
            },
            {
                "text": "Niue",
                "id": "NIU",
                "country-code": "570"
            },
            {
                "text": "Norfolk Island",
                "id": "NFK",
                "country-code": "574"
            },
            {
                "text": "Northern Mariana Islands",
                "id": "MNP",
                "country-code": "580"
            },
            {
                "text": "Norway",
                "id": "NOR",
                "country-code": "578"
            },
            {
                "text": "Oman",
                "id": "OMN",
                "country-code": "512"
            },
            {
                "text": "Pakistan",
                "id": "PAK",
                "country-code": "586"
            },
            {
                "text": "Palau",
                "id": "PLW",
                "country-code": "585"
            },
            {
                "text": "Palestine, State of",
                "id": "PSE",
                "country-code": "275"
            },
            {
                "text": "Panama",
                "id": "PAN",
                "country-code": "591"
            },
            {
                "text": "Papua New Guinea",
                "id": "PNG",
                "country-code": "598"
            },
            {
                "text": "Paraguay",
                "id": "PRY",
                "country-code": "600"
            },
            {
                "text": "Peru",
                "id": "PER",
                "country-code": "604"
            },
            {
                "text": "Philippines",
                "id": "PHL",
                "country-code": "608"
            },
            {
                "text": "Pitcairn",
                "id": "PCN",
                "country-code": "612"
            },
            {
                "text": "Poland",
                "id": "POL",
                "country-code": "616"
            },
            {
                "text": "Portugal",
                "id": "PRT",
                "country-code": "620"
            },
            {
                "text": "Puerto Rico",
                "id": "PRI",
                "country-code": "630"
            },
            {
                "text": "Qatar",
                "id": "QAT",
                "country-code": "634"
            },
            {
                "text": "Réunion",
                "id": "REU",
                "country-code": "638"
            },
            {
                "text": "Romania",
                "id": "ROU",
                "country-code": "642"
            },
            {
                "text": "Russian Federation",
                "id": "RUS",
                "country-code": "643"
            },
            {
                "text": "Rwanda",
                "id": "RWA",
                "country-code": "646"
            },
            {
                "text": "Saint Barthélemy",
                "id": "BLM",
                "country-code": "652"
            },
            {
                "text": "Saint Helena",
                "id": "SHN",
                "country-code": "654"
            },
            {
                "text": "Saint Kitts and Nevis",
                "id": "KNA",
                "country-code": "659"
            },
            {
                "text": "Saint Lucia",
                "id": "LCA",
                "country-code": "662"
            },
            {
                "text": "Saint Martin (French part)",
                "id": "MAF",
                "country-code": "663"
            },
            {
                "text": "Saint Pierre and Miquelon",
                "id": "SPM",
                "country-code": "666"
            },
            {
                "text": "Saint Vincent",
                "id": "VCT",
                "country-code": "670"
            },
            {
                "text": "Samoa",
                "id": "WSM",
                "country-code": "882"
            },
            {
                "text": "San Marino",
                "id": "SMR",
                "country-code": "674"
            },
            {
                "text": "Sao Tome and Principe",
                "id": "STP",
                "country-code": "678"
            },
            {
                "text": "Saudi Arabia",
                "id": "SAU",
                "country-code": "682"
            },
            {
                "text": "Senegal",
                "id": "SEN",
                "country-code": "686"
            },
            {
                "text": "Serbia",
                "id": "SRB",
                "country-code": "688"
            },
            {
                "text": "Seychelles",
                "id": "SYC",
                "country-code": "690"
            },
            {
                "text": "Sierra Leone",
                "id": "SLE",
                "country-code": "694"
            },
            {
                "text": "Singapore",
                "id": "SGP",
                "country-code": "702"
            },
            {
                "text": "Sint Maarten",
                "id": "SXM",
                "country-code": "534"
            },
            {
                "text": "Slovakia",
                "id": "SVK",
                "country-code": "703"
            },
            {
                "text": "Slovenia",
                "id": "SVN",
                "country-code": "705"
            },
            {
                "text": "Solomon Islands",
                "id": "SLB",
                "country-code": "090"
            },
            {
                "text": "Somalia",
                "id": "SOM",
                "country-code": "706"
            },
            {
                "text": "South Africa",
                "id": "ZAF",
                "country-code": "710"
            },
            {
                "text": "South Georgia",
                "id": "SGS",
                "country-code": "239"
            },
            {
                "text": "South Sudan",
                "id": "SSD",
                "country-code": "728"
            },
            {
                "text": "Spain",
                "id": "ESP",
                "country-code": "724"
            },
            {
                "text": "Sri Lanka",
                "id": "LKA",
                "country-code": "144"
            },
            {
                "text": "Sudan",
                "id": "SDN",
                "country-code": "729"
            },
            {
                "text": "Suritext",
                "id": "SUR",
                "country-code": "740"
            },
            {
                "text": "Svalbard and Jan Mayen",
                "id": "SJM",
                "country-code": "744"
            },
            {
                "text": "Swaziland",
                "id": "SWZ",
                "country-code": "748"
            },
            {
                "text": "Sweden",
                "id": "SWE",
                "country-code": "752"
            },
            {
                "text": "Switzerland",
                "id": "CHE",
                "country-code": "756"
            },
            {
                "text": "Syrian Arab Republic",
                "id": "SYR",
                "country-code": "760"
            },
            {
                "text": "Taiwan, Province of China",
                "id": "TWN",
                "country-code": "158"
            },
            {
                "text": "Tajikistan",
                "id": "TJK",
                "country-code": "762"
            },
            {
                "text": "Tanzania",
                "id": "TZA",
                "country-code": "834"
            },
            {
                "text": "Thailand",
                "id": "THA",
                "country-code": "764"
            },
            {
                "text": "Timor-Leste",
                "id": "TLS",
                "country-code": "626"
            },
            {
                "text": "Togo",
                "id": "TGO",
                "country-code": "768"
            },
            {
                "text": "Tokelau",
                "id": "TKL",
                "country-code": "772"
            },
            {
                "text": "Tonga",
                "id": "TON",
                "country-code": "776"
            },
            {
                "text": "Trinidad and Tobago",
                "id": "TTO",
                "country-code": "780"
            },
            {
                "text": "Tunisia",
                "id": "TUN",
                "country-code": "788"
            },
            {
                "text": "Turkey",
                "id": "TUR",
                "country-code": "792"
            },
            {
                "text": "Turkmenistan",
                "id": "TKM",
                "country-code": "795"
            },
            {
                "text": "Turks and Caicos Islands",
                "id": "TCA",
                "country-code": "796"
            },
            {
                "text": "Tuvalu",
                "id": "TUV",
                "country-code": "798"
            },
            {
                "text": "Uganda",
                "id": "UGA",
                "country-code": "800"
            },
            {
                "text": "Ukraine",
                "id": "UKR",
                "country-code": "804"
            },
            {
                "text": "United Arab Emirates",
                "id": "ARE",
                "country-code": "784"
            },
            {
                "text": "United Kingdom",
                "id": "GBR",
                "country-code": "826"
            },
            {
                "text": "United States of America",
                "id": "USA",
                "country-code": "840"
            },
            {
                "text": "Uruguay",
                "id": "URY",
                "country-code": "858"
            },
            {
                "text": "Uzbekistan",
                "id": "UZB",
                "country-code": "860"
            },
            {
                "text": "Vanuatu",
                "id": "VUT",
                "country-code": "548"
            },
            {
                "text": "Venezuela",
                "id": "VEN",
                "country-code": "862"
            },
            {
                "text": "Vietnam",
                "id": "VNM",
                "country-code": "704"
            },
            {
                "text": "Virgin Islands (British)",
                "id": "VGB",
                "country-code": "092"
            },
            {
                "text": "Virgin Islands (U.S.)",
                "id": "VIR",
                "country-code": "850"
            },
            {
                "text": "Wallis and Futuna",
                "id": "WLF",
                "country-code": "876"
            },
            {
                "text": "Western Sahara",
                "id": "ESH",
                "country-code": "732"
            },
            {
                "text": "Yemen",
                "id": "YEM",
                "country-code": "887"
            },
            {
                "text": "Zambia",
                "id": "ZMB",
                "country-code": "894"
            },
            {
                "text": "Zimbabwe",
                "id": "ZWE",
                "country-code": "716"
            }
        ];

        // passing country data to search bar and using bootstrap theme
        $("[name='country']").select2({
            data: isoCountries,
            width: '100%',
            theme: "bootstrap"
        });

    });
})(jQuery);
