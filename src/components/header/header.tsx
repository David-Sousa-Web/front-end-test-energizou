import "./header.css";

export default function Header() {
  return (
    <header className="header-container">
      <div>
        <a href="/">
          <img
            src="https://d9hhrg4mnvzow.cloudfront.net/docs.energizou.com.br/energizou-app/8284e97f-logo-plataforma_1057018000000000000028.png"
            alt=""
            className="header-logo"
          />
        </a>
      </div>

      <h1 className="header-title">Teste FullStack</h1>
    </header>
  );
}
