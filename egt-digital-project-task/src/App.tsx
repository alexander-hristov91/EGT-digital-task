import './App.css'
import { Route, Routes } from "react-router-dom";
import { UsersList } from './features/users/UsersList';
import UserPosts from './features/posts/UserPosts';

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