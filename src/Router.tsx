import { Routes, Route } from "react-router-dom";
import { DefaultLayout } from "./layout/DefaultLayout";
import NovaEmpresa from "./components/novaEmpresa/NovaEmpresa";
import Empresa from "./components/empresa/empresa";
import UpdateEmpresa from "./components/updateEmpresa/UpdateEmpresa";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Empresa />} />
        <Route path="/createCompany" element={<NovaEmpresa />} />
        <Route path="/updateCompany/:id" element={<UpdateEmpresa />} />
      </Route>
    </Routes>
  );
}
