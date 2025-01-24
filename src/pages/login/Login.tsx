import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { AuthContext } from "../../contexts/AuthContext";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import UsuarioLogin from "../../models/UsuarioLogin";
import { Oval } from "react-loader-spinner";

function Login() {
  const navigate = useNavigate();

  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  );

  useEffect(() => {
    if (usuario.token !== "") {
      navigate("/home");
    }
  }, [usuario]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

  function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-sans font-bold ">
        <form
          className="flex justify-center items-center flex-col w-1/2 gap-4"
          onSubmit={login}
        >
          <h2 className="text-feminineDark-800 text-5xl ">Entrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario" className="text-feminineDark-800">
              Usuário
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="border-2 border-slate-700 rounded p-2"
              value={usuarioLogin.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha" className="text-feminineDark-800">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border-2 border-slate-700 rounded p-2"
              value={usuarioLogin.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <button
            type="submit"
            className="rounded font-cute text-white bg-feminineDark-400 hover:bg-feminineDark-500 w-1/2 py-2
                                     flex justify-center"
          >
            {isLoading ? (
              <Oval
                visible={true}
                height="24"
                color="white"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              <span>Entrar</span>
            )}
          </button>

          <hr className="border-slate-800 w-full " />

          <p className=" font-cute text-feminineDark-700">
            Ainda não tem uma conta?{" "}
            <Link
              to="/cadastro"
              className="text-feminineDark-600 hover:underline"
            >
              Cadastre-se
            </Link>
          </p>
        </form>
        <div className="fundoLogin hidden lg:block"></div>
      </div>
    </>
  );
}

export default Login;
