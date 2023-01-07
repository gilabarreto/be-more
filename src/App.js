import './App.css';

import { useState, useEffect } from 'react';

import axios from 'axios';

function App() {

  const [quote, setQuote] = useState("");
  const [delayedString, setDelayedString] = useState("");

  async function getMotivationalQuote() {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          'model': 'text-davinci-002',
          'prompt': 'Provide me a random motivational quote. Don\'t repeat previous quotes.',
          'temperature': 1,
          'max_tokens': 1024
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.REACT_APP_CHATGTP_KEY
          },
        },
        {
          proxy: {
            host: 'localhost',
            port: 3000
          }
        }
      );

      setQuote(response.data.choices[0].text)
      console.log(response.data.choices[0].text)

    } catch (err) {
      console.log(err)
    }
  }

  const handleClick = function () {

    getMotivationalQuote()
    document.getElementById("Btn-Generator").disabled = true;
  }

  const delayString = function (string) {

    setDelayedString("");

    for (let x = 0; x < string.length; x++) {
      setTimeout(() => {
        setDelayedString(prevString => prevString + string[x]);
      }, x * 100)
    }
    setTimeout(() => {
      document.getElementById("Btn-Generator").disabled = false;
    }, string.length * 100);
  }

  useEffect(() => {
    if (quote === "") {
      return;
    }
    delayString(quote);
  }, [quote]);


  return (
    <div className="Container">
      <div className="Main-shadow">
      </div>
      <div className="Main">
        <div className='Screen'>
          <span className='Quote'>{delayedString === "" ? "Generate Quote" : delayedString}</span>
        </div>
        <div className='Controls-Top'>
          <span id="Rectangle"></span><span id="Circle-Top"></span>
        </div>
        <div className='Controls-Middle'>
          <div className='Controls-Middle-Left'>
            <span className="Plus-Sign">+</span>
            {/* <button id="Btn-Generator" onClick={handleClick}>Generate Quote</button> */}
          </div>
          <div className='Controls-Middle-Right'>
            <span id="Triangle">▲</span><span id="Btn-Generator" className="Circle-Middle" onClick={handleClick} title="Generate a Motivational Quote"></span>
          </div>
        </div>
        <div className='Controls-Bottom'>
          <div className='Controls-Bottom-Left'>
            <button id="Btn-Twitter">Twitter</button>
            <button id="Btn-Facebook">Facebook</button>
          </div>
          <div className='Controls-Bottom-Right'>
            <span id="Btn-Clear-Console" className="Circle-Bottom" onClick={() => setDelayedString("")} title="Clear Console"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

