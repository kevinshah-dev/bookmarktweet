import React, { useEffect, useState } from 'react';

const Callback = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      console.log(params);
      const authorization_url = window.location.href;
      console.log("Current URL:", authorization_url);

      try {
        const response = await fetch("https://flaskbookmarktweet-production.up.railway.app/twitter_callback", 
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ authorization_url }),
          }
        );
        const data = await response.json();

        if (data.error) {
          setError(data.error);
        } else {
          setMessage(data.message);
        }
      } catch (err) {
        setError('Failed to process the callback.');
      }
    };

    handleCallback();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Callback Page</h1>
      {error ? (
        <div style={{ color: 'red' }}>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      ) : (
        <div>
          <h2>Success!</h2>
          <p>{message}</p>
          <p>Your Twitter bookmarks have been sent to your email.</p>
        </div>
      )}
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => window.location.href = '/'}>Home</button>
      </div>
    </div>
  );
};

export default Callback;
