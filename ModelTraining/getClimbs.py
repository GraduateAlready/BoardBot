import pickle
import requests
import json
import pandas as pd
import glob


def getAuth():
    r = requests.post(
        "https://api.kilterboardapp.com/v1/logins",
        json={"username": "yourusername", "password": "yourpassword"},
    )

    auth = "Bearer " + r.json()["token"]

    headers = {"Authorization": auth}

    return headers


def getPlacementMap():
    with open("idmap.data", "rb") as f:
        placementMap = pickle.load(f)

    return placementMap


def constructBinaryMap():
    binarymap = []
    for y in range(0, 476):
        binarymap.append("Blank")
    return binarymap


def mapClimb(uuid, placements, binarymap, placementMap):
    holds = binarymap[:]

    for placement in placements:
        for x in range(0, 476):
            if placement["placement_id"] == placementMap[x]:
                value = placement["role_id"]
                if value == 12:
                    holds[x] = "start"
                elif value == 13:
                    holds[x] = "mid"
                elif value == 14:
                    holds[x] = "finish"
                elif value == 15:
                    holds[x] = "feet"
    outPath = "placementMaps/" + uuid + ".csv"
    pd.DataFrame(holds).to_csv(outPath, index=False)


def getClimbs(sync):
    r = requests.post(
        "https://api.kilterboardapp.com/v1/logins",
        json={"username": "yourusername", "password": "yourpassword"},
    )

    auth = "Bearer " + r.json()["token"]

    headers = {"Authorization": auth}

    r = requests.post("https://api.kilterboardapp.com/v1/sync", json=sync)

    climbs = r.json()["PUT"]["climbs"]

    return climbs


def loadPlacementMaps(uuid):
    filepath = "placementMaps/" + uuid + ".csv"
    placementMap = pd.read_csv(filepath)

    return placementMap
