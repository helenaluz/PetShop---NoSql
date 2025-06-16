import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image"
import logo from "../../public/logo.png";    
import style from './globals.css';

export default function header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">        
          <a className={`navbar-brand ${style.texto}`} href="#">
          <Image src={logo} width="80" height="80"/>
            <p >Animalia</p>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="./">
                  Home
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Funcionários
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item nav-link" href="/funcionarios/cadastro">
                      Cadastro
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item nav-link" href="/funcionarios/consultar">
                      Ver todos
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Pets
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item nav-link" href="#">
                      Cadastro
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item nav-link" href="./funcionarios">
                      Ver todos
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item nav-link" href="./cadastro">
                      Editar/ Alterar
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Consulta
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item nav-link" href="#">
                      Cadastro
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item nav-link" href="./funcionarios">
                      Ver todos
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item nav-link" href="./cadastro">
                      Editar/ Alterar
                    </a>
                  </li>
                </ul>
              </li>
              
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Produtos
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item nav-link" href="#">
                      Cadastro
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item nav-link" href="./funcionarios">
                      Ver todos
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item nav-link" href="./cadastro">
                      Editar/ Alterar
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
