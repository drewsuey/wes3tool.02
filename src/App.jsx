import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BudgetTool from './pages/BudgetTool';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/budget-tool" element={<BudgetTool />} />
      </Routes>
    </Router>
  );
}

export default App;
