import React from "react";
import "./App.css";

function App() {
  
  const iframeSrc = `http://localhost:4200/jump?user=${encodeURIComponent(
    JSON.stringify({
      objectId: "2250344",
      applicantId: "1234567",
      rent: "1000",
      deposit: "3000",
      currency: "EUR",
      partnerId: "85289368532",
    })
  )}&auth=http://localhost:3001/app/auth/rentcard`;

  return (
    <div className="App">
      <h1>This is the partner website</h1>
      <iframe
        className="bg-transparent"
        title="frame"
        id="ifrm"
        width="100%"
        height="400px"
        src={iframeSrc}
        style={{ overflowY: "hidden", border: "none" }}
      ></iframe>
    </div>
  );
}

export default App;
