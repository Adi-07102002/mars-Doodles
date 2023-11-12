import './App.css';
import { Route,Routes } from 'react-router-dom';
import Forms from './Components/Forms/Forms';
import RoomPage from './pages/RoomPage/RoomPage';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Forms/>}/>
        <Route path="/:roomid" element={<RoomPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
