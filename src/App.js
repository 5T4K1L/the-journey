import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddMemory from "./pages/AddMemory";
import Homepage from "./pages/Homepage";
import Memory from "./pages/Memory";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<Homepage />}/>
      <Route path="/add-memory" element={<AddMemory />}/>
      <Route path="/memory/:memoryID/:memoryTitle" element={<Memory />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
