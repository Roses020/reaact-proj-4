import {useState, useContext} from 'react'
import axios from 'axios'
import AuthContext from '../store/authContext'
 



const Auth = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [register, setRegister] = useState(true)
   const authCtx = useContext(AuthContext)
   console.log(authCtx)
   const submitHandler = e => {
       e.preventDefault()
       
       const body = {
        username,
        password,
    }
   
    //const url = 'https://socialmtn.devmountain.com'

    axios.post(register ? `/register` : `/login`, body)
    .then(({data}) => {
        console.log('AFTER AUTH', data)
        console.log(authCtx)
authCtx.login(data.token, data.exp, data.userId)
    })
    .catch(function (error) {
        setPassword('')
            setUsername('')
        console.log(error);
      });

       console.log('submitHandler called')
   }
        //   console.log(register)

   return (
       <main>
           <h1>Welcome!</h1>
           <form className='form auth-form' onSubmit={submitHandler}>
               <input
                   type="text"
                   placeholder='username'
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
                   className='form-input'/>
               <input
                   type='text'
                   placeholder='password'
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className='form-input'/>
               <button className='form-btn'>
                   {register ? 'Sign Up' : 'Login'}
               </button>
           </form >
           <button  className='form-btn' onClick={e => setRegister(register ? false : true)}> Need to {register ? 'Login' : 'Sign Up'}?</button>
       </main>
   )
}
 
export default Auth;