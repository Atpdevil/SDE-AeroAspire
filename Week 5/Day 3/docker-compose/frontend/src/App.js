import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/`)
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => {
        console.error("API fetch error:", err);
        setMessage("Error connecting to backend");
      });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "20%" }}>
      <h1>{message || "Loading..."}</h1>
    </div>
  );
}

export default App;
