import { useContext, useState } from "react";
import "./empresa.css";
import { api } from "../../lib/api";
import { Link, useNavigate } from "react-router-dom";
import { CompanyContext } from "../../context/CompanyContext";

export default function Empresa() {
  const companyNavigate = useNavigate();
  const { searchByCnpj, filteredCompanyData } = useContext(CompanyContext);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    searchByCnpj(searchTerm);
  };

  const handleUpdate = async (id: string) => {
    companyNavigate(`/updateCompany/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/company/${id}`);
    } catch (error) {
      console.log(error);
    }

    companyNavigate("/");
    alert("Empresa Excluida com sucesso");
  };

  return (
    <main className="company-container">
      <h1 className="company-title">Empresas</h1>
      {
        <section className="company-content">
          <div className="search-container">
            <input
              type="text"
              placeholder="Digite o CNPJ"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Pesquisar</button>
          </div>

          <Link to="/createCompany">
            <button className="create-company">Criar</button>
          </Link>

          <div className="table-container">
            <table className="table-content">
              <thead className="thead-container">
                <tr>
                  <th className="th-content">Nome do Cliente</th>
                  <th className="th-content">Senha</th>
                  <th className="th-content">Nome da empresa</th>
                  <th className="th-content">CNPJ</th>
                  <th className="th-content">CEP</th>
                  <th className="th-content">Endereço</th>
                  <th className="th-content">Número</th>
                  <th className="th-content">Telefone</th>
                  <th className="th-content">Email</th>
                  <th className="th-content"></th>
                  <th className="th-content"></th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanyData.map((com) => (
                  <tr key={com.CNPJ}>
                    <td className="td-content">{com.NomedoCliente}</td>
                    <td className="td-content">********</td>
                    <td className="td-content">{com.NomedaEmpresa}</td>
                    <td className="td-content">{com.CNPJ}</td>
                    <td className="td-content">{com.CEP}</td>
                    <td className="td-content">{com.Endereco}</td>
                    <td className="td-content">{com.Numero}</td>
                    <td className="td-content">{com.Telefone}</td>
                    <td className="td-content">{com.Email}</td>
                    <td className="td-content">
                      <button onClick={() => handleUpdate(com.Id)}>EDIT</button>
                    </td>
                    <td className="td-content">
                      <button onClick={() => handleDelete(com.Id)}>X</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      }
    </main>
  );
}
