import React, { useState, useEffect } from 'react'
import "../index.css";
import Button from "@material-ui/core/Button";


export const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(59)
  // const [minutes, setMinutes] = useState<number>(1);
  const [isCount, setIsCount] = useState<boolean>(false);

  const secondsCounter = () => {
    // не понимаю какой ту должен быть тип, void нарушает работу очистки таймаута 
    const timerId: number = window.setTimeout(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
    return () => window.clearTimeout(timerId);
  }

  useEffect((): void => {
    if (isCount) {
      secondsCounter()
    }
    return undefined;
  }, [seconds, isCount]);


  return (
    <div className="timer">
      <div className="timer-clock">: {seconds}</div>
      {!isCount
      ?
      (<Button
        variant="contained"
        color="primary"
        onClick={() => setIsCount(true)}
      >
        START
      </Button>)
      :
      (<Button
        variant="contained"
        color="secondary"
        onClick={() => setIsCount(false)}
      >
        PAUSE
      </Button>)
      }
      <Button
        variant="contained"
        color="inherit"
        onClick={() => {
          setIsCount(false);
          setSeconds(59);
        }}
      >
        RESET
      </Button>
    </div>
  );
}