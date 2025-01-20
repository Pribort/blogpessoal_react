import { Facebook, Instagram, Linkedin } from "lucide-react";

function Footer() {
  let data = new Date().getFullYear();

  return (
    <>
      <div className="flex justify-center bg-olive-800 text-white">
        <div className="container flex flex-col items-center py-4">
          <p className="text-xl font-sans">
            Blog Pessoal Priscila Bortniuk | Copyright: {data}
          </p>
          <p className="text-lg font-sans">Acesse nossas redes sociais</p>
          <div className="flex gap-2">
            <Linkedin
              size={28}
              className="hover:text-olive-200 transition-colors"
            />
            <Instagram
              size={28}
              className="hover:text-olive-200 transition-colors"
            />
            <Facebook
              size={28}
              className="hover:text-olive-200 transition-colors"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
