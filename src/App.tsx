import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookListing from './Components/BookListing.tsx';
import BookCreate from './Components/BookCreate.tsx';
import BookDetail from './Components/BookDetail.tsx';
import BookEdit from './Components/BookEdit.tsx';
import Login from './Login/Login.tsx';
import React from 'react';

function App(): JSX.Element {
  return (
    <div className="App">
      <h1>PIXSTECH LIBRARY</h1>
      <div><br /></div>
      <div><br /></div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/book' element={<BookListing />} />
          <Route path='/book/create' element={<BookCreate />} />
          <Route path='/book/detail/:bookid' element={<BookDetail />} />
          <Route path='/book/edit/:bookid' element={<BookEdit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
