import React, { useState, useEffect, useContext } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
import Results from "./results";
import ThemeContext from "./ThemeContext";
const SearchParams = () => {
  const [location, setLocation] = useState("Seattle,WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropDown, updateBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);
  const [theme, setTheme] = useContext(ThemeContext);
  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });
    setPets(animals || []);
  }
  useEffect(() => {
    setBreeds([]);
    updateBreed("");

    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);
  }, [animal]);

  return (
    <div>
      <h1>{location}</h1>
      <div className="search-params">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            requestPets();
          }}
        >
          <label htmlFor="location">
            location
            <input
              id="location"
              value={location}
              placeholder="location"
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>
          <AnimalDropdown />
          <BreedDropDown />
          <label htmlFor="theme">
            Theme
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              onBlur={(e) => setTheme(e.target.value)}
            >
              <option value="peru">peru</option>
              <option value="darkBlue">darkBlue</option>
              <option value="mediumorchid">medium Orchid</option>
              <option value="chartreuse">Chartreuse</option>
            </select>
          </label>
          <button style={{ backgroundColor: theme }}>submit</button>
        </form>
        <Results pets={pets} />
      </div>
    </div>
  );
};
export default SearchParams;
