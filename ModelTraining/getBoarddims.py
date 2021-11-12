import requests
import json
import numpy as np
import pandas as pd
import pickle
from itertools import chain

sync = {
    "client": {
        "enforces_product_passwords": 1,
        "enforces_layout_passwords": 1,
        "manages_power_responsibly": 1,
    },
    "GET": {
        "query": {
            "include_multiframe_climbs": 0,
            "include_all_beta_links": 1,
            "tables": [
                "products",
                "product_sizes",
                "holes",
                "leds",
                "products_angles",
                "layouts",
                "product_sizes_layouts_sets",
                "placements",
                "holds",
                "shapes",
                "sets",
                "placement_roles",
                "climbs",
                "climb_stats",
                "beta_links",
                "attempts",
                "gyms",
                "boards",
                "events",
            ],
            "syncs": {
                "shared_syncs": [
                    {
                        "table_name": "layout_deviants",
                        "last_synchronized_at": "2021-07-28 22:04:36.503605",
                    },
                    {
                        "table_name": "product_sizes_layout_deviants_sets",
                        "last_synchronized_at": "2021-07-28 22:04:36.503605",
                    },
                    {
                        "table_name": "attempts",
                        "last_synchronized_at": "2021-09-27 15:45:25.021411",
                    },
                    {
                        "table_name": "gyms",
                        "last_synchronized_at": "2021-09-27 15:45:25.021411",
                    },
                    {
                        "table_name": "boards",
                        "last_synchronized_at": "2021-09-27 15:45:25.021411",
                    },
                    {
                        "table_name": "products",
                        "last_synchronized_at": "2021-09-27 15:45:25.021411",
                    },
                    {
                        "table_name": "product_sizes",
                        "last_synchronized_at": "2021-09-27 15:45:25.021411",
                    },
                    {
                        "table_name": "holes",
                        "last_synchronized_at": "2021-09-27 15:45:25.021411",
                    },
                    {
                        "table_name": "leds",
                        "last_synchronized_at": "2021-09-27 15:45:25.021411",
                    },
                    {
                        "table_name": "sets",
                        "last_synchronized_at": "2021-09-27 15:45:25.021411",
                    },
                    {
                        "table_name": "shapes",
                        "last_synchronized_at": "2021-09-27 15:45:25.021411",
                    },
                    {
                        "table_name": "products_angles",
                        "last_synchronized_at": "2021-09-27 15:45:25.021411",
                    },
                    {
                        "table_name": "layouts",
                        "last_synchronized_at": "2021-09-27 15:45:25.021411",
                    },
                    {
                        "table_name": "product_sizes_layouts_sets",
                        "last_synchronized_at": "2021-09-27 15:45:25.021411",
                    },
                    {
                        "table_name": "holds",
                        "last_synchronized_at": "2021-09-27 15:45:25.021411",
                    },
                    {
                        "table_name": "placement_roles",
                        "last_synchronized_at": "2021-09-27 15:45:25.021411",
                    },
                    {
                        "table_name": "placements",
                        "last_synchronized_at": "2021-09-27 15:45:25.021411",
                    },
                    {
                        "table_name": "climbs",
                        "last_synchronized_at": "2021-09-27 15:45:25.021411",
                    },
                    {
                        "table_name": "climb_stats",
                        "last_synchronized_at": "2021-09-27 15:45:25.021411",
                    },
                    {
                        "table_name": "beta_links",
                        "last_synchronized_at": "2021-09-27 15:45:25.021411",
                    },
                ]
            },
        }
    },
}

r = requests.post(
    "https://api.kilterboardapp.com/v1/logins",
    json={"username": "yourusername", "password": "yourpassword"},
)

auth = "Bearer " + r.json()["token"]

headers = {"Authorization": auth}

r = requests.post("https://api.kilterboardapp.com/v1/sync", json=sync)

climbs = r.json()["PUT"]["climbs"]
climbsout = [None] * 35

for climb in climbs:
    if climb["name"] == "kblr27v2":
        fixrow = []
        for hold in climb["placements"]:
            fixrow.append(hold["placement_id"])
    elif climb["layout_id"] == 1:
        if "kblr" in climb["name"]:
            row = []
            for hold in climb["placements"]:
                row.append(hold["placement_id"])
            climbsout[int(climb["name"][4:]) - 1] = row

climbsout[26] = fixrow
climbsout[33] = list(reversed(climbsout[33]))
climbsout[34] = list(reversed(climbsout[34]))

climbsout = list(chain.from_iterable(climbsout))

with open("idmap.data", "wb") as f:
    pickle.dump(climbsout, f)
