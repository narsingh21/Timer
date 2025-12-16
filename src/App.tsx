import { useEffect, useRef, useState } from 'react';
import './App.css';
function App() {
  const [inputHours, setInputHours] = useState('');
  const [inputMinutes, setInputMinutes] = useState('');
  const [inputSeconds, setInputSeconds] = useState('');

  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number>(null);
  const total = +inputHours * 3600 + +inputMinutes * 60 + +inputSeconds;
  const handleStart = () => {
    if (!(hour > 0 || minute > 0 || seconds > 0)) {
      setTimeLeft(+total);
    }
    setIsRunning(true);
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
    console.log(intervalRef.current);
    setIsRunning(false);
  };

  const handleRestart = () => {
    setTimeLeft(+total);
  };

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 0) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          return 0;
        }
        return time - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const hour = Math.floor(timeLeft / 3600);
  const minute = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className='root-container'>
      <h2>Countdown Timer</h2>
      <div className='timer'>
        <h3>
          {String(hour).padStart(2, '0')}:{String(minute).padStart(2, '0')}:
          {String(seconds).padStart(2, '0')}
        </h3>
      </div>
      <div className='input-container'>
        <input
          type='text'
          value={inputHours}
          onChange={(e) => setInputHours(e.target.value)}
        />
        <input
          type='text'
          value={inputMinutes}
          onChange={(e) => setInputMinutes(e.target.value)}
        />
        <input
          type='text'
          value={inputSeconds}
          onChange={(e) => setInputSeconds(e.target.value)}
        />
      </div>
      <div className='buttons'>
        <button onClick={handleStart}>start</button>
        <button onClick={handleStop}>stop</button>
        <button onClick={handleRestart}>Restart</button>
      </div>
    </div>
  );
}

export default App;
