import axios from "axios";
import { useState, useEffect } from "react";
import { CountryInfo } from "./components/Countries";

function App() {
  const [search, setSearch] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [showCountry, setShowCountry] = useState("");
  //
  // if (countries === null) {
  //   return null;
  // }

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((resp) => {
        setAllCountries(resp.data);
      });
  }, []);
  function handleSearch(e) {
    setSearch(e.target.value);
  }
  function handleShowCountry(country) {
    if (country.name.common === showCountry) {
      return setShowCountry("");
    }
    return setShowCountry(country.name.common);
  }

  function searchCountries() {
    const filterCountries =
      search === ""
        ? []
        : allCountries.filter((country) => {
            return country.name.common
              .toLowerCase()
              .includes(search.toLowerCase());
          });
    if (filterCountries.length > 10) {
      return <p>too many matches, specify another</p>;
    }

    if (filterCountries.length === 1) {
      return filterCountries.map((country, id) => {
        return <CountryInfo key={id} country={country} />;
      });
    }
    return filterCountries.map((country, id) => {
      const countryName = country.name.common;
      return (
        <li key={id}>
          {countryName}
          <button
            onClick={() => {
              handleShowCountry(country);
            }}
          >
            {showCountry === countryName ? "hide" : "show"}
          </button>

          {showCountry === countryName ? <CountryInfo country={country} /> : ""}
        </li>
      );
    });
  }
  const filterCountries = searchCountries();

  return (
    <>
      <div>
        find countries{" "}
        <input value={search} onChange={(e) => handleSearch(e)} />
      </div>
      <div>{filterCountries}</div>
    </>
  );
}

export default App;
