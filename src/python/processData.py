
import json

from collections import Counter

# load in orginal dataset
with open('src/data/finaltest.json') as f:
    j = json.load(f)
    newDict = {}

    # create dict keys
    for year in j:
        year = str(year['timeline']['incident']['year'])
        newDict[year] = {}

    # create dict keys
    for country in j:
        year = str(country['timeline']['incident']['year'])
        country = country['victim']['country'][0]
        if country != None:
            newDict[year][country] = {}

    # each industry that we should track
    industries = ["Public", "Professional", "Information", "Finance", "Accommodation", "Health Care", "Administrative", "Wholesale", "Educational", "Transportation",
        "Manufacturing", "Unknown", "Other Services", "Real Estate", "Construction", "Management", "Entertainment", "Utilities", "Mining", "Agriculture"]

    # each action that we should track
    actions = ["Misuse", "Error", "Hacking", "Physical", "Unknown", "Malware", "Social", "Environmental"]

    # keep a counter for every industry (all time period)
    Retail_all = Counter()
    Public_all = Counter()
    Professional_all = Counter()
    Information_all = Counter()
    Finance_all = Counter()
    Accommodation_all = Counter()
    Health_Care_all = Counter()
    Administrative_all = Counter()
    Wholesale_all = Counter()
    Educational_all = Counter()
    Transportation_all = Counter()
    Manufacturing_all = Counter()
    Unknown_all = Counter()
    Other_Services_all = Counter()
    Real_Estate_all = Counter()
    Construction_all = Counter()
    Management_all = Counter()
    Entertainment_all = Counter()
    Utilities_all = Counter()
    Mining_all = Counter()
    Agriculture_all = Counter()

    # keep a counter for every industry (yearly period)
    for year in newDict:
        Retail_world = Counter()
        Public_world = Counter()
        Professional_world = Counter()
        Information_world = Counter()
        Finance_world = Counter()
        Accommodation_world = Counter()
        Health_Care_world = Counter()
        Administrative_world = Counter()
        Wholesale_world = Counter()
        Educational_world = Counter()
        Transportation_world = Counter()
        Manufacturing_world = Counter()
        Unknown_world = Counter()
        Other_Services_world = Counter()
        Real_Estate_world = Counter()
        Construction_world = Counter()
        Management_world = Counter()
        Entertainment_world = Counter()
        Utilities_world = Counter()
        Mining_world = Counter()
        Agriculture_world = Counter()

        # worldwide count
        newDict[str(year)]['World'] = {}
        newDict[str(year)]['World'] = [{'industry': 'Retail'}]
        for industry in industries:
            newDict[str(year)]['World'].append({'industry': industry})
            for act in actions:
                newDict[str(year)]['World'][0].update({act: 0})
                newDict[str(year)]['World'][-1].update({act: 0})

        # more counters for every country (yearly period)
        for country in newDict[year]:
            if country != 'null':
                Retail = Counter()
                Public = Counter()
                Professional = Counter()
                Information = Counter()
                Finance = Counter()
                Accommodation = Counter()
                Health_Care = Counter()
                Administrative = Counter()
                Wholesale = Counter()
                Educational = Counter()
                Transportation = Counter()
                Manufacturing = Counter()
                Unknown = Counter()
                Other_Services = Counter()
                Real_Estate = Counter()
                Construction = Counter()
                Management = Counter()
                Entertainment = Counter()
                Utilities = Counter()
                Mining = Counter()
                Agriculture = Counter()

            # count by country
            newDict[str(year)][country] = [{'industry': 'Retail'}]
            for industry in industries:
                newDict[str(year)][country].append({'industry': industry})
                for act in actions:
                    newDict[str(year)][country][0].update({act: 0})
                    newDict[str(year)][country][-1].update({act: 0})

            # update the counter for each industry if we see them in the dataset
            for entry in j:
                if entry['timeline']['incident']['year'] == int(year) and entry['victim']['country'][0] == country:
                        for key in entry['action']:
                            if entry['victim']['industry'] == 'Retail':
                                Retail.update([key])
                                Retail_world.update([key])
                                Retail_all.update([key])
                            elif entry['victim']['industry'] == 'Public':
                                Public.update([key])
                                Public_world.update([key])
                                Public_all.update([key])
                            elif entry['victim']['industry'] == 'Professional':
                                Professional.update([key])
                                Professional_world.update([key])
                                Professional_all.update([key])
                            elif entry['victim']['industry'] == 'Information':
                                Information.update([key])
                                Information_world.update([key])
                                Information_all.update([key])
                            elif entry['victim']['industry'] == 'Finance':
                                Finance.update([key])
                                Finance_world.update([key])
                                Finance_all.update([key])
                            elif entry['victim']['industry'] == 'Accommodation':
                                Accommodation.update([key])
                                Accommodation_world.update([key])
                                Accommodation_all.update([key])
                            elif entry['victim']['industry'] == 'Health Care':
                                Health_Care.update([key])
                                Health_Care_world.update([key])
                                Health_Care_all.update([key])
                            elif entry['victim']['industry'] == 'Administrative':
                                Administrative.update([key])
                                Administrative_world.update([key])
                                Administrative_all.update([key])
                            elif entry['victim']['industry'] == 'Wholesale':
                                Wholesale.update([key])
                                Wholesale_world.update([key])
                                Wholesale_all.update([key])
                            elif entry['victim']['industry'] == 'Educational':
                                Educational.update([key])
                                Educational_world.update([key])
                                Educational_all.update([key])
                            elif entry['victim']['industry'] == 'Transportation':
                                Transportation.update([key])
                                Transportation_world.update([key])
                                Transportation_all.update([key])
                            elif entry['victim']['industry'] == 'Manufacturing':
                                Manufacturing.update([key])
                                Manufacturing_world.update([key])
                                Manufacturing_all.update([key])
                            elif entry['victim']['industry'] == 'Unknown':
                                Unknown.update([key])
                                Unknown_world.update([key])
                                Unknown_all.update([key])
                            elif entry['victim']['industry'] == 'Other Services':
                                Other_Services.update([key])
                                Other_Services_world.update([key])
                                Other_Services_all.update([key])
                            elif entry['victim']['industry'] == 'Real Estate':
                                Real_Estate.update([key])
                                Real_Estate_world.update([key])
                                Real_Estate_all.update([key])
                            elif entry['victim']['industry'] == 'Construction':
                                Construction.update([key])
                                Construction_world.update([key])
                                Construction_all.update([key])
                            elif entry['victim']['industry'] == 'Management':
                                Management.update([key])
                                Management_world.update([key])
                                Management_all.update([key])
                            elif entry['victim']['industry'] == 'Entertainment':
                                Entertainment.update([key])
                                Entertainment_world.update([key])
                                Entertainment_all.update([key])
                            elif entry['victim']['industry'] == 'Utilities':
                                Utilities.update([key])
                                Utilities_world.update([key])
                                Utilities_all.update([key])
                            elif entry['victim']['industry'] == 'Mining':
                                Mining.update([key])
                                Mining_world.update([key])
                                Mining_all.update([key])
                            elif entry['victim']['industry'] == 'Agriculture':
                                Agriculture.update([key])
                                Agriculture_world.update([key])
                                Agriculture_all.update([key])

                        # update every action count for each industry
                        for action in Retail:
                            newDict[str(year)][country][0].update({action.capitalize(): Retail[action]})
                        for action in Public:
                            newDict[str(year)][country][1].update({action.capitalize(): Public[action]})
                        for action in Professional:
                            newDict[str(year)][country][2].update({action.capitalize(): Professional[action]})
                        for action in Information:
                            newDict[str(year)][country][3].update({action.capitalize(): Information[action]})
                        for action in Finance:
                            newDict[str(year)][country][4].update({action.capitalize(): Finance[action]})
                        for action in Accommodation:
                            newDict[str(year)][country][5].update({action.capitalize(): Accommodation[action]})
                        for action in Health_Care:
                            newDict[str(year)][country][6].update({action.capitalize(): Health_Care[action]})
                        for action in Administrative:
                            newDict[str(year)][country][7].update({action.capitalize(): Administrative[action]})
                        for action in Wholesale:
                            newDict[str(year)][country][8].update({action.capitalize(): Wholesale[action]})
                        for action in Educational:
                            newDict[str(year)][country][9].update({action.capitalize(): Educational[action]})
                        for action in Transportation:
                            newDict[str(year)][country][10].update({action.capitalize(): Transportation[action]})
                        for action in Manufacturing:
                            newDict[str(year)][country][11].update({action.capitalize(): Manufacturing[action]})
                        for action in Unknown:
                            newDict[str(year)][country][12].update({action.capitalize(): Unknown[action]})
                        for action in Other_Services:
                            newDict[str(year)][country][13].update({action.capitalize(): Other_Services[action]})
                        for action in Real_Estate:
                            newDict[str(year)][country][14].update({action.capitalize(): Real_Estate[action]})
                        for action in Construction:
                            newDict[str(year)][country][15].update({action.capitalize(): Construction[action]})
                        for action in Management:
                            newDict[str(year)][country][16].update({action.capitalize(): Management[action]})
                        for action in Entertainment:
                            newDict[str(year)][country][17].update({action.capitalize(): Entertainment[action]})
                        for action in Utilities:
                            newDict[str(year)][country][18].update({action.capitalize(): Utilities[action]})
                        for action in Mining:
                            newDict[str(year)][country][19].update({action.capitalize(): Mining[action]})
                        for action in Agriculture:
                            newDict[str(year)][country][20].update({action.capitalize(): Agriculture[action]})

        # update every action count for each industry (worldwide)
        for action in Retail_world:
            newDict[str(year)][country][0].update({action.capitalize(): Retail_world[action]})
        for action in Public_world:
            newDict[str(year)][country][1].update({action.capitalize(): Public_world[action]})
        for action in Professional_world:
            newDict[str(year)][country][2].update({action.capitalize(): Professional_world[action]})
        for action in Information_world:
            newDict[str(year)][country][3].update({action.capitalize(): Information_world[action]})
        for action in Finance_world:
            newDict[str(year)][country][4].update({action.capitalize(): Finance_world[action]})
        for action in Accommodation_world:
            newDict[str(year)][country][5].update({action.capitalize(): Accommodation_world[action]})
        for action in Health_Care_world:
            newDict[str(year)][country][6].update({action.capitalize(): Health_Care_world[action]})
        for action in Administrative_world:
            newDict[str(year)][country][7].update({action.capitalize(): Administrative_world[action]})
        for action in Wholesale_world:
            newDict[str(year)][country][8].update({action.capitalize(): Wholesale_world[action]})
        for action in Educational_world:
            newDict[str(year)][country][9].update({action.capitalize(): Educational_world[action]})
        for action in Transportation_world:
            newDict[str(year)][country][10].update({action.capitalize(): Transportation_world[action]})
        for action in Manufacturing_world:
            newDict[str(year)][country][11].update({action.capitalize(): Manufacturing_world[action]})
        for action in Unknown_world:
            newDict[str(year)][country][12].update({action.capitalize(): Unknown_world[action]})
        for action in Other_Services_world:
            newDict[str(year)][country][13].update({action.capitalize(): Other_Services_world[action]})
        for action in Real_Estate_world:
            newDict[str(year)][country][14].update({action.capitalize(): Real_Estate_world[action]})
        for action in Construction_world:
            newDict[str(year)][country][15].update({action.capitalize(): Construction_world[action]})
        for action in Management_world:
            newDict[str(year)][country][16].update({action.capitalize(): Management_world[action]})
        for action in Entertainment_world:
            newDict[str(year)][country][17].update({action.capitalize(): Entertainment_world[action]})
        for action in Utilities_world:
            newDict[str(year)][country][18].update({action.capitalize(): Utilities_world[action]})
        for action in Mining_world:
            newDict[str(year)][country][19].update({action.capitalize(): Mining_world[action]})
        for action in Agriculture_world:
            newDict[str(year)][country][20].update({action.capitalize(): Agriculture_world[action]})

    # create all-time key to get an aggregated result
    newDict['All-time'] = [{'industry': 'Retail'}]
    for indu in industries:
        newDict['All-time'].append({'industry': indu})
        for ac in actions:
            newDict['All-time'][0].update({ac: 0})
            newDict['All-time'][-1].update({ac: 0})

    # count some more
    for action in Retail_all:
        newDict['All-time'][0].update({action.capitalize(): Retail_all[action]})
    for action in Public_all:
        newDict['All-time'][1].update({action.capitalize(): Public_all[action]})
    for action in Professional_all:
        newDict['All-time'][2].update({action.capitalize(): Professional_all[action]})
    for action in Information_all:
        newDict['All-time'][3].update({action.capitalize(): Information_all[action]})
    for action in Finance_all:
        newDict['All-time'][4].update({action.capitalize(): Finance_all[action]})
    for action in Accommodation_all:
        newDict['All-time'][5].update({action.capitalize(): Accommodation_all[action]})
    for action in Health_Care_all:
        newDict['All-time'][6].update({action.capitalize(): Health_Care_all[action]})
    for action in Administrative_all:
        newDict['All-time'][7].update({action.capitalize(): Administrative_all[action]})
    for action in Wholesale_all:
        newDict['All-time'][8].update({action.capitalize(): Wholesale_all[action]})
    for action in Educational_all:
        newDict['All-time'][9].update({action.capitalize(): Educational_all[action]})
    for action in Transportation_all:
        newDict['All-time'][10].update({action.capitalize(): Transportation_all[action]})
    for action in Manufacturing_all:
        newDict['All-time'][11].update({action.capitalize(): Manufacturing_all[action]})
    for action in Unknown_all:
        newDict['All-time'][12].update({action.capitalize(): Unknown_all[action]})
    for action in Other_Services_all:
        newDict['All-time'][13].update({action.capitalize(): Other_Services_all[action]})
    for action in Real_Estate_all:
        newDict['All-time'][14].update({action.capitalize(): Real_Estate_all[action]})
    for action in Construction_all:
        newDict['All-time'][15].update({action.capitalize(): Construction_all[action]})
    for action in Management_all:
        newDict['All-time'][16].update({action.capitalize(): Management_all[action]})
    for action in Entertainment_all:
        newDict['All-time'][17].update({action.capitalize(): Entertainment_all[action]})
    for action in Utilities_all:
        newDict['All-time'][18].update({action.capitalize(): Utilities_all[action]})
    for action in Mining_all:
        newDict['All-time'][19].update({action.capitalize(): Mining_all[action]})
    for action in Agriculture_all:
        newDict['All-time'][20].update({action.capitalize(): Agriculture_all[action]})

    # print the resulting json
    print(json.dumps(newDict))

# save the new dataset
with open('testdataset.json', 'w') as outfile:
    json.dump(newDict, outfile)
