import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './Component/Header'
import Layout from './Component/Layout'
import Register from './Component/Register'
import Login from './Component/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Protected from './Component/Protected'
import Home from './Component/Home'
import { ThemeProvider } from './Context/ThemeProvider'
import ErrorBoundary from './Component/ErrorBoundries'
import AddMovies from './Add Videos/addMovies'
import MDetailPage from './Details Page/MDetailPage'
import TvDetailPage from './Details Page/TvDetailPage'


function App() {

  return (
    <>
    <ThemeProvider>
    <BrowserRouter>
    <Layout>
    <ErrorBoundary>
      <Header/>
      <Routes>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<Home/>} />
        <Route path='/Mdetail/:id' element={<MDetailPage/>} />
        <Route path='/Tvdetail/:id' element={<TvDetailPage/>} />
        <Route path='/addMovie' element={<Protected cmp={AddMovies} />} />
      </Routes>
      <ToastContainer />
      </ErrorBoundary>
    </Layout>
    </BrowserRouter>
    </ThemeProvider>
    </>
  )
}

export default App