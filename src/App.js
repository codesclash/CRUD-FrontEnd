import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

import ViewPost from "./pages/ViewPost/index";
import UpdatePost from "./pages/UpdatePost";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import "./App.css";

function App() {
  // logic for the create button and edit btn------------------------------------ -->
  const [btnState, setState] = useState(true);
  const [editBtn, setEditBtn] = useState(false);
  
  const navfunc = {
    toggleBtn: () => {
      setState((prevState) => {
        return !prevState;
      });
    },
    toggleEditBtn: () => {
      setEditBtn((prevState) => {
        return !prevState;
      });
    },
  };

  //---------------------------------------------------------------------->

  return (
    <>
      <div className="app">
        <Navbar btnState={btnState} editBtn={editBtn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route  path="/createpost" element={<CreatePost  {...navfunc} />} />
          <Route path="/posts/:postId" element={<ViewPost {...navfunc} />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/post/update/:postId"
            element={<UpdatePost {...navfunc} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
