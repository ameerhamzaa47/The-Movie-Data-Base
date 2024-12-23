import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

function AdminProtected(props:any) {
    let navigate=useNavigate()
    let Cmp=props.cmp
    useEffect(() => {
        if (!localStorage.getItem('admin')){
            navigate('/admin')
        }
      }, [])

  return (
    <div>
        <Cmp/>
    </div>
  )
}

export default AdminProtected 