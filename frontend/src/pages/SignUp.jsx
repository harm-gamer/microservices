import React from 'react'
import {useNavigate }from "react-router-dom"
const SignUp = () => {
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        name,
        email,
        password,
      });
      toast.success("Signup Successful!");
      navigate("/");
    } catch (error) {
      toast.error("Signup failed");
    }
  };
  return (
     <>
    <div className="p-4 flex flex-col items-center">
    <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
    <input type="text" placeholder="Name" className="border p-2 mb-2 w-80" />
    <input type="email" placeholder="Email" className="border p-2 mb-2 w-80" />
    <input type="password" placeholder="Password" className="border p-2 mb-2 w-80" />
    <button className="bg-blue-600 text-white px-4 py-2 rounded"
     onClick={handleSignup}
    >Sign Up</button>
  </div>
  </>
  )
}

export default SignUp
