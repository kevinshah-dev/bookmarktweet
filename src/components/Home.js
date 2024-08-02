import React, { useState } from 'react';
import styled from 'styled-components';

const Home = () => {
  const [email, setEmail] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('https://flaskbookmarktweet-production.up.railway.app/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (data.redirect_url) {
      setRedirectUrl(data.redirect_url);
      window.location.href = data.redirect_url;
    } else {
      // Handle error
      console.error('Failed to get redirect URL');
    }
  };

  return (
    <Container>
      <Title>Twitter Bookmark Reminder</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="email">Email:</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit">Connect Twitter</Button>
      </Form>
      {redirectUrl && <p>Redirecting to Twitter for authorization...</p>}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 300px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #1da1f2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0d8edb;
  }
`;

export default Home;
