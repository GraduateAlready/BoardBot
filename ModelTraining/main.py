import requests
import json
import numpy as np
import pandas as pd
from getClimbs import *

def getClimbAngle(angle, uuid, auth):
	climbinfourl = 'https://api.kilterboardapp.com/v1/climbs/' + uuid + "/info?angle="
	r = requests.get(url=climbinfourl + str(angle), headers = auth)

	climbinfo = r.json()
	if len(climbinfo["quality"]) != 0:
		qualityTotal = 0
		countTotal = 0
		for quality in climbinfo["quality"]:
			qualityTotal += quality["quality"] * quality["count"]
			countTotal += quality["count"]

		gradeTotal = 0
		gradeCount = 0
		for grade in climbinfo['difficulty']:
			gradeTotal += grade["difficulty"] * grade["count"]
			gradeCount += grade["count"]

		qualityTotal = qualityTotal / countTotal
		gradeTotal = gradeTotal / gradeCount

		climbout = {'uuid': climb['uuid'], 'angle': angle, 'name': climb['name'], 'ratings': countTotal, 'quality': qualityTotal, 'grade': gradeTotal}
		return climbout
	return None

sync = {"client":{"enforces_product_passwords":1,"enforces_layout_passwords":1,"manages_power_responsibly":1},"GET":{"query":{"include_multiframe_climbs":0,"include_all_beta_links":1,"tables":["products","product_sizes","holes","leds","products_angles","layouts","product_sizes_layouts_sets","placements","holds","shapes","sets","placement_roles","climbs","climb_stats","beta_links","attempts","gyms","boards","events"],"syncs":{"shared_syncs":[{"table_name":"layout_deviants","last_synchronized_at":"2021-07-28 22:04:36.503605"},{"table_name":"product_sizes_layout_deviants_sets","last_synchronized_at":"2021-07-28 22:04:36.503605"},{"table_name":"attempts","last_synchronized_at":"2021-09-27 15:45:25.021411"},{"table_name":"gyms","last_synchronized_at":"2021-09-27 15:45:25.021411"},{"table_name":"boards","last_synchronized_at":"2021-09-27 15:45:25.021411"},{"table_name":"products","last_synchronized_at":"2021-09-27 15:45:25.021411"},{"table_name":"product_sizes","last_synchronized_at":"2021-09-27 15:45:25.021411"},{"table_name":"holes","last_synchronized_at":"2021-09-27 15:45:25.021411"},{"table_name":"leds","last_synchronized_at":"2021-09-27 15:45:25.021411"},{"table_name":"sets","last_synchronized_at":"2021-09-27 15:45:25.021411"},{"table_name":"shapes","last_synchronized_at":"2021-09-27 15:45:25.021411"},{"table_name":"products_angles","last_synchronized_at":"2021-09-27 15:45:25.021411"},{"table_name":"layouts","last_synchronized_at":"2021-09-27 15:45:25.021411"},{"table_name":"product_sizes_layouts_sets","last_synchronized_at":"2021-09-27 15:45:25.021411"},{"table_name":"holds","last_synchronized_at":"2021-09-27 15:45:25.021411"},{"table_name":"placement_roles","last_synchronized_at":"2021-09-27 15:45:25.021411"},{"table_name":"placements","last_synchronized_at":"2021-09-27 15:45:25.021411"},{"table_name":"climbs","last_synchronized_at":"2001-10-29 20:00:25.021411"},{"table_name":"climb_stats","last_synchronized_at":"2021-09-27 15:45:25.021411"},{"table_name":"beta_links","last_synchronized_at":"2021-09-27 15:45:25.021411"}]}}}}

climbs = getClimbs(sync)
auth = getAuth()
placementMap = getPlacementMap()
binaryMap = constructBinaryMap()


print(len(climbs))


climbsout = []
angles = np.arange(0, 75, 5)

for climb in climbs:
	if climb['layout_id'] == 1:
		mapClimb(climb['uuid'], climb['placements'], binaryMap, placementMap)
		#for angle in angles:
		#	climbAtAngle = getClimbAngle(angle, climb['uuid'], auth)
		#	if climbAtAngle != None:
		#		climbsout.append(climbAtAngle)

#print(climbsout)
#df = pd.DataFrame(climbsout)
#df.to_csv("out.csv")
