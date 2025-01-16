import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div
        className="w-full flex justify-center py-4
                   bg-olive-800 text-white"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              <Link to="/home" className="text-2xl font-bold">
                Blog Pessoal
              </Link>
            </div>
            <div className="flex gap-4 font-bold text-olive-200">
              Postagens Temas Cadastrar Tema Perfil Sair
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
