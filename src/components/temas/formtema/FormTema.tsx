import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormTema() {
  const navigate = useNavigate();

  const [tema, setTema] = useState<Tema>({} as Tema);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Voce precisa estar logado!", "erro");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [e.target.name]: e.target.value,
    });
  }

  function retornar() {
    navigate("/temas");
  }

  async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/temas`, tema, setTema, {
          headers: { Authorization: token },
        });
        ToastAlerta("O Tema foi atualizado com sucesso!", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao atualizar o tema.", "erro");
        }
      }
    } else {
      try {
        await cadastrar(`/temas`, tema, setTema, {
          headers: { Authorization: token },
        });
        ToastAlerta("O Tema foi cadastrado com sucesso!", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao cadastrar o tema.", "erro");
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  return (
    <div
      className="container flex flex-col items-center justify-center mx-auto bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: "url(https://i.imgur.com/CkTRQvn.jpg)",
      }}
    >
      <h1 className="text-4xl text-center my-8 text-feminine-50 z-10">
        {id === undefined ? "Cadastrar Tema" : "Editar Tema"}
      </h1>

      <form
        className="w-1/2 flex flex-col gap-6 bg-white bg-opacity-80 p-6 rounded-lg z-10"
        onSubmit={gerarNovoTema}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="descricao" className="text-feminine-700">
            Descrição do Tema
          </label>
          <input
            type="text"
            placeholder="Descreva aqui seu tema"
            name="descricao"
            className="border-2 border-feminine-400 rounded p-3 focus:outline-none focus:ring-2 focus:ring-feminine-700"
            value={tema.descricao}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <button
          className="rounded text-slate-100 bg-feminineDark-400 
             hover:bg-feminine-700 focus:ring-2 focus:ring-feminine-700 
             mx-auto  transition duration-300 w-1/2 py-2 flex justify-center"
          type="submit"
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
            <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormTema;
