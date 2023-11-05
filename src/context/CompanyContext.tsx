import { createContext, useState, useEffect, ReactNode } from "react";
import { api } from "../lib/api";

interface Company {
  Id: string;
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

interface CompanyContextProps {
  children: ReactNode;
}

interface CompanyContextType {
  companyData: Company[];
  updateCompany: (id: string, updatedData: Partial<Company>) => void;
  searchByCnpj: (cnpj: string) => void;
  filteredCompanyData: Company[];
}

export const CompanyContext = createContext({} as CompanyContextType);

export function CompanyProvider({ children }: CompanyContextProps) {
  const [companyData, setCompanyData] = useState<Company[]>([]);
  const [filteredCompanyData, setFilteredCompanyData] = useState<Company[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<Company[]>("/company");
        setCompanyData(response.data);
        setFilteredCompanyData(response.data);
      } catch (error) {
        console.error("Falha ao buscar as empresas", error);
        setCompanyData([]);
        setFilteredCompanyData([]);
      }
    };
    fetchData();
  }, []);

  const updateCompany = (id: string, updatedData: Partial<Company>) => {
    const updatedCompanyData = companyData.map((company) => {
      if (company.Id === id) {
        return { ...company, ...updatedData };
      }
      return company;
    });
    setCompanyData(updatedCompanyData);
    setFilteredCompanyData(updatedCompanyData); // Atualiza os dados filtrados após a atualização
  };

  const searchByCnpj = (cnpj: string) => {
    const filteredCompanies = companyData.filter((company) => {
      const cnpjSemCaracteresEspeciais = company.CNPJ.replace(/[^\d]+/g, "");
      return cnpjSemCaracteresEspeciais.includes(cnpj);
    });
    setFilteredCompanyData(filteredCompanies);
  };

  return (
    <CompanyContext.Provider
      value={{ companyData, updateCompany, searchByCnpj, filteredCompanyData }}
    >
      {children}
    </CompanyContext.Provider>
  );
}
