import React from 'react'
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCurrentUser } from './Appwrite/Auth';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { Outlet } from 'react-router-dom';
import { Logout, login } from './store/authSlice';
function App() {
  const [loading, setloading] = useState(true)
  const dispatch = useDispatch();
  useEffect(() => {
    getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData ));
        } else {
          dispatch(Logout());
        }
      })
      .finally(() => setloading(false))
  }, [])
  return !loading ? (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null
}
export default App