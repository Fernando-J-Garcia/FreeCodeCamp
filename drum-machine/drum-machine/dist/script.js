import * as React from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

const { useState, useEffect } = React;

const drumSoundBank = [
{
  key: 'Q',
  keyCode: 81,
  name: 'Heater 1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },

{
  key: 'W',
  keyCode: 87,
  name: 'Heater 2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },

{
  key: 'E',
  keyCode: 69,
  name: 'Heater 3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },

{
  key: 'A',
  keyCode: 65,
  name: 'Heater 4',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },

{
  key: 'S',
  keyCode: 83,
  name: 'Clap',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },

{
  key: 'D',
  keyCode: 68,
  name: 'Open HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },

{
  key: 'Z',
  keyCode: 90,
  name: 'Kick and Hat',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },

{
  key: 'X',
  keyCode: 88,
  name: 'Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },

{
  key: 'C',
  keyCode: 67,
  name: 'Closed HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }];


const defaultSoundBank = drumSoundBank;

const DrumPad = props => {
  const defaultStyle = {
    boxShadow: "3px 3px 7px 2px white" };

  const pressedDownStyle = {
    boxShadow: "3px 3px 7px 2px purple" };

  const [currentStyle, setCurrentStyle] = useState(defaultStyle);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
  }, []);

  const handleKeyPress = e => {
    if (e.keyCode === props.keyCode) {
      handleClick();
    }
  };
  const playSound = () => {
    const audio = document.getElementById(props.keyChar);
    audio.currentTime = 0;
    audio.play();
  };
  const handleClick = () => {
    console.log(props.keyChar);
    props.setDisplayText(props.name);
    playSound();
    setTimeout(() => {
      setCurrentStyle(defaultStyle);
    }, 100);
    setCurrentStyle(pressedDownStyle);
  };
  return /*#__PURE__*/(
    React.createElement("div", { className: "drum-pad", onClick: () => handleClick(), id: props.name,
      style: currentStyle }, /*#__PURE__*/
    React.createElement("p", null, props.keyChar), /*#__PURE__*/
    React.createElement("audio", { class: "clip", src: props.url, id: props.keyChar })));


};
const DrumPadGrid = props => props.soundBank.map((sound, soundIdx) => {
  return /*#__PURE__*/(
    React.createElement(DrumPad, { key: soundIdx,
      keyChar: sound.key,
      keyCode: sound.keyCode,
      url: sound.url,
      name: sound.name,
      setDisplayText: props.setDisplayText }));


});

const DrumMachine = () => {
  const [soundBank, setSoundBank] = useState(defaultSoundBank);
  const [displayText, setDisplayText] = useState('N/A');
  const [isBankSwitched, setBankSwitch] = useState(false);

  const toggleBankSwitch = () => setBankSwitch(prev => !prev);

  return /*#__PURE__*/(
    React.createElement("div", { id: "drum-machine" }, /*#__PURE__*/
    React.createElement("div", { className: "pad-grid" }, /*#__PURE__*/
    React.createElement(DrumPadGrid, { soundBank: soundBank,
      setDisplayText: setDisplayText })), /*#__PURE__*/

    React.createElement("div", { id: "toolbar" }, /*#__PURE__*/
    React.createElement("p", { id: "drum-machine-header" }, "FG60 Drum Machine"), /*#__PURE__*/
    React.createElement("div", { id: "display" }, /*#__PURE__*/
    React.createElement("p", null, displayText)), /*#__PURE__*/

    React.createElement("p", { class: "toggle-text" }, "bank"), /*#__PURE__*/
    React.createElement("div", { className: "toggleButton" }, /*#__PURE__*/
    React.createElement("div", { id: "switch", onClick: toggleBankSwitch,
      style: isBankSwitched ? { float: 'right' } : { float: 'left' } })))));




};
const App = () => {
  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement(DrumMachine, null)));


};
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.querySelector('#root'));