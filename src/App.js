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
          'model': 'text-davinci-003',
          'prompt': 'Can you please provide me a random motivational quote?',
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

  const delayString = async function (string) {

    // await getMotivationalQuote();

    setDelayedString("");

    for (let x = 0; x < string.length; x++) {
      setTimeout(() => {
        setDelayedString(prevString => prevString + string[x])
      }, x * 100)
    }
  }

  useEffect(() => {
    getMotivationalQuote();
    if (quote === "") {
      return;
    }
    delayString(quote);
  }, []);


  return (
    <div className="Main">
      <div className='Screen'>
        <span className='Quote'>{delayedString === "" ? "Generate Quote" : delayedString}</span>
      </div>
      <div className='Controls'>
        <button onClick={() => delayString(quote)}>Generate Quote</button>
      </div>
    </div>
  );
}

export default App;

