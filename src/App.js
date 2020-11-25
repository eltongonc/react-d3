import React, { useEffect, useState } from 'react';
import * as d3 from "d3";

import { BarChart } from './components/BarChart';
import { Header } from './components/Header';
import './App.css';

const url = 'https://gist.githubusercontent.com/sahitj001/e6e6f8d83952abe03bcfa591be65faa1/raw/061a0fffaf64b2ef62ffdf5e1ec9bcc7e48977fc/garages.json';

const provinces = [
  { value:'all', name: 'Alles' }, 
  { value:'groningen', name: 'Groningen' }, 
  { value:'noord-holland', name: 'Noord-Holland' }
]

function App() {
  const [data, setData] = useState([]);
  const [province, setProvince] = useState("all");
  
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await d3.json(url)
        setData(data);
      } catch (error) {
        console.log(error)
      }
    }

    // prevent infinite loop
    if (data.length === 0) {
      getData();
    }
  });

  return (
    <div className="App">
      <Header />
        <select id="province" onChange={(e) => setProvince(e.target.value)}>
          {provinces.map((provincie) => (
            <option key={provincie.value} value={provincie.value}>{provincie.name}</option>
          ))}
        </select>

        <BarChart data={data} selectedProvince={province} />
    </div>
  );
}

export default App;
