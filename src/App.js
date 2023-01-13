import './App.css';

import { useState, useEffect } from 'react';

import axios from 'axios';

import YouTube from 'react-youtube';

function App() {

  const [screenMsg, setScreenMsg] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [delayedString, setDelayedString] = useState("");
  const [redButton, setRedButton] = useState(false);

  // Async Function to Make Axios Post Request
  async function fetchData(request) {

    try {
      const response = await axios.post('https://be-more-server.onrender.com/chat',
        { data: request }
      );

      setScreenMsg(response.data)

    } catch (err) {
      console.log(err)
    }
  }

  // Messages
  const welcome = "Hi, I'm Be-More! I'm here to help you be a better you. Click the Info button for more instructions."
  const adviceResquest = "Give me a random advice to cheer my day. Don't repeat previous answers."
  const quoteResquest = "Provide me a random quote. Don't repeat previous answers."
  const clearConsole = "Clean and Clear. What's next? :-)"

  const instructions = () => {
    return (<>
      <p>Instructions:</p>
      <p></p>
      <p>Click the ▲ button for a Advice</p>
      <p>Click the ⬤ green button for Quotes</p>
      <p>Or Make a Trivial Question on ▬ bar</p>
      <p>Click the ⬤ blue button to hear Msg</p>
      <p>Never click the red button!</p>
    </>)
  }

  // Function text-to-speech
  const { speak } = useSpeechSynthesis();

  // Function to Handle Input Submit
  const handleSubmit = (event) => {
    if (isDisabled) {
      return;
    }
    setRedButton(false)
    setIsDisabled(true)
    setDelayedString("loading");

    event.preventDefault();
    const UserRequest = event.target.UserRequest.value;

    fetchData(UserRequest);
    event.target.UserRequest.value = '';
  }

  // Function to Handle Button Clicks
  const handleClick = (request) => {

    if (isDisabled) {
      return;
    }
    setRedButton(false)
    setIsDisabled(true)
    setDelayedString("loading");

    fetchData(request)
  }

  // Function to Handle Static Msgs
  const handleStaticMsg = (msg) => {

    if (isDisabled) {
      return;
    } else if (redButton === true) {
      setRedButton(false);
    }
    setDelayedString(msg);
  }

  // Function to Handle Text-to-speech
  const handleVoiceOver = (msg) => {

    if (isDisabled || redButton === true) {
      return;
    }
    const handleComplete = () => {
      setIsDisabled(false);
    }   

    setRedButton(false);
    setIsDisabled(true)
    
    const utterance = new SpeechSynthesisUtterance(msg);
    utterance.onend = handleComplete;
    speechSynthesis.speak(utterance);

  }

  // Function to Print Message as Typewriter
  const delayString = (string) => {

    setIsDisabled(true)
    setDelayedString("");

    for (let x = 0; x < string.length; x++) {
      setTimeout(() => {
        setDelayedString(prevString => prevString + string[x]);
      }, x * 100)
    }
    setTimeout(() => { setIsDisabled(false) }, string.length * 100);
  }

  useEffect(() => {
    if (screenMsg === "") {
      setScreenMsg(welcome)
    }
    setIsDisabled(true)
    delayString(screenMsg);
  }, [screenMsg]);

  return (
    <>
      <div className="Main-shadow">
      </div>
      <div className="Main">
        {redButton === true ?
          <div className='Youtube'>
            <YouTube
              videoId='RUaYbfKZIiA'
              title='Youtube video player'
              opts={{
                height: '283px',
                width: '420px',
                playerVars: {
                  autoplay: 1,
                }
              }}
            /></div> :
          <div className='Screen'>
            <span className='ScreenMsg'>{delayedString === "loading" ? "Loading..." : delayedString}</span>
          </div>}
        <div className='Controls-Top'>
          <form onSubmit={handleSubmit}>
            <input type="text" id="UserRequest" className="Rectangle" name="UserRequest" />
          </form>
          <span id="Voice" className="Circle-Top" onClick={() => handleVoiceOver(screenMsg)} title="Click to Hear"></span>
        </div>
        <div className='Controls-Middle'>
          <div className='Controls-Middle-Left'>
            <span className="Plus-Sign">+</span>
          </div>
          <div className='Controls-Middle-Right'>
            <span id="Btn-Random" className="Triangle" onClick={() => handleClick(adviceResquest)} title="Generate a Good Advice">▲</span>
            <span id="Btn-Quote" className="Circle-Middle" onClick={() => handleClick(quoteResquest)} title="Generate a Motivational Quote"></span>
          </div>
        </div>
        <div className='Controls-Bottom'>
          <div className='Controls-Bottom-Left'>
            <span id="Btn-Clear-Console" className="Clear-Console" onClick={() => { handleStaticMsg(clearConsole) }} title="Clear Console">Clear</span>
            <span id="Btn-Instructions" className="Instructions" onClick={() => { handleStaticMsg(instructions) }} title="Click for More Instructions">Info</span>
          </div>
          <div className='Controls-Bottom-Right'>
            <span id="Btn-Youtube" className="Circle-Bottom" onClick={() => { if (isDisabled) return; setRedButton(true) }} title="Don Not Press This Button!"></span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

