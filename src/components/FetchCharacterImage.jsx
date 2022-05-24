import { useQuery } from "urql";

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
    return (
      <p className="font-RMFont text-white">
        Oh no, error, try refreshing. {error}
      </p>
    );
  }
  const characterImage = data.character;

  return (
    <>
      <img
        className="rounded-lg"
        src={characterImage.image}
        alt={characterImage.image}
      />
      <div>
        <p className="fixed text-3xl text-white bg-gray-600 rounded-full pl-1 mr-5 font-RMFont right-0">
          {id}
        </p>
      </div>
    </>
  );
};

export default FetchCharacterImage;
