import React, { Component } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import DefaultProfilePicture from '../assets/images/profile.png';
import * as tf from "@tensorflow/tfjs"

var x = 0;
var y = 0;
var w = 0;
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

  state = {
    email: '',
    profilePhoto: localStorage.getItem('imgUrl') ? localStorage.getItem('imgUrl') : DefaultProfilePicture,
    name: localStorage.getItem('name')
  }
  componentDidMount() {
    const body = {
      token: localStorage.getItem('token'),
    }
    fetch('/authenticated_endpoint', {
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
        </form>
        <canvas id="myCanvas" width="1080" height="1170"></canvas>
        {<makeImage />}
        <img src={require('./kilterboard.png')} />
      </div>
    );
  }
}
