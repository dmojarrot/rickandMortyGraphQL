import { useQuery } from "urql";

const CharacterQuery = `
query GetCharacter($id: ID!) {
  character(id: $id) {
    name
    status
    species
    gender
    image
    location {
      name
    }
  }
}
`;

const FetchCharacter = ({ id }) => {
  const [{ fetching, data, error }] = useQuery({
    query: CharacterQuery,
    variables: { id },
  });
  if (fetching) {
    return (
      <p className="font-RMFont text-white">Loading Character Num {id}...</p>
    );
  } else if (error) {
    return (
      <p className="font-RMFont text-white">
        Oh no, error, try refreshing. {error}
      </p>
    );
  }
  const character = data.character;
  return (
    <div className="m-6 font-binary">
      <p className="text-4xl text-white font-RMFont">{character.name}</p>
      <div className="p-2">
        <div className="flex gap-1 items-end">
          <p className="text-3xl text-gray-400 font-binary">Gender:</p>
          <p className="text-xl text-white">{character.gender}</p>
        </div>
        <div className="flex gap-1 items-end">
          <p className="text-3xl text-gray-400 font-light">Status:</p>
          <p className="text-xl text-white">{character.status}</p>
        </div>
        <div className="flex gap-1 items-end">
          <p className="text-3xl text-gray-400 font-light">Specie:</p>
          <p className="text-xl text-white">{character.species}</p>
        </div>
        <div className="flex gap-1 items-end flex-wrap">
          <p className="text-3xl text-gray-400 font-light">Location:</p>
          <p className="text-xl text-white">{character.location.name}</p>
        </div>
      </div>
    </div>
  );
};

export default FetchCharacter;
