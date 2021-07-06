import  React, {useState} from 'react';


const SignUp = () => {

 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState(null);

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
    .then(res =>  res.json())
    .then(res =>  console.log(res, 'this is the bloody res'))
    .catch(e => setError(e))

    if(error) return alert('somehi went wrong ')




 };

  return(
    <>
    {error && error}
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
