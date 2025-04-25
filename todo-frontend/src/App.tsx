import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import TodoDetail from './components/TodoDetails';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/add" element={<TodoForm />} />
            <Route path="/edit/:id" element={<TodoForm />} />
            <Route path="/todo/:id" element={<TodoDetail />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;