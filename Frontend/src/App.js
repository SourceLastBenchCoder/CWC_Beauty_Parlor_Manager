import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import Home from "./pages/Home";
import "./css/style.css"
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';    


function App() {
  const username = useSelector(state => state.admin.fullname)
  return (
    <BrowserRouter>
      {
        (username)
          ?
          (
            <Dashboard />
          )
          :
          (
            <Home />
          )
      }
    </BrowserRouter >
  );
}

export default App;
