import './App.css'
import { Route, Routes } from "react-router-dom";
import UserPosts from './Users/pages/Posts/UserPosts';
import { UsersList } from './Users/pages/UserList/UsersList';


function App() {
  return (
    <Routes>
      <Route path='/' element={<UsersList />} />
      <Route path='/users' element={<UsersList />} />
      <Route path='/users/:id' element={<UserPosts />} />
    </Routes>
  );
}

export default App;