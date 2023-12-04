import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import TelaMenu from './telas/TelaMenu'
import TelaUsuario from "./telas/TelaUsuario";
import TelaBatepapo from './telas/TelaBatepapo'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/usuarios" element={<TelaUsuario />} />
            <Route path="/batepapo" element={<TelaBatepapo />} />
            <Route path="/FrontendBCC" element={<TelaMenu />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;