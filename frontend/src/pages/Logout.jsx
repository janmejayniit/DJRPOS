import {useEffect} from 'react'


const Logout = () => {
    
    useEffect(() => {   
        localStorage.removeItem('access')
        // navigation('/login')
    }, [])


  return (
    <div>
        <h1 className="text-center">Logout</h1>
        <div className="text-center">
            <h2>You have been logged out</h2>
            <p>Thank you for using our application.</p>
            <p>We hope to see you again soon!</p>
        </div>
         
        <div className="text-center">
            <a href="/login" className="btn btn-secondary">Login Again</a>
        </div>
    </div>
  )
}

export default Logout