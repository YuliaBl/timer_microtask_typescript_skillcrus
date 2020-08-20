import React, { useState, useEffect, Fragment } from 'react'
import "../index.css";
import IconButton from "@material-ui/core/IconButton";
import SvgIcon from "@material-ui/core/SvgIcon";


export const Timer: React.FC = () => {

  // const min: number = 1;
  // const zeroPoint: number = min.toString().padStart(1, 0).Number();

  const [seconds, setSeconds] = useState<number>(59)
  const [minutes, setMinutes] = useState<number>(1);
  const [isCount, setIsCount] = useState<boolean>(false);

  const helpReset = (): void => {
    setSeconds(59);
    setMinutes(1);
    setIsCount(false)
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
    <Fragment>
      <div className="timer-clock">
        {minutes} : {seconds}
      </div>
      <div className="timer-button">
        {!isCount ? (
          <IconButton
            className="timer-button_start"
            color="primary"
            aria-label="start"
            onClick={() => setIsCount(true)}
          >
            <SvgIcon style={{ fontSize: 50 }}>
              <path d="M2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2A10,10 0 0,0 2,12M4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12M10,17L15,12L10,7V17Z" />
            </SvgIcon>
          </IconButton>
        ) : (
          <IconButton
            className="timer-button_pause"
            color="secondary"
            aria-label="pause"
            onClick={() => setIsCount(false)}
          >
            <SvgIcon style={{ fontSize: 50 }}>
              <path d="M13,16V8H15V16H13M9,16V8H11V16H9M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z" />
            </SvgIcon>
          </IconButton>
        )}
        <IconButton
          className="timer-button_reset"
          color="inherit"
          aria-label="reset"
          onClick={() => {
            helpReset();
          }}
        >
          <SvgIcon style={{ fontSize: 50 }}>
            <path
              d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4M9,9V15H15V9"
            />
          </SvgIcon>
        </IconButton>
      </div>
    </Fragment>
  );
}