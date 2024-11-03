import React, { useState } from "react";
import "./App.css";

function App() {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const feUrl = process.env.REACT_APP_FE_URL;
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(false);
  const applicantId = "1234567";

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/app/auth/rentcard/webhook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicantId: applicantId,
          operation: "UPDATE",
        }),
      });
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("There was an error fetching the data:", error);
      setUserData("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  const redirectUrl = `${apiBaseUrl}/app/auth/rentcard?user=${encodeURIComponent(
    JSON.stringify({
      objectId: "22504346",
      applicantId: applicantId,
      rent: "1000",
      deposit: "3000",
      currency: "EUR",
      partnerId: "85289368532", //FIXME: Replace with the partnerId provided by rentcard
    })
  )}`;

  return (
    <div className="App">
      <div style={{ backgroundColor: "lightblue", padding: "2rem" }}>
        <h1>This is what the user sees</h1>
        <h2>Click link to start process</h2>
        <a href={redirectUrl}>Start process</a>
      </div>
      <div>
        <h1>Here is the partner view</h1>
        <div>
          Click the link to see the simulated webhook response after completing
          the OAuth2 flow
        </div>
        <a href="#!" onClick={fetchData}>
          {loading ? "Loading..." : "Get data"}
        </a>
        {userData && Object.keys(userData).length > 0 && (
          <div>
            <h2>User Data:</h2>
            <pre>{JSON.stringify(userData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
