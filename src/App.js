import React from 'react';
import './Styles/Main.css';
import axios from 'axios';

function App() {
  const [username , setUsername] = React.useState('user');
  const [password , setPassword] = React.useState('password');
  const [jwt, setJwt] = React.useState('');
  const [succesfullLogin, setSuccesfullLogin] = React.useState(false);
  const [data, setData] = React.useState();
  const login = () => {
    setData([]);
    setJwt('');
    setSuccesfullLogin(false);

    axios.post('https://jwt.sulla.hu/login', {username, password})
    .then( res => {
      setJwt(res.data.token);
      if(res.data.token)
      {
        axios.get('https://jwt.sulla.hu/termekek', { headers: { Authorization: 'Bearer ' + res.data.token}})
        .then( res => {
          setData(res.data);
          setSuccesfullLogin(true);
        })
      }
    })
    .catch( err => {
      setSuccesfullLogin(false);
      alert("Sikertelen bejelentkezés");
    })



  }
  return (
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
      <h1>JWT login</h1>
      <input type='text' className='my-2' placeholder='username' onChange={(e) => setUsername(e.target.value)}></input>
      <input type='text' placeholder='password'  onChange={(e) => setPassword(e.target.value)}></input>
      <button onClick={login} className='px-4 mt-2 mb-5'>Login</button>
      {succesfullLogin && 
      <div className='card' >
        <div className='card-header'>
          <h1 className='card-title' style={{color:'green', margin:'10px'}}>Succesfull login</h1>
        </div>
        <div className='card-body'>
          {data.map((item) => (
            <div style={{display:'flex', justifyContent:'space-between'}} key={item.id}>
              <div>{item.name}</div>
              <div>{item.price}ft</div>
            </div>
          ))}
        </div>
      </div>
      }
    </div>
  );
}

export default App;
