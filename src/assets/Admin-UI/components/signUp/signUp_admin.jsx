import React, { useEffect, useState } from 'react';
import { json, useActionData } from 'react-router-dom';

function SignUp({ onSwitchToLogIn }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('')
  const [data, setData] = useState('')

  const signUp = (e) => {
    e.preventDefault();
    if(name === '' || email === '' || password === ''){
      alert('Vui lòng nhập đầy đủ thông tin!');
    }
    else{
      if(password !== confirm) { 
        alert('Mật khẩu và xác nhận không trùng khớp. Vui lòng nhập lại!');
      }
      
      else{
        let TK = { 
          name : name,
          userName : email,
          password : password,
        }
        let changeObject = JSON.stringify(TK);
        localStorage.setItem(changeObject,email);
        alert('Đăng ký thành công!')
        window.location.href = "https://www.youtube.com/watch?v=ZuSHTuOvSGc"
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <form onSubmit={signUp} className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Create an account</h2>
            <div className="border-b-2 border-gray-300"></div>
          </div>
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">Name:</label>
            <input
              type="text"
              id="name"
              className="block w-full p-2 border rounded-md mb-4"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="email" className="block mb-1 font-medium">Email:</label>
            <input
              type="text"
              id="email"
              className="block w-full p-2 border rounded-md mb-4"
              placeholder="Email or Phone Number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password" className="block mb-1 font-medium">Password:</label>
            <input
              type="password"
              id="password"
              className="block w-full p-2 border rounded-md mb-4"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password" className="block mb-1 font-medium">Confirm Password:</label>
            <input
              type="password"
              id="password"
              className="block w-full p-2 border rounded-md mb-4"
              placeholder="Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="block w-full p-2 bg-red-500 text-white rounded-md"
          >
            Create Account
          </button>
          <button
            type="button"
            className="block w-full p-2 bg-white text-black border-2 rounded-md mt-2"
          >
            Sign up with Google
          </button>
          <p className="mt-4 text-sm text-center">
            Already have an account? <button type="button" className="text-blue-500" onClick={onSwitchToLogIn}>Log In</button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
