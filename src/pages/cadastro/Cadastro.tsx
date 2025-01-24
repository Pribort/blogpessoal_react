import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { cadastrarUsuario } from "../../services/Service";
import { useNavigate } from "react-router-dom";
import Usuario from "../../models/Usuario";
import { Oval } from "react-loader-spinner";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Cadastro() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmaSenha, setConfirmaSenha] = useState<string>("");
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
  });

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
  }, [usuario]);

  function retornar() {
    navigate("/login");
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true);

      try {
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
        ToastAlerta("Usuário foi cadastrado com sucesso!", "sucesso");
      } catch (error) {
        ToastAlerta("Erro ao cadastrar usuário!", "error");
      }
    } else {
      ToastAlerta(
        "Dados do usuário inconsistentes! Verifique as informações do cadastro.",
        "info"
      );
      setUsuario({ ...usuario, senha: "" });
      setConfirmaSenha("");
    }

    setIsLoading(false);
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-feminine-100">
        <form
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg"
          onSubmit={cadastrarNovoUsuario}
        >
          <h2 className="text-4xl text-center text-slate-900 mb-6">
            Cadastrar
          </h2>
          <div className="flex flex-col w-full mb-4">
            <label htmlFor="nome" className="mb-2">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="border-2 border-slate-700 rounded p-2 bg-feminineDark-50"
              value={usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex flex-col w-full mb-4">
            <label htmlFor="usuario" className="mb-2">
              Usuário
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuário"
              className="border-2 border-slate-700 rounded p-2  bg-feminineDark-50"
              value={usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex flex-col w-full mb-4">
            <label htmlFor="foto" className="mb-2">
              Foto
            </label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className="border-2 border-slate-700 rounded p-2  bg-feminineDark-50"
              value={usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex flex-col w-full mb-4">
            <label htmlFor="senha" className="mb-2">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border-2 border-slate-700 rounded p-2  bg-feminineDark-50"
              value={usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex flex-col w-full mb-6">
            <label htmlFor="confirmarSenha" className="mb-2">
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="border-2 border-slate-700 rounded p-2  bg-feminineDark-50"
              value={confirmaSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleConfirmarSenha(e)
              }
            />
          </div>
          <div className="flex justify-around w-full gap-8 mb-4">
            <button
              className="rounded text-white bg-gray-500 hover:bg-gray-700 w-1/2 py-2"
              onClick={retornar}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded text-white bg-feminineDark-400 hover:bg-feminineDark-500 w-1/2 py-2 flex justify-center"
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
                <span>Cadastrar</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Cadastro;
