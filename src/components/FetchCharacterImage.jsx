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
    return `Oh no! Error: ${error}`;
  }
  const characterImage = data.character;

  return (
    <>
      <img
        className="rounded-lg"
        src={characterImage.image}
        alt={characterImage.image}
      />
      <div className="">
        <p className="fixed text-3xl text-white bg-black rounded-full px-1 pl-2 font-RMFont right-0">
          {id}
        </p>
      </div>
    </>
  );
};

export default FetchCharacterImage;
