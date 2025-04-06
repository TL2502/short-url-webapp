'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState('/hunt-eyes-cat.png');
  const [pawAnimation, setPawAnimation] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPawAnimation(true);
    setAnimationComplete(false);

    if (!url) {
      setError('Please enter the URL');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/shorten', { url });
      if (response.data?.shortUrl) {
        setShortUrl(response.data.shortUrl);
        setImageUrl('/cat-one-paw.png');  
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

  useEffect(() => {
    if (pawAnimation) {
      setTimeout(() => {
        setPawAnimation(false);
        setAnimationComplete(true);
        setImageUrl('/round-eyes-cat.png');
      }, 2000);
    }
  }, [pawAnimation]);
  return (
    <Container>
      <StyledImage>
        <Image
          src={imageUrl}
          alt="hunt eyes cat"
          width={420}
          height={300}
        />
      </StyledImage>
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

      <ResultWrapper>
        {pawAnimation && (
          <PawImage>
            <Image
              src="/cat-paw.png"
              alt="cat paw"
              width={300}
              height={300}
              className="paw-animation"
            />
          </PawImage>
        )}
        {animationComplete && shortUrl && (
          <Result>
            <p>Your shortened link is ready</p>
            <Link href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</Link>
          </Result>
        )}
      </ResultWrapper>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
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
  width: 80%;
  height: 60px;
  font-size: 24px;
  border-radius: 9999px;
  padding: 16px;
  border: 2px solid #ccc;
  margin-bottom: 15px; 
  transition: all 0.3s ease;

  &:focus {
    border-color: #f5bc00;
  }
`;

const Button = styled.button`
  width: 150px;  
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

const StyledImage = styled.div`
  display: flex;
  justify-content: center;  
  align-items: center;      
`;

const PawImage = styled.div`
  position: absolute;
  animation: movePaw 2s ease-in-out infinite;
  width: 300px;  
  height: 300px; 

  @keyframes movePaw {
    0% {
      left: 10%;
    }
    50% {
      left: 50%;
    }
    100% {
      left: 100%;
    }
  }
`;

const ResultWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const Result = styled.div`
  text-align: center;
  margin-left: 10px;
  font-size: 24px;
  color: black;
  animation: fadeIn 1s ease-in-out;
  
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`;

const Link = styled.a`
  display: block;
  margin-top: 10px;
  font-size: 24px;
  color: green; 
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Error = styled.div`
  margin-top: 20px;
  font-size: 18px;
  color: red;
`;
