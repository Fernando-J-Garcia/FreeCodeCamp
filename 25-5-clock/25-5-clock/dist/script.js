import * as React from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import { BsArrowUpCircle, BsArrowDownCircle, BsFillPlayFill, BsFillPauseFill, BsArrowRepeat } from "https://cdn.skypack.dev/react-icons@4.3.1/bs";
const { useState, useEffect, useRef } = React;

const defaultTime = {
  minutes: 25,
  seconds: 0 };

const App = () => {
  const [timerDisplay, setTimerDisplay] = useState('Session');
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(defaultTime);
  const [timer, setTimer] = useState();
  const [isTimerReset, setIsTimerReset] = useState(false);
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);

  const isMounted = useRef(false);

  const beepAudio = document.getElementById('beep');

  useEffect(() => {
    if (isPlaying) setTimer(setInterval(countDown, 1000));else
    clearInterval(timer);
    return () => {
      clearInterval(timer);
    };
  }, [time, isPlaying]);

  useEffect(() => {
    console.log('useEffect:' + isTimerReset);
    if (isMounted.current) {
      if (isTimerReset) {
        clearInterval(timer);
        const result = async () => await handleTimerReset();
        result();
        setIsTimerReset(false);
      }
    } else
    {
      isMounted.current = true;
    }
  }, [isTimerReset]);

  const toggleTimer = () => {
    setIsPlaying(prev => !prev);
  };
  const countDown = () => {
    let newSeconds = time.seconds - 1;
    console.log(time.minutes + ':' + time.seconds);
    if (newSeconds === -1) {
      let newMinutes = time.minutes - 1;
      setTime({ minutes: newMinutes, seconds: 59 });
    } else
    {
      setTime(prevTime => ({ ...prevTime, seconds: newSeconds }));
    }
    if (time.minutes === 0 && newSeconds === 0) {
      setIsTimerReset(true);
    }
  };
  const handleTimerReset = () => {
    console.log('handling Timer Reset...');
    playBeepAudio();
    if (isBreakTime) {
      startSessionTimer();
    } else
    {
      startBreakTimer();
    }
  };
  const stopTimer = () => {
    clearInterval(timer);
  };
  const startSessionTimer = () => {
    setTime({ minutes: sessionLength, seconds: 0 });
    setTimerDisplay('Session');
  };
  const clearTimer = () => {
    clearInterval(timer);
    setBreakLength(5);
    setSessionLength(25);
    setTime(defaultTime);
    setIsPlaying(false);
    setIsBreakTime(false);
    setTimerDisplay('Session');
    if (beepAudio !== null) {
      beepAudio.pause();
      beepAudio.currentTime = 0;
      console.log('paused beep');
    }
  };
  const startBreakTimer = () => {
    setTime({ minutes: breakLength, seconds: 0 });
    setIsBreakTime(true);
    setTimerDisplay('Break');
  };
  const playBeepAudio = () => {
    if (beepAudio === null) return;
    beepAudio.currentTime = 0;
    beepAudio.play();
    console.log('beep Audio: time: ' + formatTimeToString(time));
  };
  const formatTimeToString = timeObj => {
    let result = '';
    if (timeObj.minutes < 10) result += '0' + timeObj.minutes.toString() + ':';else
    result += timeObj.minutes.toString() + ':';
    if (timeObj.seconds < 10) result += '0' + timeObj.seconds.toString();else
    result += timeObj.seconds.toString();
    return result;
  };
  const incrementBreakLength = () => {
    if (breakLength === 60) return;
    setBreakLength(prev => prev += 1);
  };
  const decrementBreakLength = () => {
    setBreakLength(prev => {if (prev === 1) return 1;else return prev -= 1;});
  };
  const incrementSessionLength = () => {
    if (sessionLength === 60) return;
    setSessionLength(prev => prev += 1);
    if (isBreakTime === false) {
      setTime(prevTime => ({ ...prevTime, minutes: prevTime.minutes + 1 }));
    }
  };
  const decrementSessionLength = () => {
    if (sessionLength === 1) return;
    setSessionLength(prev => prev -= 1);
    if (isBreakTime === false) {
      setTime(prevTime => ({ ...prevTime, minutes: prevTime.minutes - 1 }));
    }
  };
  return /*#__PURE__*/(
    React.createElement("div", { id: "container" }, /*#__PURE__*/
    React.createElement("audio", { id: "beep", src: "https://cdn.freesound.org/previews/153/153213_2499466-lq.mp3", type: "audio/mp3", preload: "auto" }), /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("h1", { id: "title" }, "25+5 Clock"), /*#__PURE__*/
    React.createElement("div", { id: "clock-settings" }, /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("p", { className: "clock-settings-text", id: "break-label" }, "Break Length"), /*#__PURE__*/
    React.createElement("div", { className: "clock-settings-controls" }, /*#__PURE__*/
    React.createElement("div", { id: "break-decrement", onClick: decrementBreakLength }, /*#__PURE__*/
    React.createElement(BsArrowDownCircle, { className: "white-fill-icon-small" })), /*#__PURE__*/

    React.createElement("p", { id: "break-length" }, breakLength), /*#__PURE__*/
    React.createElement("div", { id: "break-increment", onClick: incrementBreakLength }, /*#__PURE__*/
    React.createElement(BsArrowUpCircle, { className: "white-fill-icon-small" })))), /*#__PURE__*/



    React.createElement("div", null, /*#__PURE__*/
    React.createElement("p", { id: "session-label", className: "clock-settings-text" }, "Session Length"), /*#__PURE__*/
    React.createElement("div", { className: "clock-settings-controls" }, /*#__PURE__*/
    React.createElement("div", { id: "session-decrement", onClick: decrementSessionLength }, /*#__PURE__*/
    React.createElement(BsArrowDownCircle, { className: "white-fill-icon-small" })), /*#__PURE__*/

    React.createElement("p", { id: "session-length" }, sessionLength), /*#__PURE__*/
    React.createElement("div", { id: "session-increment", onClick: incrementSessionLength }, /*#__PURE__*/
    React.createElement(BsArrowUpCircle, { className: "white-fill-icon-small" }))))), /*#__PURE__*/




    React.createElement("div", { id: "timer" }, /*#__PURE__*/
    React.createElement("div", { id: "timer-container" }, /*#__PURE__*/
    React.createElement("p", { id: "timer-label" }, timerDisplay), /*#__PURE__*/
    React.createElement("p", { id: "time-left" }, formatTimeToString(time)))), /*#__PURE__*/


    React.createElement("div", { id: "controls" }, /*#__PURE__*/
    React.createElement("div", { id: "start_stop", onClick: toggleTimer },
    isPlaying ? /*#__PURE__*/
    React.createElement(BsFillPauseFill, { className: "white-fill-icon-small" }) : /*#__PURE__*/
    React.createElement(BsFillPlayFill, { className: "white-fill-icon-small" })), /*#__PURE__*/


    React.createElement("div", { id: "reset", onClick: clearTimer }, /*#__PURE__*/
    React.createElement(BsArrowRepeat, { className: "white-fill-icon-small" }))), /*#__PURE__*/


    React.createElement("div", { id: "footer" }, /*#__PURE__*/
    React.createElement("p", null, "designed and coded by"), /*#__PURE__*/
    React.createElement("p", null, "Fernando Garcia")))));




};
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.querySelector('#root'));