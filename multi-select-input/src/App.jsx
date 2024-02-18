import { useEffect, useRef, useState } from "react";
import "./App.css";

import Pills from "./components/Pills";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchUsers = () => {
      setActiveSuggestion(0);
      if (searchTerm.trim() === "") {
        setSuggestions([]);
        return;
      }

      fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => setSuggestions(data))
        .catch((err) => {
          console.error(err);
        });
    };
    fetchUsers();
  }, [searchTerm]);

  const handleSelectedUsers = (user) => {
    setSelectedUser([...selectedUser, user]);
    setSelectedUserSet(new Set([...selectedUserSet, user.email]));
    setSearchTerm("");
    setSuggestions([]);
    inputRef.current.focus();
  };
  const handleRemoveUser = (user) => {
    const updatedUsers = selectedUser.filter((p) => p.id !== user.id);
    setSelectedUser(updatedUsers);

    const updatedEmails = new Set(selectedUserSet);
    updatedEmails.delete(user.email);
    setSelectedUserSet(updatedEmails);
    inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Backspace" &&
      e.target.value === "" &&
      selectedUser.length > 0
    ) {
      const lastUser = selectedUser[selectedUser.length - 1];
      handleRemoveUser(lastUser);
      setSuggestions([]);
    } else if (e.key === "ArrowDown" && suggestions?.users?.length > 0) {
      e.preventDefault();

      setActiveSuggestion((prevIndex) =>
        prevIndex < suggestions.users.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp" && suggestions?.users?.length > 0) {
      e.preventDefault();

      setActiveSuggestion((prevIndex) => {
        return prevIndex > 0 ? prevIndex - 1 : 0;
      });
    } else if (
      e.key === "Enter" &&
      activeSuggestion >= 0 &&
      activeSuggestion < suggestions.users.length
    ) {
      handleSelectedUsers(suggestions.users[activeSuggestion]);
    }
  };

  return (
    <div className="user-search-container">
      <div className="user-search-input">
        {/* Pills */}
        {selectedUser.map((user) => {
          return (
            <Pills
              key={user.email}
              image={user.image}
              text={`${user.firstName}`}
              onClick={() => handleRemoveUser(user)}
            />
          );
        })}

        {/* input field with search suggestions */}
        <div>
          <input
            type="text"
            value={searchTerm}
            ref={inputRef}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="search for a user...."
            onKeyDown={handleKeyDown}
          />
          {/* search suggestions */}
          <ul className="suggestions-list">
            {suggestions?.users?.map((user, index) => {
              return selectedUserSet.has(user.email) ? (
                <></>
              ) : (
                <li
                  key={user.email}
                  className={index === activeSuggestion ? "active" : ""}
                  onClick={() => handleSelectedUsers(user)}>
                  <img src={user.image} alt="user dp" />
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
} //

export default App;
