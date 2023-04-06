import "./App.css";
import Chat from "./Chat";
import TravelGuide from "./TravelGuide";

function App() {
  return (
    <div className="App">
      <div className="weatherColumn">
        <TravelGuide />
      </div>
      <div className="chatColumn">
        <Chat />
      </div>
    </div>
  );
}

export default App;
