
import json
import pandas as pd

with open("src/data/heatMapDataset.json") as f:
    j = json.load(f)

    # using pandas to group and sum the incidents
    df = pd.DataFrame(j)

    # exclude World from old dataset, we already have that data
    a = df.loc[df['country'] != "World"]

    # example used: https://stackoverflow.com/a/21674471
    grouped = a.groupby(['country', 'industry', 'action'], sort=False)
    sum = grouped.sum()

    # put the summed results in a dictionary
    result = [{"country": r[0], "industry": r[1], "action": r[2],
               "year": "All-time", "value": kv.to_dict().get("value")}
              for r, kv in sum.iterrows()]

    # save it as a new json file
    with open('testAlltimeCountries.json', 'w') as outfile:
        json.dump(result, outfile)
