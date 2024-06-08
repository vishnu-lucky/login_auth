import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Home = () => {
  const navigate = useNavigate();

  const [time, setTime] = useState({ seconds: 0, milliseconds: 0 });
  const [isActive, setIsActive] = useState(false);
  const [savedTimes, setSavedTimes] = useState([]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          let newMilliseconds = prevTime.milliseconds + 1;
          let newSeconds = prevTime.seconds;
          if (newMilliseconds >= 100) {
            newMilliseconds = 0;
            newSeconds += 1;
          }
          return { seconds: newSeconds, milliseconds: newMilliseconds };
        });
      }, 10);
    } else if (!isActive && time.seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time.seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTime({ seconds: 0, milliseconds: 0 });
    setIsActive(false);
  };

  const saveTime = () => {
    setSavedTimes((prevTimes) => [...prevTimes, time]);
  };

  const clearSavedTimes = () => {
    setSavedTimes([]);
  };

  const username = localStorage.getItem('email')?.split('@')[0];

  return (
    <div className="home-page">
      <Navbar />
      <div className='nama'>
      <h3>Welcome, <span className="username">{username}</span></h3>
      </div>
      
      <div className="content">
        <div className="header">
          
          <div className="timer">{formatTime(time)}</div>
          <div className="controls">
            <div className="button-row">
              <button onClick={toggleTimer} className="glow-on-hover">{isActive ? 'Pause' : 'Start'}</button>
              <button onClick={resetTimer} className="glow-on-hover">Reset</button>
            </div>
            <div className="button-row">
              <button onClick={saveTime} className="glow-on-hover">Save Time</button>
              <button onClick={clearSavedTimes} className="glow-on-hover">Clear Saved Times</button>
            </div>
          </div>
        </div>
        <div className="saved-times">
          {savedTimes.length > 0 && <h2>Saved Times</h2>}
          <ul>
            {savedTimes.map((savedTime, index) => (
              <li key={index}>{formatTime(savedTime)}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const formatTime = (time) => {
  const minutes = Math.floor(time.seconds / 60).toString().padStart(2, '0');
  const seconds = (time.seconds % 60).toString().padStart(2, '0');
  const milliseconds = time.milliseconds.toString().padStart(2, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
};

export default Home;
