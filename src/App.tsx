import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './Component/Header'
import Layout from './Component/Layout'
import Register from './Auth/Register'
import Login from './Auth/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Protected from './Component/Protected'
import Home from './Component/Home'
import { ThemeProvider } from './Context/ThemeProvider'
import ErrorBoundary from './Component/ErrorBoundries'
import AddMovies from './Add Videos/addMovies'
import MDetailPage from './Details Page/MDetailPage'
import TvDetailPage from './Details Page/TvDetailPage'
import Forget_Password from './Auth/Forget_Password'
import AddTVShow from './Add Videos/addTvShow'
import NotFoundPage from './Component/NotFoundPage'


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
        <Route path='/forgot-password' element={<Forget_Password/>} />
        <Route path='/' element={<Home/>} />
        <Route path='/Mdetail/:id' element={<MDetailPage/>} />
        <Route path='/Tvdetail/:id' element={<TvDetailPage/>} />
        <Route path='/addMovie' element={<Protected cmp={AddMovies} />} />
        <Route path='/addTvShow' element={<Protected cmp={AddTVShow}/>} />
        <Route path='*' element={<NotFoundPage/>} />
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