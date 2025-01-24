import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Postagem from "../../../models/Postagem";
import { buscar, deletar } from "../../../services/Service";
import { Oval } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarPostagem() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: {
          Authorization: token,
        },
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

  async function deletarPostagem() {
    setIsLoading(true);

    try {
      await deletar(`/postagens/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      ToastAlerta("Postagem apagada com sucesso", "sucesso");
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao deletar a postagem.", "erro");
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/postagens");
  }

  return (
    <div className="relative h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-[url(https://i.imgur.com/qIdi2c3.jpg)] bg-cover bg-center bg-no-repeat opacity-50"></div>
      <div className="relative z-10 container w-1/3 mx-auto text-center bg-white/80 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-cute text-feminineDark-300 my-4">
          Deletar Postagem
        </h1>
        <p className="font-semibold text-feminineDark-400 mb-4">
          Você tem certeza de que deseja apagar a postagem a seguir?
        </p>
        <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
          <header className="py-2 px-6 bg-feminineDark-700 text-feminineDark-50 font-bold text-2xl">
            Postagem
          </header>
          <div className="p-8 text-3xl text-feminineDark-300 font-cute bg-feminine-100 h-full">
            <p>{postagem.titulo}</p>
            <p>{postagem.texto}</p>
          </div>
          <div className="flex">
            <button
              className="text-feminineDark-50 bg-feminineDark-400 hover:bg-feminineDark-700 w-full py-2"
              onClick={retornar}
            >
              Não
            </button>
            <button
              className="w-full text-feminineDark-50 bg-red-500 hover:bg-red-700 flex items-center justify-center"
              onClick={deletarPostagem}
            >
              {isLoading ? (
                <Oval
                  visible={true}
                  height="24"
                  color="white"
                  ariaLabel="oval-loading"
                />
              ) : (
                <span>Sim</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeletarPostagem;
