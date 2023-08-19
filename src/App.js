import {Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Recovery from "./pages/Recovery";
import Dashboard from "./pages/Dashboard";
import { auth, onAuthStateChanged } from "./firebase";
import { useDispatch } from "react-redux";
import { setId } from "./redux/slices/user";

function App() {
  const dispatch = useDispatch()

    onAuthStateChanged(auth, (user)=>{
        if(user){
          dispatch(setId(user.uid))
        }
    })
  

  return (
    <div className="container mx-auto">
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/recovery' element={<Recovery/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/*' element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
