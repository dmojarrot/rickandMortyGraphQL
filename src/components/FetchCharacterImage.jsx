import { useQuery } from "urql";
import ContentLoader from "react-content-loader";

const CharacterImageQuery = `
  query GetCharacterImage($id: ID!) {
    character(id: $id) {
      image
    }
  }
`;

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={300}
    height={300}
    viewBox="0 0 300 300"
    backgroundColor="#2a3343"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="15" ry="15" width="300" height="300" />
  </ContentLoader>
);

const FetchCharacterImage = ({ id }) => {
  console.log(id);
  const [{ fetching, data, error }] = useQuery({
    query: CharacterImageQuery,
    variables: { id },
  });
  if (fetching) {
    return <MyLoader />;
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
        <p className="fixed text-3xl text-white mr-5 font-RMFont right-0">
          {id}
        </p>
      </div>
    </>
  );
};

export default FetchCharacterImage;
