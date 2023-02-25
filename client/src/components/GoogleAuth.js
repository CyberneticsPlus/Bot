import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleAuth = ({ onLogin }) => {
  const handleGoogleLogin = async (response) => {
    const { tokenId } = response;

    const res = await fetch('/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tokenId }),
    });

    const data = await res.json();

    if (data.success) {
      const { token } = data;

      const decoded = JSON.parse(atob(token.split('.')[1]));

      onLogin({ firstName: decoded.firstName, lastName: decoded.lastName, email: decoded.email });
    }
  };

  const handleGoogleLoginFailure = (err) => {
    console.error(err);
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Login with Google"
      onSuccess={handleGoogleLogin}
      onFailure={handleGoogleLoginFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleAuth;
