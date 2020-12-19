import React, { useEffect, useState, useMemo } from "react";
import axios from 'axios';
import "./App.css";
import Table from "./Table";
import ParsingService from "./ParsingService"

function App() {
  const [data, setData] = useState([]);

  const columns = useMemo(
    () => [
      {
        Header: "Games",
        columns: [
          {
            Header: "Name",
            accessor: "name"
          },
          {
            Header: "Genres",
            accessor: "genres",
            Cell: ({ cell: { value } }) =>  value ? ParsingService.getGenres(value) : "Not Listed"
          },
          {
            Header: "Release Date",
            accessor: "released"
          },
          {
            Header: "Metacritic Rating",
            accessor: "metacritic"
          },
          {
            Header: "ESRB Rating",
            accessor: "esrb_rating",
            Cell: ({ cell: { value } }) =>  value ? ParsingService.getESRB(value) : "Not Listed"
          },
        ]
      }
    ],
    []
  );

  useEffect(() => {
    (async () => {
      const response = await axios(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&page=1&page_size=20`);
      console.log(response.data.results)
      setData(response.data.results)
    })();
  }, []);

  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;