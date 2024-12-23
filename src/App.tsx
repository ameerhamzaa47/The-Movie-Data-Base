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
import AddMovies from './Admin Pannel/addMovies'
import MDetailPage from './Details Page/MDetailPage'
import TvDetailPage from './Details Page/TvDetailPage'
import Forget_Password from './Auth/Forget_Password'
import AddTVShow from './Admin Pannel/addTvShow'
import NotFoundPage from './Component/NotFoundPage'
import Profile from './Component/Profile'
import AdminLogin from './Admin Pannel/AdminLogin'
import Admin from './Admin Pannel/Admin'
import AdminProtected from './Admin Pannel/AdminProtected'
import Update from './Admin Pannel/UpdateMovie'
import UpdateMovie from './Admin Pannel/UpdateMovie'
import PaymentPage from './Component/PaymentPage'


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
        <Route path='/payment' element={<PaymentPage/>} />
        <Route path='/u/:name' element={<Profile/>} />
        <Route path='/admin' element={<AdminLogin/>} />
        <Route path='/adminPannel' element={<AdminProtected cmp={Admin}/>} />
        <Route path='/update/:id' element={<AdminProtected cmp={UpdateMovie}/>} />
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