import React from 'react'
import Home from './Home';
import Result from './Result';
import Assignment from './Assignment'
import Stats from './Stats'
import Detail from './Detail'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Assignment />}>
        </Route>
        <Route path="/result" element={<Result />}>
        </Route>
        <Route path="/stats" element={<Stats />}>
        </Route>
        <Route path="/detail" element={<Detail />}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
