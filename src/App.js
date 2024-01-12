import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PantallaPrincipal from './componentes/PantallaPrincipal';
import Login from './componentes/Login';
import Registro from './componentes/Registro';
import Dashboard from './componentes/Dashboard';
import AgregarGasto from './componentes/AgregarGasto';
import AgregarIngreso from './componentes/AgregarIngreso';
import ListaMov from './componentes/ListaMov';
import MontosTotales from './componentes/MontosTotales';
import Analisis from './componentes/Analisis';

function App() {
  return (
    <main className="container-fluid">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PantallaPrincipal />} />
            <Route path="login" element={<Login />} />
            <Route path="registro" element={<Registro />} />

            <Route path="dashboard" element={<Dashboard />}>
              <Route path="agregargasto" element={<AgregarGasto />} />
              <Route path="agregaringreso" element={<AgregarIngreso />} />
              <Route path="listadomovimientos" element={<ListaMov />} />
              <Route path="montostotales" element={<MontosTotales />} />
              <Route path="analisis" element={<Analisis />} />
            </Route>

            {/* <Route path="agregargasto" element={<AgregarGasto />} /> */}

          </Routes>
        </BrowserRouter>
      </Provider>
    </main >
  );
}

export default App;
