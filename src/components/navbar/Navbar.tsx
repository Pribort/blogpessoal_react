import { ReactNode, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { LogOut } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    ToastAlerta("O Usuário foi desconectado com sucesso!", "info");
    navigate("/");
  }
  let component: ReactNode;

  if (usuario.token !== "") {
    component = (
      <div
        className="w-full border-b-2 border-feminine-400 py-4
                   bg-feminine-100 text-feminineDark-700"
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <Link
              to="/home"
              className="text-2xl font-cute font-bold hover:text-feminineDark-300 transition-colors duration-300"
            >
              Blog Pessoal
            </Link>
          </div>

          <div className="flex gap-4">
            <Link
              to="/postagens"
              className="relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-feminineDark-300 after:transition-all after:duration-500 hover:after:w-full font-cute"
            >
              Postagens
            </Link>
            <Link
              to="/temas"
              className="relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-feminineDark-300 after:transition-all after:duration-500 hover:after:w-full font-cute"
            >
              Temas
            </Link>
            <Link
              to="/cadastrartema"
              className="relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-feminineDark-300 after:transition-all after:duration-500 hover:after:w-full font-cute"
            >
              Cadastrar tema
            </Link>
            <Link
              to="/perfil"
              className="relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-feminineDark-300 after:transition-all after:duration-500 hover:after:w-full font-cute"
            >
              Perfil
            </Link>

            <Link
              to=""
              onClick={logout}
              className="relative flex items-center gap-2 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] 
             after:w-0 after:h-[2px] after:bg-feminineDark-300 after:transition-all after:duration-500 
             hover:after:w-full font-cute"
            >
              Sair
              <LogOut size={20} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return <>{component}</>;
}

export default Navbar;
