import './App.css';

import { useState, useEffect } from 'react';

import axios from 'axios';

function App() {

  const [quote, setQuote] = useState("");
  const [delayedString, setDelayedString] = useState("");

  async function fetchData(request) {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          'model': 'text-davinci-002',
          'prompt': request,
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

  function handleSubmit(event) {
    event.preventDefault();
    const UserRequest = event.target.UserRequest.value;
    fetchData(UserRequest);
    event.target.UserRequest.value = '';
  }

  const handleClick = function () {

    fetchData("Provide me a random motivational quote. Don\'t repeat previous answers.")
    document.getElementById("Btn-Quote").disabled = true;
  }

  const delayString = function (string) {

    setDelayedString("");

    for (let x = 0; x < string.length; x++) {
      setTimeout(() => {
        setDelayedString(prevString => prevString + string[x]);
      }, x * 100)
    }
    setTimeout(() => {
      document.getElementById("Btn-Quote").disabled = false;
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
          <span className='Quote'>{delayedString === "" ? <>
            <p>Hi, I'm Be-More!</p>
            <p>I'm here to help you be a better you.</p>
            <p>Click the top button for more instructions. :-)</p>
          </>
            : delayedString}</span>
        </div>
        <div className='Controls-Top'>
          <form onSubmit={handleSubmit}>
            <input type="text" id="UserRequest" className="Rectangle" name="UserRequest" />
          </form>
          <span id="Circle-Top"></span>
        </div>
        <div className='Controls-Middle'>
          <div className='Controls-Middle-Left'>
            <span className="Plus-Sign">+</span>
          </div>
          <div className='Controls-Middle-Right'>
            <span id="Btn-Random" className="Triangle" onClick={() => fetchData("Give me a random advice to cheer my day. Don\'t repeat previous answers.")} title="Generate a Good Advice">▲</span>
            <span id="Btn-Quote" className="Circle-Middle" onClick={handleClick} title="Generate a Motivational Quote"></span>
          </div>
        </div>
        <div className='Controls-Bottom'>
          <div className='Controls-Bottom-Left'>
            <button className="Btn-Twitter">Twitter</button>
            <button className="Btn-Facebook">Facebook</button>
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

