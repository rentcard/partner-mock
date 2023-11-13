import React, { useState } from "react";
import "./App.css";

function App() {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const [userData, setUserData] = useState('');
  const [loading, setLoading] = useState(false);
  const applicantId = "1234567";

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/app/auth/rentcard/webhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // If you need authorization or other headers, include them here
      },
      body: JSON.stringify({
        applicantId: applicantId,
        operation: "UPDATE",
      }),
    });
    const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('There was an error fetching the data:', error);
      setUserData('Failed to load data.'); // handle the error state
    } finally {
      setLoading(false);
    }
  };
  
  const iframeSrc = `http://localhost:4200/jump?user=${encodeURIComponent(
    JSON.stringify({
      objectId: "2250344",
      applicantId: applicantId,
      rent: "1000",
      deposit: "3000",
      currency: "EUR",
      partnerId: "85289368532",
    })
  )}&auth=${apiBaseUrl}/app/auth/rentcard`;

  return (
    <div className="App">
      <div><h1>This is the partner website</h1>
      <iframe
        className="bg-transparent"
        title="frame"
        id="ifrm"
        width="100%"
        height="400px"
        src={iframeSrc}
        style={{ overflowY: "hidden", border: "none" }}
      ></iframe></div>
      <div>
        <h1>Get User data</h1>
        <div>Click the link to see the simulated webhook response after completing the OAuth2 flow</div>
        <a href="#!" onClick={fetchData}>{loading ? 'Loading...' : 'Get data'}</a>
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
