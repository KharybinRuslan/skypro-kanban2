import { useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import PopBrowse from "../components/popups/PopBrowse/PopBrowse";
import "./CardPage.css";

function CardPage() {
  const { id } = useParams();

  return (
    <div className="wrapper">
      <Header />
      <PopBrowse id={id} />
    </div>
  );
}

export default CardPage;
