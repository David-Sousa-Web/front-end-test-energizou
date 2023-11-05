import { ChangeEvent, FormEvent, useContext, useState, useEffect } from "react";
import { api } from "../../lib/api";
import { useNavigate, useParams } from "react-router-dom";
import { CompanyContext } from "../../context/CompanyContext";
import InputMask from "react-input-mask";
import validateEmail from "../../lib/EmailValidator";
import "../novaEmpresa/NovaEmpresa.css";

export default function UpdateEmpresa() {
  const { id } = useParams();
  const companyNavigate = useNavigate();
  const { companyData, updateCompany } = useContext(CompanyContext);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [updateCompanyState, setUpdateCompany] = useState({
    NomedoCliente: "",
    Senha: "",
    NomedaEmpresa: "",
    CNPJ: "",
    CEP: "",
    Endereco: "",
    Numero: 0,
    Telefone: "",
    Email: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUpdateCompany({
      ...updateCompanyState,
      [event.target.name]: event.target.value,
    });

    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail));
  };

  useEffect(() => {
    const companyToUpdate = companyData.find((company) => company.Id === id);

    if (companyToUpdate) {
      setUpdateCompany(companyToUpdate);
    }
  }, [companyData, id]);

  async function HandleSubmitCompany(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    updateCompany(id || "", updateCompanyState);

    if (!isEmailValid) {
      setIsEmailValid(false);
      return;
    }

    try {
      await api.put(`/company/${id}`, {
        NomedoCliente: updateCompanyState.NomedoCliente,
        Senha: updateCompanyState.Senha,
        NomedaEmpresa: updateCompanyState.NomedaEmpresa,
        CEP: updateCompanyState.CEP,
        Endereco: updateCompanyState.Endereco,
        Numero: Number(updateCompanyState.Numero),
        Telefone: updateCompanyState.Telefone,
        Email: email,
      });

      alert("Empresa Update com sucesso");
      companyNavigate("/");
    } catch (error) {
      console.error(error);
      alert("Erro ao Atualizar Empresa");
    }
  }

  return (
    <section className="create-company-container">
      <h1 className="create-company-title">Atualizar Empresa</h1>

      <form
        action=""
        onSubmit={HandleSubmitCompany}
        className="create-company-form"
      >
        <div className="company-container-1">
          <div className="company-names-content">
            <div className="div-column">
              <label htmlFor="clienteNome" className="label-text">
                Nome do Cliente
              </label>
              <input
                type="text"
                id="clienteNome"
                name="NomedoCliente"
                onChange={handleInputChange}
                value={updateCompanyState.NomedoCliente}
                className="input-company"
                required
              />
            </div>

            <div className="div-column">
              <label htmlFor="empresaNome" className="label-text">
                Nome da Empresa
              </label>
              <input
                type="text"
                id="empresaNome"
                name="NomedaEmpresa"
                onChange={handleInputChange}
                value={updateCompanyState.NomedaEmpresa}
                className="input-company"
                required
              />
            </div>
          </div>
          <div className="company-names-content">
            <div className="div-column">
              <label htmlFor="email" className="label-text">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="Email"
                onChange={handleInputChange}
                value={updateCompanyState.Email}
                className={`input-company-email ${
                  isEmailValid ? "" : "invalid-email"
                }`}
                required
              />
              {!isEmailValid && <p className="error-message">Email inválido</p>}
            </div>

            <div className="div-column">
              <label htmlFor="telefone" className="label-text">
                Telefone
              </label>
              <InputMask
                mask="+ 55 (99)99999-9999"
                type="text"
                id="telefone"
                name="Telefone"
                onChange={handleInputChange}
                value={updateCompanyState.Telefone}
                className="input-company"
                required
              />
            </div>
          </div>
        </div>

        <div className="company-container-2">
          <div className="company-names-content">
            <div className="div-column">
              <label htmlFor="cnpj" className="label-text">
                CNPJ
              </label>
              <InputMask
                mask="99.999.999/9999-99"
                type="text"
                id="cnpj"
                name="CNPJ"
                onChange={handleInputChange}
                value={updateCompanyState.CNPJ}
                className="input-company"
                required
                disabled
              />
            </div>
          </div>

          <div className="div-column">
            <label htmlFor="senha" className="label-text">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="Senha"
              onChange={handleInputChange}
              value={updateCompanyState.Senha}
              className="input-company"
              required
            />
          </div>
        </div>

        <div className="company-container-3">
          <div className="div-column-cep">
            <label htmlFor="cep" className="label-text">
              CEP
            </label>
            <InputMask
              mask="99999-999"
              type="text"
              id="cep"
              name="CEP"
              onChange={handleInputChange}
              value={updateCompanyState.CEP}
              className="input-company-cep"
              required
            />
          </div>

          <div className="company-names-content">
            <div className="div-column">
              <label htmlFor="endereco" className="label-text">
                Endereco
              </label>
              <input
                type="text"
                id="endereco"
                name="Endereco"
                onChange={handleInputChange}
                value={updateCompanyState.Endereco}
                className="input-company-address"
                required
              />
            </div>

            <div className="div-column">
              <label htmlFor="numero" className="label-text">
                Numero
              </label>
              <input
                type="number"
                id="numero"
                name="Numero"
                onChange={handleInputChange}
                value={updateCompanyState.Numero}
                className="input-company-number"
                required
              />
            </div>
          </div>
        </div>
        <button type="submit" className="button-company">
          Atualizar
        </button>
      </form>
    </section>
  );
}
