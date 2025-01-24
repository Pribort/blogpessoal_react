import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import { buscar, deletar } from "../../../services/Service";
import { Oval } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarTema() {
  const navigate = useNavigate();

  const [tema, setTema] = useState<Tema>({} as Tema);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
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

  async function deletarTema() {
    setIsLoading(true);

    try {
      await deletar(`/temas/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      ToastAlerta("Tema apagado com sucesso", "sucesso");
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao deletar o tema.", "erro");
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/temas");
  }

  return (
    <div className="relative h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-[url(https://i.imgur.com/qIdi2c3.jpg)] bg-cover bg-center bg-no-repeat opacity-50"></div>
      <div className="relative z-10 container w-1/3 mx-auto text-center bg-white/80 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-cute text-feminineDark-300 my-4">
          Deletar Tema
        </h1>
        <p className="font-semibold text-feminineDark-400 mb-4">
          Você tem certeza de que deseja apagar o tema a seguir?
        </p>
        <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
          <header className="py-2 px-6 bg-feminineDark-700 text-feminineDark-50 font-bold text-2xl">
            Tema
          </header>
          <p className="p-8 text-3xl text-feminineDark-300 font-cute bg-feminine-100 h-full">
            {tema.descricao}
          </p>
          <div className="flex">
            <button
              className="text-feminineDark-50 bg-feminineDark-400 hover:bg-feminineDark-700 w-full py-2"
              onClick={retornar}
            >
              Não
            </button>
            <button
              className="w-full text-feminineDark-50 bg-red-500 hover:bg-red-700 flex items-center justify-center"
              onClick={deletarTema}
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
export default DeletarTema;
