import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './Component/Header'
import Layout from './Component/Layout'
import Register from './Component/Register'
import Login from './Component/Login'

function App() {

  return (
    <>
    <Layout>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </BrowserRouter>
    </Layout>
    </>
  )
}

export default App
