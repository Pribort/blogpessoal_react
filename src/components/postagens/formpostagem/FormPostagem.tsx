import { useState, useContext, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Postagem from "../../../models/Postagem";
import Tema from "../../../models/Tema";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { Oval } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormPostagem() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [temas, setTemas] = useState<Tema[]>([]);

  const [tema, setTema] = useState<Tema>({ id: 0, descricao: "" });
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPostagemPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  async function buscarTemaPorId(id: string) {
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

  async function buscarTemas() {
    try {
      await buscar("/temas", setTemas, {
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
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarTemas();

    if (id !== undefined) {
      buscarPostagemPorId(id);
    }
  }, [id]);

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema,
    });
  }, [tema]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
      usuario: usuario,
    });
  }

  function retornar() {
    navigate("/postagens");
  }

  async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta("Postagem atualizada com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao atualizar a Postagem", "erro");
        }
      }
    } else {
      try {
        await cadastrar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta("Postagem cadastrada com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao cadastrar a Postagem", "erro");
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  const carregandoTema = tema.descricao === "";

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8">
        {id !== undefined ? "Editar Postagem" : "Cadastrar Postagem"}
      </h1>

      <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovaPostagem}>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo" className="font-cute text-feminineDark-400">
            Título da Postagem
          </label>
          <input
            type="text"
            placeholder="Titulo"
            name="titulo"
            required
            className="bg-feminineDark-50 border-2 border-slate-700 rounded p-2"
            value={postagem.titulo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo" className="font-cute text-feminineDark-400">
            Texto da Postagem
          </label>
          <input
            type="text"
            placeholder="Texto"
            name="texto"
            required
            className="bg-feminineDark-50 border-2 border-slate-700 rounded p-2 focus:outline-none focus:ring-feminine-400 "
            value={postagem.texto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-cute text-feminineDark-400">Tema da Postagem</p>
          <select
            name="tema"
            id="tema"
            className="border p-2 border-slate-800 rounded focus:outline-none focus:ring-feminine-300"
            onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
          >
            <option value="" selected disabled className="bg-feminineDark-50">
              ✨ Selecione um Tema
            </option>

            {temas.map((tema) => (
              <option
                key={tema.id}
                value={tema.id}
                className="text-feminineDark-400 hover:bg-feminine-50 focus:outline-none focus:ring-0 focus:border-transparent focus:bg-transparent hover:outline-none hover:ring-0"
              >
                {tema.descricao}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="rounded-lg text-feminine-50 border-2 bg-feminineDark-700
    py-2 px-6 hover:bg-feminineDark-400 hover:bg-opacity-50 transition-all cursor-pointer"
          disabled={carregandoTema}
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
            <span>{id !== undefined ? "Atualizar" : "Cadastrar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormPostagem;
