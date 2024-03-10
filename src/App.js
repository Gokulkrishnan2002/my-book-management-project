import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BookListing from './Components/BookListing';
import BookCreate from './Components/BookCreate';
import BookDetail from './Components/BookDetail';
import BookEdit from './Components/BookEdit';
import Login from './Login/Login';

function App() {
  return (
    <div className="App">
      <h1>PIXSTECH LIBRARY</h1>
      <div><br></br></div>
      <div><br></br></div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/book' element={<BookListing />}></Route>
          <Route path='/book/create' element={<BookCreate />}></Route>

          <Route path='/book/detail/:bookid' element={<BookDetail />}></Route>
          <Route path='/book/edit/:bookid' element={<BookEdit />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
