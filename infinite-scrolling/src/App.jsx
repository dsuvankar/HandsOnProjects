import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSearch = (value) => {
    setLoading(true);
    setSearch(value);
    setPageNumber(1);
  };

  useEffect(() => {
    if (search.trim() === "") {
      setLoading(false);
      console.log("Search term is empty.");
      return;
    }
    const debouncing = setTimeout(() => {
      console.log("Fetching data...");
      fetch(
        `http://openlibrary.org/search.json?q=${search.toLowerCase()}&page=${pageNumber}`
      )
        .then((res) => res.json())
        .then((res) => {
          console.log("Data:", res);
          setPosts((prev) => {
            return [...prev, ...res.docs.map((val) => val.title)];
          });
          setLoading(false);
        })
        .catch((err) => console.error("Error", err));
    }, 1000);

    return () => {
      console.log("Clearing timeout.");
      clearTimeout(debouncing);
    };
  }, [search, pageNumber]);

  console.log(posts);

  return (
    <>
      <div className="">
        <input
          type="text"
          placeholder="Search a book.."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />

        {loading ? (
          <h1>Loading..</h1>
        ) : (
          <ul>
            {posts.map((book, index) => {
              return <li key={index}>{book}</li>;
            })}
          </ul>
        )}
      </div>
    </>
  );
}

export default App;
