import "./App.css";
import Chat from "./Chat";
import Weather from "./Weather";

function App() {
  return (
    <div className="App">
      <div className="weatherColumn">
        <Weather />
      </div>
      <div className="chatColumn">
        <Chat />
      </div>
    </div>
  );
}

export default App;
