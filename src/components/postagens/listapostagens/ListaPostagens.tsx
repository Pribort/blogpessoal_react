import { useNavigate } from "react-router-dom";
import CardPostagens from "../cardpostagens/CardPostagens";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Postagem from "../../../models/Postagem";
import { buscar } from "../../../services/Service";
import { Oval } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaPostagens() {
  const navigate = useNavigate();

  const [postagens, setPostagens] = useState<Postagem[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPostagens() {
    try {
      await buscar("/postagens", setPostagens, {
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
    buscarPostagens();
  }, [postagens.length]);

  return (
    <>
      {postagens.length === 0 && (
        <div className="flex justify-center items-center h-screen">
          <Oval
            visible={true}
            height={100}
            width={100}
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
      <div
        className="container mx-auto my-4 
                grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {postagens.map((postagem) => (
          <CardPostagens key={postagem.id} postagem={postagem} />
        ))}
      </div>
    </>
  );
}

export default ListaPostagens;
