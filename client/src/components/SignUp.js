import  React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

const SignUp = () => {

 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState(null);
 const history = useHistory();

 const handleSubmit = (e) => {

   e.preventDefault();
   //making the post request to backend
   const options = {
    method: 'POST',
     headers: {
    'Content-Type': 'application/json',
  },
    body: JSON.stringify({ name , email, password})
   }

    fetch('/api/register', options)
     .then(res => {
      //not sure if this is the best way but it works
      if(!res.ok) {
       return res.json()
      }
      else {
        return res.json()
      }
    })
      .then(res => {
        localStorage.setItem( "user",res.name)
        const userStore = localStorage.getItem('user')

        if(!res.error) history.push("/")
        if(res.error) setError(res.error)
      })
      .catch(e =>  setError(e.message))

 };
//console.log(user)
  return(
    <>

    {error && error}
    {localStorage.getItem('user') }
    <div className="signup" style={{display: 'flex', justifyContent: 'center'}}>
      <form onSubmit={handleSubmit}>
      <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/>
      <input type="email" placeholder="email" value={email} onChange={(e) =>  setEmail(e.target.value)}/>
      <input type="password" placeholder="password" value={password} onChange={(e) =>  setPassword(e.target.value)}/>
      <button type="submit">Register</button>

      </form>
    </div>
    </>
  )
};

export default SignUp;
