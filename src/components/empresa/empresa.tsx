import { useEffect, useState } from "react";
import "./empresa.css";
import { api } from "../../lib/api";
export interface Company {
  id: string;
  NomedoCliente: string;
  Senha: string;
  NomedaEmpresa: string;
  CNPJ: string;
  CEP: string;
  Endereco: string;
  Numero: number;
  Telefone: string;
  Email: string;
}

export default function Empresa() {
  const [company, setCompany] = useState<Company[]>([]);

  const getCompany = async () => {
    try {
      const response = await api.get("/company");

      return response.data as Company[];
    } catch (error) {
      console.error("falha ao procurar as Empresas", error);

      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCompany = await getCompany();
      setCompany(fetchedCompany);
    };
    fetchData();
  }, []);

  return (
    <main className="company-container">
      <h1 className="company-title">Empresas</h1>

      <button>Criar</button>
      <section className="table-container">
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
            </tr>
          </thead>
          <tbody>
            {company.map((com) => (
              <tr>
                <td className="td-content">{com.NomedoCliente}</td>
                <td className="td-content">********</td>
                <td className="td-content">{com.NomedaEmpresa}</td>
                <td className="td-content">{com.CNPJ}</td>
                <td className="td-content">{com.CEP}</td>
                <td className="td-content">{com.Endereco}</td>
                <td className="td-content">{com.Numero}</td>
                <td className="td-content">{com.Telefone}</td>
                <td className="td-content">{com.Email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
