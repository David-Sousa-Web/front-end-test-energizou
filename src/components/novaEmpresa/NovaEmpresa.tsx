import { FormEvent, useState, ChangeEvent, useEffect } from "react";
import { api } from "../../lib/api";
import "./NovaEmpresa.css";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import validateEmail from "../../lib/EmailValidator";
import axios from "axios";

export default function NovaEmpresa() {
  const companyNavigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [cep, setCep] = useState("");
  const [postCompany, setPostCompany] = useState({
    NomedoCliente: "",
    Senha: "",
    NomedaEmpresa: "",
    CNPJ: "",
    CEP: "",
    Endereco: "",
    Numero: 0,
    Telefone: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "CEP") {
      const cepWithoutMask = value.replace(/\D/g, "");
      setCep(cepWithoutMask);
    } else {
      setPostCompany({
        ...postCompany,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    if (cep.length === 8) {
      axios
        .get(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => {
          const { data } = response;
          setPostCompany((prevState) => ({
            ...prevState,
            Endereco: data.logradouro,
          }));
        })
        .catch((error) => {
          console.error("Erro ao obter dados do CEP:", error);
        });
    }
  }, [cep]);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail));

  async function HandleSubmitCompany(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isEmailValid) {
      setIsEmailValid(false);
      return;
    }

    try {
      await api.post("/company", {
        NomedoCliente: postCompany.NomedoCliente,
        Senha: postCompany.Senha,
        NomedaEmpresa: postCompany.NomedaEmpresa,
        CNPJ: postCompany.CNPJ,
        CEP: cep,
        Endereco: postCompany.Endereco,
        Numero: Number(postCompany.Numero),
        Telefone: postCompany.Telefone,
        Email: email,
      });

      alert("Empresa Cadastrada com sucesso");
      companyNavigate("/");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Erro ao Atualizar Empresa");
    }
  }

  return (
    <section className="create-company-container">
      <h1 className="create-company-title">Criar Empresa</h1>

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
                value={postCompany.NomedoCliente}
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
                value={postCompany.NomedaEmpresa}
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
                onChange={handleEmailChange}
                value={email}
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
                value={postCompany.Telefone}
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
                value={postCompany.CNPJ}
                className="input-company"
                required
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
              value={postCompany.Senha}
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
              value={cep}
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
                value={postCompany.Endereco}
                className="input-company-address"
                required
                disabled
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
                value={postCompany.Numero}
                className="input-company-number"
                required
              />
            </div>
          </div>
        </div>
        <button type="submit" className="button-company">
          Cadastrar
        </button>
      </form>
    </section>
  );
}
