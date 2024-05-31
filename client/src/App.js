import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import AllRoutes from './routes/AllRoutes';

function App() {
  return (
    <div className="App" style={{ marginTop: "70px" }}>
      {/* <Navbar/> */}
      <AllRoutes />

    </div>
  );
}

export default App;
