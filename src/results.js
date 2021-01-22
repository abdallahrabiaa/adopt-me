import React from "react";
import Pet from "./pet";
const Results = ({ pets }) => {
  return (
    <div className="search">
      {pets.length == 0 ? (
        <h1>No pets found </h1>
      ) : (
        pets.map((pet) => {
          <Pet
            animal={pet.type}
            key={pet.id}
            name={pet.name}
            breed={pet.breeds.primary}
            media={pet.photos}
            location={`${pet.contact.adress.city},${pet.contact.adress.state}`}
          />;
        })
      )}
    </div>
  );
};
export default Results;
