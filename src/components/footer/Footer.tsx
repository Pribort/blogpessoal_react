import { Facebook, Instagram, Linkedin } from "lucide-react";
import { ReactNode, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function Footer() {
  let data = new Date().getFullYear();

  const { usuario } = useContext(AuthContext);
  let component: ReactNode;
  if (usuario.token !== "") {
    component = (
      <footer className="bg-feminine-100 border-t-2 border-feminine-400 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-feminineDark-700/80 text-center text-base font-cute">
              &copy; {data} | Blog Pessoal Priscila Bortniuk ✨
            </p>
            <div className="flex items-center gap-6">
              <p className="text-feminineDark-700/80 text-center text-base font-cute">
                Acesse nossas redes sociais:
              </p>
              <div className="flex gap-3">
                <Linkedin
                  size={20}
                  className="hover:text-feminineDark-100 transition-colors duration-300"
                />
                <Instagram
                  size={20}
                  className="hover:text-feminineDark-100 transition-colors duration-300"
                />
                <Facebook
                  size={20}
                  className="hover:text-feminineDark-100 transition-colors duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return <>{component}</>;
}

export default Footer;
