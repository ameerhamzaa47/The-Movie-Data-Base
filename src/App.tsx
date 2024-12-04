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

function App() {

  return (
    <>
    <Layout>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<Protected cmp={Home}/>} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
    </Layout>
    </>
  )
}

export default App
