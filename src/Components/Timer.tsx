import React, { useState, useEffect } from 'react'
import "../index.css";
import Button from "@material-ui/core/Button";


export const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(59)
  const [minutes, setMinutes] = useState<number>(1);
  const [isCount, setIsCount] = useState<boolean>(false);

  // const zeroPoint = (): number =>

  const helpReset = (): void => {
    setSeconds(59);
    setMinutes(1);
    setIsCount(false);
  }

  const secondsCounter = () => {
    // не понимаю какой ту должен быть тип, думала void, но он нарушает работу очистки таймаута

    const timerId: number = window.setTimeout(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);

    if (seconds === 0) {
      setSeconds(59);
      setMinutes((minutes) => minutes - 1)
    } else { return () => window.clearTimeout(timerId);}

    if (seconds === 0 && minutes === 0) {
      alert('finish');
      helpReset();
    }
  }

  useEffect((): void => {
    if (isCount) {
      secondsCounter()
    }
    return undefined;
  }, [seconds, minutes, isCount]);
  // ругается на массив, но я не понимаю как правильно все записать, документацию реакта смотрела


  return (
    <div className="timer">
      <div className="timer-clock">{minutes} : {seconds}</div>
      <div className="timer-button">
        {!isCount ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsCount(true)}
          >
            START
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setIsCount(false)}
          >
            PAUSE
          </Button>
        )}
        <Button
          variant="contained"
          color="inherit"
          onClick={() => {
            helpReset();
          }}
        >
          RESET
        </Button>
      </div>
    </div>
  );
}