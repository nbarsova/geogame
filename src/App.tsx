import './App.css'
import {useEffect, useState} from "react";
import type {CountryData} from "./types.ts";
import PlayerData from "./components/PlayerData.tsx";
import {GeoGameProvider} from "./context/GeoGameContext.tsx";

function App() {
// @ts-ignore
    const [playerName, setPlayerName] = useState<string>('');

    const [allCountries, setAllCountries] = useState<Array<CountryData>>([]);

    const [usedCountries, setUsedCountries] = useState<Array<CountryData>>([]);

    const [currentCountry, setCurrentCountry] = useState<CountryData | undefined>();

    const [userInput, setUserInput] = useState<string>('');

    const [resultMessage, setResultMessage] = useState('');

    const [userPoints, setUserPoints]= useState<number>(0);

    const [rounds, setRounds]= useState<number>(0);

    const [roundStarted, setRoundStarted] = useState<boolean>(false);

    const [roundFinalMessage, setRoundFinalMessage] = useState<string | undefined>(undefined);

    const startRound = ()=> {
        setRoundFinalMessage(undefined);
        setRoundStarted(true);
        setResultMessage('');
        setUserPoints(0);
        setUsedCountries([]);
        setRounds(0);
        getRandomCountry();
    }

    const finishRound = ()=> {
        setRoundStarted(false);
        setCurrentCountry(undefined);
        setResultMessage('');
        setRoundFinalMessage('Congratulations! You played a round with '+rounds+ ' countries, you guessed '+ Math.ceil(userPoints/rounds*100)+'% countries correctly');
    }

    const getRandomCountry = () => {
        let newCountry;
        do {
            const randomIndex = Math.floor(Math.random() * allCountries.length);
            newCountry = allCountries[randomIndex];
        } while (usedCountries.indexOf(newCountry)>=0);

        setCurrentCountry(newCountry);
        setUserInput('');
        setUsedCountries([...usedCountries, newCountry]);
    };

    const checkCorrectCountry = () => {
        if(userInput.trim() === currentCountry?.capital) {
            setUserPoints(userPoints+1);
            setResultMessage('Correct');
        } else {
            setResultMessage('Incorrect! The capital of '+currentCountry?.name+' is '+currentCountry?.capital+'.');
        }
        setRounds(rounds+1);
        getRandomCountry();
    }

    useEffect(()=> {
        const fetchCountries = async  ()=> {
            const resp = await fetch('https://api.sampleapis.com/countries/countries');
            const json = await resp.json();
            const countriesArray = json.map((rawCountryData: any)=> {
                return {
                    name: rawCountryData.name,
                        capital: rawCountryData.capital
                }
            }).filter((country: CountryData)=> country.capital !== '');
            setAllCountries(countriesArray);
        }

        fetchCountries();
    }, []);

  return (
      <GeoGameProvider>
      <div className="app">
      <div className="game-container">
          <h1>Welcome to Geo Game</h1>
          <PlayerData/>

          {!roundStarted && (
              <button className="primary-button" onClick={startRound}>
                  Play
              </button>
          )}
          {roundStarted && (
              <button className="secondary-button" onClick={finishRound}>
                  Finish
              </button>
          )}

          {roundStarted && (
              <div className="question-section">
                  <p>What is the capital of <strong>{currentCountry?.name}</strong>?</p>
                  <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      className="text-input"
                  />
                  <button className="accent-button" onClick={checkCorrectCountry}>
                      Check
                  </button>
                  <p className="result-message">{resultMessage}</p>
                  <p className="score">Points: {userPoints}/{rounds}</p>
              </div>
          )}

          {roundFinalMessage && (
              <p className="final-message">{roundFinalMessage}</p>
          )}
      </div>
      </div>
      </GeoGameProvider>
  )
}

export default App
