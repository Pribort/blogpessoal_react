import { Link } from "react-router-dom";
import Postagem from "../../../models/Postagem";

interface CardPostagensProps {
  postagem: Postagem;
}

function CardPostagem({ postagem }: CardPostagensProps) {
  return (
    <div className="border border-feminineDark-400 flex flex-col rounded-lg overflow-hidden shadow-md bg-[#F9F7F6]">
      <div className="flex w-full bg-feminineDark-700 py-3 px-6 items-center gap-4">
        <img
          src={postagem.usuario?.foto || "caminho/para/imagem-padrao.jpg"}
          className="h-12 w-12 rounded-full object-cover border-2 border-feminineDark-400"
          alt={postagem.usuario?.nome}
        />
        <h3 className="text-lg font-bold text-[#F9F7F6] text-center uppercase">
          {postagem.usuario?.nome}
        </h3>
      </div>

      <div className="p-4">
        <h4 className="text-lg font-semibold uppercase text-[#A87C7B]">
          {postagem.titulo}
        </h4>
        <p className="text-[#636550] mt-2">{postagem.texto}</p>
        <p className="mt-2 text-sm text-[#A87C7B]">
          Tema: {postagem.tema?.descricao}
        </p>
        <p className="mt-2 text-sm text-[#A87C7B]">
          Data:{" "}
          {new Intl.DateTimeFormat(undefined, {
            dateStyle: "full",
            timeStyle: "medium",
          }).format(new Date(postagem.data))}
        </p>
      </div>

      <div className="flex">
        <Link
          to={`/editarpostagem/${postagem.id}`}
          className="w-full text-[#F9F7F6] bg-[#A87C7B] hover:bg-[#636550] flex items-center justify-center py-2 font-semibold"
        >
          <button>Editar</button>
        </Link>
        <Link
          to={`/deletarpostagem/${postagem.id}`}
          className="text-white bg-red-500 
	                 hover:bg-red-700 w-full flex items-center justify-center"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardPostagem;
