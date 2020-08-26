import React, { useState, useEffect, Fragment } from 'react'
import "../index.css";
import { IconButton, SvgIcon, TextField } from "@material-ui/core";


export const Timer: React.FC = () => {

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isCount, setIsCount] = useState(false);

  const helpReset = (): void => {
    setIsCount(false)
    setSeconds(0);
    setMinutes(0);

  }

  // const secondsCounter = () => {


  //     if (seconds === 0) {
  //       setSeconds(59);
  //       setMinutes(minutes - 1);
  //     }
  //   const timerId: ReturnType<typeof setTimeout> = setTimeout(() => {
  //     setSeconds(seconds - 1);
  //   }, 1000);


  //   if (seconds === 0 && minutes === 0) {
  //     helpReset();
  //     alert("finish");
  //     }

  //     return () => clearTimeout(timerId);
  // }

  useEffect(() => {
    if (isCount) {
      // secondsCounter()
      if (seconds === 0) {
        setSeconds(59);
        setMinutes(minutes - 1);
      }
    const timerId: ReturnType<typeof setTimeout> = setTimeout(() => {
      setSeconds(seconds - 1);
    }, 1000);


    if (seconds === 0 && minutes === 0) {
      helpReset();
      alert("finish");
      }

      return () => clearTimeout(timerId);
    }
    return undefined;
  }, [seconds, minutes, isCount]);
  // ругается на массив, но я не понимаю как правильно все записать, документацию реакта смотрела


  return (
    <Fragment>
      <TextField
        id="standard-number"
        label="Minutes"
        type="number"
        value={minutes}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => {
          setMinutes(Number(e.target.value));
          e.preventDefault();
        }}
      />
      <div className="timer-clock">
        {minutes < 10 ? String(minutes).padStart(2, "0") : minutes} :{" "}
        {seconds < 10 ? String(seconds).padStart(2, "0") : seconds}
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
            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4M9,9V15H15V9" />
          </SvgIcon>
        </IconButton>
      </div>
    </Fragment>
  );
}