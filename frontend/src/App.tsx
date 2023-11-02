import React from "react";
import "./App.css";

function App() {
  
  function generateSevenDigitId() {
    const min = 1000000;
    const max = 9999999;
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    return number.toString();
  }

  const iframeSrc = `https://development.my.rentcard.app/jump?user=${encodeURIComponent(
    JSON.stringify({
      objectId: "2250344",
      applicantId: generateSevenDigitId(),
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
