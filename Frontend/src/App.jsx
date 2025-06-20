import React from 'react'
import{BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {Toaster} from 'react-hot-toast';//toaster is used to create "toasts" i.e, notifications that pops up on the screen

import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Home/Dashboard';
import InterviewPrep from './pages/InterviewPrep/InterviewPrep';

function App() {
  return (
    <>
      <div className="w-full h-full">
        <Router>
          <Routes>
            <Route path='/' element={<LandingPage />} />

            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/interviewprep/:id' element={<InterviewPrep />} />
          </Routes>
        </Router>

        
        <Toaster 
        toastOptions={{
          className: '',
          style: {
            fontSize:"13px",
          },

        }}
        />
      </div>
    </>
  )
}

export default App;