// app/page.js
'use client'

import { useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); 

    if (!url) { 
      setError('Please enter the URL');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/shorten', { url });
      if (response.data?.shortUrl) {
        setShortUrl(response.data.shortUrl); 
      } else {
        setError('Cannot shorten the URL');
      }
    } catch (error) {
      console.error('Error shortening the URL', error);
      setError('An error occurred while shortening the URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>LinkShorter</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="url"
          placeholder="Input your URL here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </Button>
      </Form>
      {error && <Error>{error}</Error>}
      {shortUrl && (
        <Result>
          <p>URL ที่ย่อแล้ว: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
        </Result>
      )}
    </Container>
  );
}

const Title = styled.h1`
  font-size: 48px;  
  font-weight: bold;
  color: black;
  margin-bottom: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;  
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f7f7f7;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; 
`;

const Input = styled.input`
  width: 50%;
  height: 60px;
  font-size: 24px;
  border-radius: 9999px;
  padding: 16px;
  border: 2px solid #ccc;
  margin-bottom: 15px; 
  transition: all 0.3s ease;

  &:focus {
    border-color: #0070f3;
  }
`;

const Button = styled.button`
  width: 10%;  
  padding: 10px 20px;
  font-size: 16px;
  background-color: #333;
  color: white;
  border-radius: 9999px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Result = styled.div`
  margin-top: 20px;
  font-size: 18px;
  color: green;
  animation: fadeIn 1s ease-in-out;
  
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`;

const Error = styled.div`
  margin-top: 20px;
  font-size: 18px;
  color: red;
`;
