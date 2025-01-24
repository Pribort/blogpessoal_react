import ListaPostagens from "../../components/postagens/listapostagens/ListaPostagens";
import ModalPostagem from "../../components/postagens/modalpostagem/ModalPostagem";

function Home() {
  return (
    <>
      <div className="relative w-full">
        <img
          src="https://i.imgur.com/diDuqqt.jpg"
          alt="Imagem Página Home"
          className="w-full h-[500px] object-cover brightness-90"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/40 text-white px-8">
          <h2 className="text-4xl md:text-5xl font-bold flex items-center gap-2">
            ✨ Seja Bem-vindx!
          </h2>
          <p className="text-lg md:text-xl text-white/80">
            Compartilhe aqui as suas experiências, desabafos ou curiosidades 💖
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <ModalPostagem />
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12 flex items-center justify-center ">
        <ListaPostagens />
      </div>
    </>
  );
}

export default Home;
