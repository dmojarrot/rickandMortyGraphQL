import { createClient, Provider } from "urql";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import Stars from "./components/Stars";
import FetchCharacter from "./components/FetchCharacter";
import FetchCharacterImage from "./components/FetchCharacterImage";
import rmLogo from "./assets/rmLogo.png";
const client = createClient({
  url: "https://rickandmortyapi.com/graphql",
});

function App() {
  var [id, setId] = useState(1);
  return (
    <Provider value={client}>
      <div className="p-0 m-0 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 h-screen pngCursor overflow-hidden">
        <Stars />
        <nav className="flex justify-center mt-2">
          <a href="/">
            <img className="w-14 h-14" src={rmLogo} alt="rick and morty logo" />
          </a>
        </nav>
        <div className="max-w-7xl mx-auto lg:px-8">
          <div className="max-w-3xl mx-auto my-auto rounded-lg backdrop-blur-lg p-6 md:pt-10">
            <div className="backdrop-blur-sm shadow-2xl overflow-hidden rounded-lg">
              <div className="block md:flex items-center">
                <div className="mx-auto w-8/12 md:w-5/12 flex justify-center">
                  <FetchCharacterImage id={id} />
                </div>
                <div className="p-4 w-full md:w-7/12">
                  <FetchCharacter id={id} />
                </div>
              </div>
            </div>
            <div className="flex justify-center text-center gap-10 mt-5">
              <div className="flex justify-center w-6/12 sm:w-full">
                <button
                  className="sm:w-auto w-full px-10 rounded-md py-1 shadow-inner shadow-white bg-gray-800 disabled:hover:opacity-100 disabled:bg-gray-600 hover:opacity-50 sm:block flex justify-center"
                  onClick={() => {
                    setId(id - 1);
                  }}
                  disabled={id === 1}
                  type="button"
                >
                  <ChevronLeftIcon className="text-white h-8 w-8" />
                </button>
              </div>
              <div className="flex justify-center w-6/12 sm:w-full">
                <button
                  className="sm:w-auto w-full px-10 shadow-inner shadow-white rounded-md py-1 bg-gray-800 hover:opacity-50 sm:block flex justify-center"
                  onClick={() => {
                    setId(id + 1);
                  }}
                  type="button"
                >
                  <ChevronRightIcon className="text-white h-8 w-8" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
