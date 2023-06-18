import { useContext } from 'react';
import './App.css';
import Main from './Components/Main/Main';
import Navbar from './Components/Navbar/Navbar';
import LoadingSpinner from './Components/loaderSpinner/LoaderSpinner';
import { UserContext } from './context/UserContext';

function App() {
  const { isLoading } = useContext(UserContext)

  return (
    <div className="App">
      <LoadingSpinner boolean={isLoading} />
      <Navbar />
      <Main />
    </div>
  );
}

export default App;
