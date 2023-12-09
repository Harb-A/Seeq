import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Profile from "./views/Profile.js";
import LoginForm from "./views/LoginForm.js";
import RegisterForm from "./views/RegisterForm.js";
import Dashboard from "./views/Dashboard.js";
import NotFound from "./views/NotFound.js";
import Posts from "./views/Posts.js";
import Applications from "./views/Applications.js";
import NewPost from "./views/NewPost.js";
import DetailPage from "./views/DetailPage.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/detail/:id" element={<DetailPage />}></Route>
          <Route path="/posts" element={<Posts />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/new-post" element={<NewPost />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
