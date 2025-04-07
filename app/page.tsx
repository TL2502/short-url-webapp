'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';

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

type Url = {
  id: string;
  shortUrl: string;
  originalUrl: string;
};

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState<Url | null>(null); // Updated to handle a single Url object
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState('/hunt-eyes-cat.png');
  const [pawAnimation, setPawAnimation] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  const shortenUrl = (code: string) => 
    `${process.env.NEXT_PUBLIC_BASE_URL}/${code}`;

  const fetchUrls = async () => {
    try {
      const response = await fetch('/api/urls');
      const data = await response.json();
      setShortUrl(data); // Assuming the response is a single URL object
    } catch (error) {
      console.error('Error fetching URL', error);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
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
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      setShortUrl(data); // Assuming the response contains the shortened URL object
      setUrl('');
    } catch (err) {
      console.error('Error shortening the URL', err);
      setError('An error occurred while shortening the URL');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pawAnimation) {
      const timeout = setTimeout(() => {
        setPawAnimation(false);
        setAnimationComplete(true);
        setImageUrl('/round-eyes-cat.png');
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [pawAnimation]);

  return (
    <Container>
      <Image src={imageUrl} alt="hunt eyes cat" width={420} height={300} priority />
      <Form onSubmit={handleSubmit}>
        <Input
          type="url"
          placeholder="Input your URL here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Shortening...' : 'Shorten'}
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
            <Link
              key={shortUrl.id}
              href={`/${shortUrl.shortUrl}`} 
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortenUrl(shortUrl.shortUrl)}
            </Link>
          </Result>
        )}
      </ResultWrapper>
    </Container>
  );
}
