import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { GoogleLogin } from 'react-google-login';
import GoogleButton from 'react-google-button';
import DefaultProfilePicture from '../assets/images/profile.png';

// constant variables
const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;
var x = 0;
var y = 0;
var w = 0;

export default class Login extends Component {
  state = {
    login: '',
    password: '',
    error: '',
    googleToken: ''
  }

  onGoogleLoginSuccess = (res) => {
    var userData = res.profileObj;
    var userId = parseInt(userData.googleId)
    var userName = userData.name;
    var userEmail = userData.email;
    var userPhoto = userData.imageUrl;
    var userToken = res.tokenId;
    this.setState({
      email: userEmail,
      googleToken: userToken
    })

 // body structure
  
    const body = {
      id: userId,
      login: userEmail,
      password: '',
      token: this.state.googleToken,
      name: userName
    }

    console.log("login_body", body);
    fetch('api/auth', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(json => {
      if (json.error) {
        toast.error(json.error);
        this.setState({ error: json.error });
      }
      else {
        toast.success('Login Success!');
        localStorage.setItem('token', json.token);
        localStorage.setItem('name', userName);
        localStorage.setItem('imgUrl', userPhoto);

        this.props.setAuth();
      }
    });
  }

  // renderring the class name
  
  render() {
    return (
<div class="container" style="padding-top: 2%;">
      <div class="row">
        <div class="col-lg-8">
          <div class="card mb-4">
            <a href="#!"></a>
            <div class="card-body">
                <h2 class="card-title">BoardBot</h2>
                <h5>About</h5>
                <p class="card-text">The Kilter board is a modern take on a traditional training wall. Each hold has been scrutinized for comfort and grip style, allowing one to train on open hand holds, incuts, pinches, crimps and slopers. The LED light system will light up the holds that lay out the problem before you. The layout of these holds is standardized across the globe, allowing climbers to set and climb uniform problems no matter where they are on the planet!</p>
                <a class="btn btn-primary" href="about.html">Learn more →</a>
            </div>
          </div>
        
      </div>
      <div class="col-lg-4">
        <!-- Search widget-->
        <div class="card mb-4">
            <div class="card-header">Search</div>
            <div class="card-body">
                <div class="input-group">
                    <input class="form-control" type="text" placeholder="Search..." aria-label="Search..." aria-describedby="button-search" />
                 <a class="btn btn-primary" href="home.html"> GO →</a>
                </div>
            </div>
        </div>
        <div id="root"></div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="card mb-4">
            <a href="#!"></a>
            <div class="card-body">
                
                <h5>More About</h5>
                <p class="card-text">The program uses Google OAuth Sign In to login into the system. A "Sign In with Google" option shows up to prompt the user to sign in to the site. </p>
                <a class="btn btn-primary" href="contact.html">Learn more →</a>
            </div>
          </div>
        
      </div>
      <div class="col-md-4">
        <!-- Search widget-->
        <div class="card mb-4">
          <a href="#!"></a>
          <div class="card-body">
              
              <h5>Other</h5>
              <p class="card-text"> After selecting the account, the user data is saved in a local database and displayed and the top right of the navbar.</p>
              <a class="btn btn-primary" href="other.html">Learn more →</a>
          </div>
        </div>
        <div id="root"></div>
        </div>
      </div>
    </div>
    <footer class="py-5 bg-light">
      <div class="container"><p class="m-0 text-center text-black">Copyright &copy; GraduateAlready</p></div>
  </footer>
  </body>
</html>
