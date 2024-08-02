import React, { useEffect } from 'react';

const Callback = () => {
  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const oauthVerifier = params.get('oauth_verifier');

      const response = await fetch(`http://localhost:5000/twitter_callback?oauth_verifier=${oauthVerifier}`);
      const data = await response.json();

      if (data.error) {
        console.error(data.error);
      } else {
        console.log(data.message);
      }
    };

    handleCallback();
  }, []);

  return (
    <div>
      <h1>Callback Page</h1>
      <p>Processing your request...</p>
    </div>
  );
};

export default Callback;
