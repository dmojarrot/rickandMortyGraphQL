import "../src/stars.css";
import { createClient, Provider, useQuery } from "urql";
import { useState } from "react";

const client = createClient({
  url: "https://rickandmortyapi.com/graphql",
});

const CharacterQuery = `
  query GetCharacter($id: ID!) {
    character(id: $id) {
      name
      status
      species
      type
      gender
      image
      location {
        name
      }
    }
  }
`;

const CharacterImageQuery = `
  query GetCharacterImage($id: ID!) {
    character(id: $id) {
      image
    }
  }
`;

const FetchCharacterImage = ({ id }) => {
  const [{ fetching, data, error }] = useQuery({
    query: CharacterImageQuery,
    variables: { id },
  });
  if (fetching) {
    return;
  } else if (error) {
    return `Oh no! Error: ${error}`;
  }
  const characterImage = data.character;

  return <img src={characterImage.image} alt={characterImage.image} />;
};

const FetchCharacters = ({ id }) => {
  const [{ fetching, data, error }] = useQuery({
    query: CharacterQuery,
    variables: { id },
  });
  if (fetching) {
    return `Loading Character num: ${id}...`;
  } else if (error) {
    return `Oh no! Error: ${error}`;
  }
  const character = data.character;
  console.log(character);
  return (
    <>
      <p className="text-3xl text-white">{character.name}</p>
      <p className="text-xl text-white">Gender: {character.gender}</p>
      <p className="text-xl text-white">Status: {character.status}</p>
      <p className="text-xl text-white">Specie: {character.species}</p>
      <p className="text-xl text-white">Location: {character.location.name}</p>
    </>
  );
};

function App() {
  var [id, setId] = useState(1);
  return (
    <Provider value={client}>
      <div className="m-0 p-0 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 h-screen pngCursor overflow-hidden">
        <div id="stars" />
        <div id="stars2" />
        <div id="stars3" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto rounded-lg backdrop-blur-lg">
            <div className="backdrop-blur-sm overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:px-6"></div>
              <div className="my-5 mx-auto flex justify-center sm:justify-start">
                <FetchCharacterImage id={id} />
              </div>
              <div className="py-4">
                <FetchCharacters id={id} />
                <div className="block sm:flex justify-center text-center gap-10 mt-5">
                  <button
                    className="w-full border rounded-md py-1 mb-5 sm:mb-0 disabled:bg-gray-400"
                    onClick={() => {
                      setId(id--);
                    }}
                    disabled={id === 1}
                  >
                    <p className="text-white">Back</p>
                  </button>
                  <button
                    className="w-full border rounded-md py-1 bg-gray-870"
                    onClick={() => {
                      setId(id++);
                    }}
                  >
                    <p className="text-white">Next</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
