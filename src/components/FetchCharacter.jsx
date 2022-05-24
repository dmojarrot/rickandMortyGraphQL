import { useQuery } from "urql";
import ContentLoader from "react-content-loader";

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
const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={476}
    height={268}
    viewBox="0 0 476 200"
    backgroundColor="#2a3343"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="26" rx="3" ry="3" width="216" height="14" />
    <rect x="0" y="70" rx="3" ry="3" width="110" height="9" />
    <rect x="0" y="109" rx="3" ry="3" width="110" height="9" />
    <rect x="0" y="145" rx="3" ry="3" width="110" height="9" />
    <rect x="0" y="176" rx="3" ry="3" width="110" height="9" />
  </ContentLoader>
);

const FetchCharacter = ({ id }) => {
  const [{ fetching, data, error }] = useQuery({
    query: CharacterQuery,
    variables: { id },
  });
  if (fetching) {
    return (
      // <MyLoader />
      <p className="font-RMFont text-2xl text-white">
        Loading Character Num {id}...
      </p>
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
    <div className="mt-2 font-binary">
      <p className="text-3xl md:text-4xl text-white font-RMFont">
        {character.name}
      </p>
      <div>
        <div className="flex gap-1 items-end">
          <p className="text-2xl md:text-3xl text-gray-400 font-binary">
            Gender:
          </p>
          <p className="text-xl text-white">{character.gender}</p>
        </div>
        <div className="flex gap-1 items-end">
          <p className="text-2xl md:text-3xl text-gray-400 font-light">
            Status:
          </p>
          <p className="text-xl text-white">{character.status}</p>
        </div>
        <div className="flex gap-1 items-end">
          <p className="text-2xl md:text-3xl text-gray-400 font-light">
            Specie:
          </p>
          <p className="text-xl text-white">{character.species}</p>
        </div>
        <div className="flex gap-1 items-end flex-wrap">
          <p className="text-2xl md:text-3xl text-gray-400 font-light">
            Location:
          </p>
          <p className="text-xl text-white">{character.location.name}</p>
        </div>
      </div>
    </div>
  );
};

export default FetchCharacter;
