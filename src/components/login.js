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
<div class="container">
	<div class="row">
		<div class="col-lg-8">
			<div className="col-lg-6 offset-lg-3 card">
				<h5>Sign In</h5>
				<img src={DefaultProfilePicture} className="img-thumbnail rounded-circle m-auto" width="100" height="100" alt="User" />
				<br />
				<GoogleLogin
					className="form-control"
					render={renderProps =>
				<GoogleButton style={{ width: '100%' }} {...renderProps} />}
				clientId={REACT_APP_GOOGLE_CLIENT_ID}
				buttonText="Sign in with Google"
				onSuccess={this.onGoogleLoginSuccess}
				onFailure={({ details }) => { toast.error(details) }}
				/>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-lg-8">
			<div class="card mb-4">
				<a href="#!"></a>
				<div class="card-body">
					<h2 class="card-title">BoardBot</h2>
					<h5>About</h5>
					<p class="card-text">The Kilter board is a modern take on a traditional training wall. Each hold has been scrutinized for comfort and grip style, allowing one to train on open hand holds, incuts, pinches, crimps and slopers. The LED light system will light up the holds that lay out the problem before you. The layout of these holds is standardized across the globe, allowing climbers to set and climb uniform problems no matter where they are on the planet!</p>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-md-4">
			<div class="card mb-4">
				<a href="#!"></a>
				<div class="card-body">
					<h5>More</h5>
					<p class="card-text">The program uses Google OAuth Sign In to login into the system. A "Sign In with Google" option shows up to prompt the user to sign in to the site. </p>
				</div>
			</div>
		</div>
	</div>
</div>
    );
  }
}
