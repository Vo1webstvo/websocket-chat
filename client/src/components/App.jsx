import { Routes, Route } from 'react-router-dom';
import Main from './Main';
import Chat from './Chat';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path={'/'} element={<Main />} />
        <Route path={'/chat'} element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
