import { useContext, useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import CardTemas from "../cardtemas/CardTemas";
import { buscar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaTemas() {
  const navigate = useNavigate();

  const [temas, setTemas] = useState<Tema[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

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
      ToastAlerta("Voce precisa estar logado!", "erro");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarTemas();
  }, [temas.length]);

  return (
    <>
      {temas.length === 0 && (
        <div className="flex justify-center items-center h-screen">
          <Oval
            visible={true}
            height={100}
            width={100}
            color="feminineDark-400"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
      <div className="flex justify-center  text-feminineDark-300 font-cute w-full my-4">
        <div className="container flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {temas.map((tema) => (
              <CardTemas key={tema.id} tema={tema} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaTemas;
