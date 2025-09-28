import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import EditTask from "./components/EditTask";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/task/:id" element={<EditTask/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
    
  )
}

export default App
