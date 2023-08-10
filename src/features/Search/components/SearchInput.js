import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { searchInputChanged, debounceInput } from "../state/SearchSlice.js";
import ClientCard from "./ClientCard";

export const SearchInput = ({ value, onChange }) => {
  //gives us access to the state values inside a slice.
  const searchObject = useSelector((state) => state.searchStoreReducer.value);
  //console.log('searchObject', searchObject)

  //gives us access to the functions inside a slice.
  const dispatchHook = useDispatch();

  // a function to handle the change of an input
  const handleInputChange = (event) => {
    //gets the value of the input
    const value = event.target.value;

    //call a function from the search slice
    dispatchHook(searchInputChanged(value));

    //call another function from the search slice
    dispatchHook(debounceInput(value));
  };

  const renderLoading = () => {
    if (searchObject.loading) {
      return <div>Loading...</div>;
    } else if (
      !searchObject.loading &&
      searchObject.clients.length === 0 &&
      searchObject.searchQuery
    ) {
      console.log("searchObject", searchObject);
      return (
        <div className="capitalize">
          No user by the name of: {searchObject.searchQuery} was found!
        </div>
      );
    }
  };

  console.log(searchObject.clients);

  return (
    <div>
      <input
        type="text"
        onChange={handleInputChange}
        value={searchObject.searchQuery}
        className="capitalize"
      />

      {Object.keys(searchObject.clients).map((key) => {
        const client = searchObject.clients[key];
        return <ClientCard key={key} client={client} title="Hello!" />;
      })}

      <Link to="/search/1">Click me</Link>
      {renderLoading()}
    </div>
  );
};
