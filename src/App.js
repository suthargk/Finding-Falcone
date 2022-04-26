import "./App.css";
import Hero from "./components/Hero";
import DestinationList from "./components/Destinations/DestinationList";
import Result from "./components/Result";
import { useReducer} from "react";

const initialDestinations = [
  { id: 1, destinationName: "Destination 1" },
  { id: 2, destinationName: "Destination 2" },
  { id: 3, destinationName: "Destination 3" },
  { id: 4, destinationName: "Destination 4" },
];

const resultReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true, isError: false, isShow: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isError: false,
        isShow: true,
      };
    case "FETCH_FAILURE":
      return { ...state, isLoading: false, isError: true, isShow: true };
    default:
      throw new Error("Not found");
  }
};

function App({ onReset }) {
  const [result, dispatchResult] = useReducer(resultReducer, {
    data: {},
    isLoading: true,
    isShow: false,
  });
  return (
    <div className="App">
      <Hero onReset={onReset} />
      <DestinationList
        destinations={initialDestinations}
        dispatchResult={dispatchResult}
      />
      {result.isShow && <Result result={result} onReset={onReset} />}
    </div>
  );
}

export default App;
