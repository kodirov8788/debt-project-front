import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Login from './pages/Login'
import Signup from './pages/Signup'
// import Navbar from './components/navbar/Navbar'
import Main from './pages/Main/Main'
import Singlepage from './pages/singlepage/Singlepage'
import Header from './components/header/Header'
import LoadingSpinner from './components/loaderSpinner/LoaderSpinner'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'

function App() {
  const { user } = useAuthContext()
  const { isLoading } = useContext(AuthContext)
  return (
    <div className="App">
      <BrowserRouter>
        <LoadingSpinner boolean={isLoading} />
        <Header />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Main /> : <Navigate to="/login" />}
            />

            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/debt/:id"
              element={<Singlepage />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
