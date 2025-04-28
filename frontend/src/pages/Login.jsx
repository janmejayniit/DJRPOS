import React from 'react';
import axios from 'axios';

const Login = () => {

    if (localStorage.getItem('access')) {
        window.location.href = '/';
    }


    const [loginForm, setLoginForm] = React.useState({
        username: '',
        password: ''
    });

    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e) => {
        setLoading(true);
        setError(null);
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:8000/api/users/token/', {
                username: loginForm.username,
                password: loginForm.password
            })
            console.log(response.data);
            if (response.status === 200) {
                localStorage.setItem('access', response.data.access);
                localStorage.setItem('refresh', response.data.refresh);
                localStorage.setItem('user_id', response.data.user.id);
                localStorage.setItem('first_name', response.data.user.first_name);
                localStorage.setItem('last_name', response.data.user.last_name);
                window.location.href = '/';
            } else {
                setError('Login failed');
                setLoading(false);
                console.log('Login failed');
            }
        }catch(error){
            setError('Login failed');
            setLoading(false);
            console.log('Login failed', error);
        }finally{
            setLoading(false);
            setLoginForm({
                username: '',
                password: ''
            });
            
        }
        
    }

  return (
    <>
        <div className="mt-2">
            <div className="row">
                <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <div className="card shadow">
                            <div className="card-header text-center">
                                <h3>Login</h3>
                            </div>
                            <div className="card-body">
                                {error && <div className="alert alert-danger">{error}</div>}
                                {loading && <div className="alert alert-info">Loading...</div>}
                                
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="username" className='form-label'>Username</label>
                                        <input type="text" 
                                            className='form-control'
                                            id='username'
                                            onChange={(e)=>setLoginForm(prevLogin=>({...prevLogin, username: e.target.value
                                            }))}
    
                                            value={loginForm.username}
                                            placeholder='Enter your username' />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className='form-label'>Password</label>
                                        <input type="password" 
                                            className='form-control'
                                            onChange={(e) => setLoginForm(prevLogin=>({...prevLogin,password:e.target.value}))}
                                            value={loginForm.password} 
                                            id='password' placeholder='Enter your password' />
                                    </div>
                                    <button type="submit" className='btn btn-dark w-100'>Login</button>
                                </form>
                            </div>
                            {/* <div className="card-footer text-center">
                                <p>Don't have an account? <a href="/register">Register</a></p>
                            </div> */}
                        </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login;