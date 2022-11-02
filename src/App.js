import { useState } from "react";
import "./styles.css";

export default function App() {
  const [inputedUsername, setInputedUsername] = useState("");
  const [inputedJob, setInputedJob] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [createdId, setCreatedId] = useState(0);

  const handleCreateUser = () => {
    if (inputedUsername !== "" && inputedJob !== "") {
      fetch("https://reqres.in/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: inputedUsername,
          job: inputedJob
        })
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data) {
            setCreatedId(data.id);
            setIsCreated(true);
          }
        })
        .catch((error) => {
          setIsCreated(false);
        });
    }
  };

  return (
    <div className="App">
      <div>
        <h1>Buat User Baru</h1>
        <div className="form">
          <p>Username:</p>{" "}
          <input
            type="text"
            placeholder="masukan username"
            onChange={(e) => setInputedUsername(e.target.value)}
          />
        </div>
        <br />
        <div className="form">
          <p>Job Name:</p>{" "}
          <input
            type="text"
            placeholder="masukan job"
            onChange={(e) => setInputedJob(e.target.value)}
          />
        </div>
        {isCreated ? (
          <p className="message">User berhasil dibuat dengan id: {createdId}</p>
        ) : (
          <button onClick={handleCreateUser}>Buat</button>
        )}
      </div>
    </div>
  );
}
