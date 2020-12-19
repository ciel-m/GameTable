import React, { useEffect, useState, useMemo } from "react";
import axios from 'axios';
import "./App.css";
import Table from "./Table";
import ParsingService from "./ParsingService"
import qs from 'query-string';
import LookupService from "./LookupService";

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");

  const Genres = ({ values }) => {
    return (
      <>
        {values.map((genre, idx) => {
          return (
            <span key={idx} className="badge">
              {genre}
            </span>
          );
        })}
      </>
    );
  };

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
            Cell: ({ cell: { value } }) => <Genres values={ParsingService.getGenres(value)} />,
            filterMethod: () => { return false }
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
      const response = await LookupService.getData();
      setData(response.data.results)
    })();
  }, []);

  async function changeGenre(genre) {
    const response = await LookupService.getGenre(genre)
    setData(response.data.results)
  }

  return (
    <div className="App">
      <input
        type="text"
        value={filter}
        placeholder="Enter genre"
        onChange={event => setFilter(event.target.value)}
      />
      <button  onClick={() => {changeGenre(filter)}}>
        Search
      </button>
      <button  onClick={() => {setData([])}}>
        Reset
      </button>
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;