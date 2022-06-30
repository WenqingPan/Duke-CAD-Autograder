import React from 'react'
import Home from './Home';
import Result from './Result';
import Assignment from './Assignment'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
        <Route path="/assignment" element={<Assignment />}>
        </Route>
        <Route path="/result" element={<Result />}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
