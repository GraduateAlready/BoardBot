import React, { Component } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import DefaultProfilePicture from '../assets/images/profile.png';
import * as tf from "@tensorflow/tfjs"

var x = 0;
var y = 0;
var w = 0;

const loadModel = async () => {
    const idmap = [[1379, 1380, 1381, 1382, 1383, 1384, 1385, 1386, 1387, 1388, 1389, 1390, 1391, 1392, 1393, 1394, 1395, 0], [1362, 1363, 1364, 1365, 1366, 1367, 1368, 1369, 1370, 1371, 1372, 1373, 1374, 1375, 1376, 1377, 1378, 0], [1345, 1346, 1347, 1348, 1349, 1350, 1351, 1352, 1353, 1354, 1355, 1356, 1357, 1358, 1359, 1360, 1361, 0], [1591, 0, 1592, 0, 1593, 0, 1594, 0, 1595, 0, 1596, 0, 1597, 0, 1598, 0, 1599, 0], [1328, 1329, 1330, 1331, 1332, 1333, 1334, 1335, 1336, 1337, 1338, 1339, 1340, 1341, 1342, 1343, 1344, 0], [1582, 0, 1583, 0, 1584, 0, 1585, 0, 1586, 0, 1587, 0, 1588, 0, 1589, 0, 1590, 0], [1311, 1312, 1313, 1314, 1315, 1316, 1317, 1318, 1319, 1320, 1321, 1322, 1323, 1324, 1325, 1326, 1327, 0], [1573, 0, 1574, 0, 1575, 0, 1576, 0, 1577, 0, 1578, 0, 1579, 0, 1580, 0, 1581, 0], [1294, 1295, 1296, 1297, 1298, 1299, 1300, 1301, 1302, 1303, 1304, 1305, 1306, 1307, 1308, 1309, 1310, 0], [1564, 0, 1565, 0, 1566, 0, 1567, 0, 1568, 0, 1569, 0, 1570, 0, 1571, 0, 1572, 0], [1277, 1278, 1279, 1280, 1281, 1282, 1283, 1284, 1285, 1286, 1287, 1288, 1289, 1290, 1291, 1292, 1293, 0], [1555, 0, 1556, 0, 1557, 0, 1558, 0, 1559, 0, 1560, 0, 1561, 0, 1562, 0, 1563, 0], [1260, 1261, 1262, 1263, 1264, 1265, 1266, 1267, 1268, 1269, 1270, 1271, 1272, 1273, 1274, 1275, 1276, 0], [1546, 0, 1547, 0, 1548, 0, 1549, 0, 1550, 0, 1551, 0, 1552, 0, 1553, 0, 1554, 0], [1243, 1244, 1245, 1246, 1247, 1248, 1249, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1259, 0], [1537, 0, 1538, 0, 1539, 0, 1540, 0, 1541, 0, 1542, 0, 1543, 0, 1544, 0, 1545, 0], [1226, 1227, 1228, 1229, 1230, 1231, 1232, 1233, 1234, 1235, 1236, 1237, 1238, 1239, 1240, 1241, 1242, 0], [1528, 0, 1529, 0, 1530, 0, 1531, 0, 1532, 0, 1533, 0, 1534, 0, 1535, 0, 1536, 0], [1209, 1210, 1211, 1212, 1213, 1214, 1215, 1216, 1217, 1218, 1219, 1220, 1221, 1222, 1223, 1224, 1225, 0], [1519, 0, 1520, 0, 1521, 0, 1522, 0, 1523, 0, 1524, 0, 1525, 0, 1526, 0, 1527, 0], [1192, 1193, 1194, 1195, 1196, 1197, 1198, 1199, 1200, 1201, 1202, 1203, 1204, 1205, 1206, 1207, 1208, 0], [1510, 0, 1511, 0, 1512, 0, 1513, 0, 1514, 0, 1515, 0, 1516, 0, 1517, 0, 1518, 0], [1175, 1176, 1177, 1178, 1179, 1180, 1181, 1182, 1183, 1184, 1185, 1186, 1187, 1188, 1189, 1190, 1191, 0], [1501, 0, 1502, 0, 1503, 0, 1504, 0, 1505, 0, 1506, 0, 1507, 0, 1508, 0, 1509, 0], [1158, 1159, 1160, 1161, 1162, 1163, 1164, 1165, 1166, 1167, 1168, 1169, 1170, 1171, 1172, 1173, 1174, 0], [1492, 0, 1493, 0, 1494, 0, 1495, 0, 1496, 0, 1497, 0, 1498, 0, 1499, 0, 1500, 0], [1141, 1142, 1143, 1144, 1145, 1146, 1147, 1148, 1149, 1150, 1151, 1152, 1153, 1154, 1155, 1156, 1157, 0], [1483, 0, 1484, 0, 1485, 0, 1486, 0, 1487, 0, 1488, 0, 1489, 0, 1490, 0, 1491, 0], [1124, 1125, 1126, 1127, 1128, 1129, 1130, 1131, 1132, 1133, 1134, 1135, 1136, 1137, 1138, 1139, 1140, 0], [1474, 0, 1475, 0, 1476, 0, 1477, 0, 1478, 0, 1479, 0, 1480, 0, 1481, 0, 1482, 0], [1107, 1108, 1109, 1110, 1111, 1112, 1113, 1114, 1115, 1116, 1117, 1118, 1119, 1120, 1121, 1122, 1123, 0], [1465, 0, 1466, 0, 1467, 0, 1468, 0, 1469, 0, 1470, 0, 1471, 0, 1472, 0, 1473, 0], [1090, 1091, 1092, 1093, 1094, 1095, 1096, 1097, 1098, 1099, 1100, 1101, 1102, 1103, 1104, 1105, 1106, 0], [1089, 1088, 1087, 1086, 1085, 1084, 1083, 1082, 1081, 1080, 1079, 1078, 1077, 1076, 1075, 1074, 1073, 0], [1464, 1463, 1462, 1461, 1460, 1459, 1458, 1457, 1456, 1455, 1454, 1453, 1452, 1451, 1450, 1449, 1448, 1447], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]

    const model = await tf.loadLayersModel('https://boardbot.s3.us-east-2.amazonaws.com/BoardBot/model.json');
    const input = tf.randomNormal([1, 100]);
    const output = model.predict(input);
    const result = output.arraySync()[0]

    for(let i = 0; i < 36; i++)
    {
        for(let j = 0; j < 18; j++)
        {
	    if(result[i][j][3] > 0)
	    {
		console.log("finish")
		console.log(idmap[i][j])
            }
	    else if(result[i][j][2] > 0)
	    {
		console.log("start")
		console.log(idmap[i][j])
            }
	    else if(result[i][j][0] > 0)
	    {
		console.log("mid")
		console.log(idmap[i][j])
            }
	    else if(result[i][j][1] > 0)
	    {
		console.log("feet")
		console.log(idmap[i][j])
            }
	}
    }
};

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
function makeImage() {
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  const img = new Image()
  img.src = "kilterboard.png"
  img.onload = () => {
    ctx.drawImage(img, 0, 0)

  }
}
function drawCircle() {
  x = 63;
  y = 75;
  for (let j = 0; j < 2; j++) {
    for (let i = 0; i < 19; i++) {
      y = i * 61 + 30;
      w = getRandomIntInclusive(1, 17);
      x = w * 61;
      var c = document.getElementById("myCanvas");
      var ctx = c.getContext("2d");
      ctx.strokeStyle = '#cc0000';
      ctx.beginPath();
      ctx.arc(x, y, 25, 0, 2 * Math.PI);
      ctx.lineWidth = 5;
      ctx.stroke();
    }
  }
}

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };


    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    var x = 63;
    var y = 75;
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 19; i++) {
        y = i * 61 + 30;
        var w = Math.floor(Math.random() * 17) + 1;
        x = w * 61;
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")
        const img = this.refs.image
        ctx.beginPath();
        ctx.strokeStyle = '#cc0000';
        ctx.arc(x, y, 25, 0, 2 * Math.PI);
        ctx.lineWidth = 5;
        ctx.stroke();
      }
    }
  }

  state = {
    email: '',
    profilePhoto: localStorage.getItem('imgUrl') ? localStorage.getItem('imgUrl') : DefaultProfilePicture,
    name: localStorage.getItem('name')
  }
  componentDidMount() {
    loadModel()
    const body = {
      token: localStorage.getItem('token'),
    }
    fetch('api/authenticated_endpoint', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(json => {
      if (json.error) {
        toast.error(json.error)
        this.props.LogOut();
      }
      else {
        this.setState({
          email: json.email
        })
      }
    });
     const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")
    const img = this.refs.image
    img.onload = () => {
      ctx.drawImage(img, 0, 0)
      ctx.font = "40px Courier"
      ctx.fillText(this.props.text, 210, 75)
    }
  }
  render() {
    return (
      <div>
        <nav class="navbar navbar-light bg-light">
	   <div class="container-fluid">
              <span class="navbar-brand mb-0 h1">BoardBot</span>
              <ul class="navbar-nav">
                 <li class="nav-item dropdown">
		    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                       <img src={this.state.profilePhoto} width='30' height='30' className="img-thumbnail rounded-circle p-0" alt="" />
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                       <a class="dropdown-item" href="#"><Dropdown.Item onClick={this.props.LogOut}>Log Out</Dropdown.Item></a>
                    </div>
                 </li>
              </ul>
	   </div>
        </nav>

        <form>
          <input type="button" onClick={this.drawCircle} />
              <Dropdown.Menu className="mr-5">
                <Dropdown.Item onClick={this.props.LogOut}>Log Out</Dropdown.Item>
              </Dropdown.Menu>
        </form>
        <form onClick={this.handleSubmit}>
          <input type="button" value="Generate climb" />
        </form>
        <canvas ref="canvas" width={1080} height={1170} />
        <img ref="image" src={require('./kilterboard.png')} className="hidden" alt='' />
      </div>
    );
  }
}
