import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { BookOpen } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const { handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    alert("O Usuário foi desconectado com sucesso!");
    navigate("/");
  }

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

            <div className="flex gap-4">
              Postagens
              <Link to="/temas" className="hover:underline">
                Temas
              </Link>
              <Link to="/cadastrartema" className="hover:underline">
                Cadastrar tema
              </Link>
              Perfil
              <Link to="" onClick={logout} className="hover:underline">
                Sair
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
