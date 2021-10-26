import logo from "./logo.svg";
import "./App.css";
import Music from "./components/Music";

import { useEffect, useState } from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";

function App() {
  const [musicList, setMusicList] = useState([]);

  const [loading, setLoading] = useState(true);

  const apiURL =
    "https://api.apify.com/v2/key-value-stores/EJ3Ppyr2t73Ifit64/records/LATEST?fbclid=IwAR2j_Pu66FTXAI0xd5F0eah-kXq-BDxV-d24JKK0uNCDcTiUT-Pj3fMKZFQ";
  useEffect(() => {
    const getData = async () => {
      //Set hard code
      try {
        const res = await axios.get(apiURL);
        const { data } = await res;
        setMusicList(data);
        setLoading(false);
        return data;
      } catch (err) {
        // Handle Error Here
        console.error("Error  :   ", err);
      }
    };
    getData();
  }, []);

  // loading ? console.log("Loading") : console.log("Music List:", musicList);

  return (
    <div className="App">
      {loading ? <p>Loading...</p> : <Music musics={musicList} />}
    </div>
  );
}

export default App;
