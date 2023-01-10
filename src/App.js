import './App.css';

import { useState, useEffect } from 'react';

import axios from 'axios';

function App() {

  const [screenMsg, setScreenMsg] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [delayedString, setDelayedString] = useState("");

  async function fetchData(request) {
    // console.log(request)
    try {
      const response = await axios.post('https://be-more-server.onrender.com/chat',
        { data: request }
      );

      setScreenMsg(response.data)
      console.log(response.data)

    } catch (err) {
      console.log(err)
    }
  }

  const welcome = "Hi, I'm Be-More! I'm here to help you be a better you. Click the top right button for more instructions."
  const adviceResquest = "Give me a random advice to cheer my day. Don't repeat previous answers."
  const quoteResquest = "Provide me a random quote. Don't repeat previous answers."
  const socialMsg = encodeURIComponent("Hey! Did you hear about this cool AI App called Be-More? Check it out!")

  const clearConsole = () => { return (<>Clean and Clear. What's next? :-)</>) }

  const instructions = () => {
    return (<>
      <p>Instructions:</p>
      <p></p>
      <p>Click the ▲ button for a Advice</p>
      <p>Click the ⬤ green button for Quotes</p>
      <p>Or Make a Trivial Question on ▬ bar</p>
      <p>Hit the red button to clear the console</p>
    </>)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const UserRequest = event.target.UserRequest.value;
    fetchData(UserRequest);
    event.target.UserRequest.value = '';
  }

  const handleClick = (request) => {

    fetchData(request)
    setIsDisabled(true)
  }

  const delayString = (string) => {

    setDelayedString("");

    for (let x = 0; x < string.length; x++) {
      setTimeout(() => {
        setDelayedString(prevString => prevString + string[x]);
      }, x * 100)
    }
    setTimeout(() => { setIsDisabled(false) }, string.length * 100);
  }

  useEffect(() => {
    setIsDisabled(true)
    setScreenMsg(welcome)
    if (screenMsg === welcome) {
      delayString(welcome)
    }
  }, []);

  useEffect(() => {
    if (screenMsg === "") {
      return;
    }
    delayString(screenMsg);
  }, [screenMsg]);

  return (
    <div className="Container">
      <div className="Main-shadow">
      </div>
      <div className="Main">
        <div className='Screen'>
          <span className='ScreenMsg'>{delayedString === "" ? screenMsg : delayedString}</span>
        </div>
        <div className='Controls-Top'>
          <form onSubmit={handleSubmit}>
            <input type="text" id="UserRequest" className="Rectangle" name="UserRequest" />
          </form>
          <span id="Instructions" className="Circle-Top" onClick={() => { if (isDisabled) return; setScreenMsg(instructions) }} title="Click for More Instructions"></span>
        </div>
        <div className='Controls-Middle'>
          <div className='Controls-Middle-Left'>
            <span className="Plus-Sign">+</span>
          </div>
          <div className='Controls-Middle-Right'>
            <span id="Btn-Random" className="Triangle" onClick={() => { if (isDisabled) return; handleClick(adviceResquest) }} title="Generate a Good Advice">▲</span>
            <span id="Btn-Quote" className="Circle-Middle" onClick={() => { if (isDisabled) return; handleClick(quoteResquest) }} title="Generate a Motivational Quote"></span>
          </div>
        </div>
        <div className='Controls-Bottom'>
          <div className='Controls-Bottom-Left'>
            <a href={`https://twitter.com/intent/tweet?text=${socialMsg}&url=https://gilabarreto.github.io/be-more/`} className="Btn-Twitter" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href={`https://wa.me/?text=${socialMsg}+https://gilabarreto.github.io/be-more/`} className="Btn-WhatsApp" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
          <div className='Controls-Bottom-Right'>
            <span id="Btn-Clear-Console" className="Circle-Bottom" onClick={() => { if (isDisabled) return; setScreenMsg(clearConsole) }} title="Clear Console"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

