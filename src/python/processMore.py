
import json

with open("src/data/industryvstype.json") as f:
    # x axis labels
    industries = ["Retail", "Public", "Professional", "Information", "Finance", "Accommodation", "Health Care", "Administrative", "Wholesale", "Educational", "Transportation",
                  "Manufacturing", "Unknown", "Other Services", "Real Estate", "Construction", "Management", "Entertainment", "Utilities", "Mining", "Agriculture"]

    # y axis labels
    actions = ["Misuse", "Error", "Hacking", "Physical",
               "Unknown", "Malware", "Social", "Environmental"]

    # load in the JSON file
    j = json.load(f)

    # new data is stored in newDict
    newDict = []

    # loop over each year of data in the JSON
    for year in j:
        # only keep data starting from 2010 to keep file size down
        if year != "All-time" and int(year) > 2009:
            for country in j[year]:
                for industry in industries:
                    for action in actions:
                        # for every country add the industry and action info
                        newDict.append({})
                        newDict[-1].update({"year": year,
                                            "country": country,
                                            "industry": industry,
                                            "action": action,
                                            "value": j[year][country]
                                            [industries.index(
                                                industry)][action]
                                            })

    # same as the loop above, now accounting for all-time info
    for year in j:
        if year == "All-time":
            for industry in industries:
                for action in actions:
                    print(industry)
                    print(action)
                    print(j['All-time'][industries.index(industry)][action])
                    newDict.append({})
                    newDict[-1].update({"year": "All-time",
                                        "country": "World",
                                        "industry": industry,
                                        "action": action,
                                        "value": j['All-time']
                                        [industries.index(industry)][action]
                                        })
    # output the resulting dict
    print(json.dumps(newDict))

# save it as a new json file
with open('testHeatmapData3.json', 'w') as outfile:
    json.dump(newDict, outfile)
