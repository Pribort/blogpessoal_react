import Popup from "reactjs-popup";
import FormPostagem from "../formpostagem/FormPostagem";
import "reactjs-popup/dist/index.css";
import "./ModalPostagem.css";
import { CornerDownRight } from "lucide-react";

function ModalPostagem() {
  return (
    <>
      <Popup
        trigger={
          <button className="popup-button flex items-center gap-2">
            <span>Nova Postagem</span>
            <CornerDownRight size={20} />
          </button>
        }
        modal
        overlayStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <FormPostagem />
      </Popup>
    </>
  );
}

export default ModalPostagem;
