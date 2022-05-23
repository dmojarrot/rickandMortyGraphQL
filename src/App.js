import { createClient, Provider } from "urql";
import { useState } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

import FetchCharacter from "./components/FetchCharacter";

import FetchCharacterImage from "./components/FetchCharacterImage";
import Stars from "./components/Stars";

const client = createClient({
  url: "https://rickandmortyapi.com/graphql",
});

function App() {
  var [id, setId] = useState(1);
  return (
    <Provider value={client}>
      <div className="m-0 p-0 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 h-screen pngCursor overflow-hidden">
        <Stars />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto rounded-lg backdrop-blur-lg">
            <div className="backdrop-blur-sm overflow-hidden rounded-lg">
              <div className="px-4 pb-5 sm:px-6"></div>
              <div className="my-5 mx-auto flex justify-center sm:justify-start">
                <FetchCharacterImage id={id} />
              </div>
              <div className="py-4">
                <FetchCharacter id={id} />
                <div className="flex justify-center text-center gap-10 mt-5">
                  <div className="flex justify-center w-6/12 sm:w-full">
                    <button
                      className="sm:w-auto w-full px-10 rounded-md py-1 shadow-inner shadow-white bg-gray-800 disabled:hover:opacity-100 disabled:bg-gray-600 hover:opacity-50 sm:block flex justify-center"
                      onClick={() => {
                        setId(id--);
                      }}
                      disabled={id === 1}
                    >
                      <ChevronLeftIcon className="text-white h-8 w-8" />
                    </button>
                  </div>
                  <div className="flex justify-center w-6/12 sm:w-full">
                    <button
                      className="sm:w-auto w-full px-10 shadow-inner shadow-white rounded-md py-1 bg-gray-800 hover:opacity-50 sm:block flex justify-center"
                      onClick={() => {
                        setId(id++);
                      }}
                    >
                      <ChevronRightIcon className="text-white h-8 w-8" />
                    </button>
                  </div>
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
