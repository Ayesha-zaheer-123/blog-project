import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Logout as LogoutAuth } from '../../Appwrite/Auth'
import { Logout } from '../../store/authSlice'
import { useDispatch } from 'react-redux';
function Logoutbtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function logoutHandler() {
    try {
      await LogoutAuth();
    } catch (err) {
      console.log("logout error:", err.message);
    } finally {
      dispatch(Logout());
      navigate('/');
    }
  }
  return (
    <button
      className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
      onClick={logoutHandler}
    >
      Logout
    </button>
  )
}
export default Logoutbtn