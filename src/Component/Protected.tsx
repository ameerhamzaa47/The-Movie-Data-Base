// import { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useAuthState } from 'react-firebase-hooks/auth'
// import { auth } from './Firebase'

function Protected(props: { cmp: any }) {
  // let navigate = useNavigate()
  // const [user] = useAuthState(auth)
  let Cmp = props.cmp
  // useEffect(() => {
  //   if (!user) {
  //     navigate('/login')
  //   }
  // }, [user, navigate])

  return (
    <div>
      <Cmp />
    </div>
  )
}

export default Protected 
