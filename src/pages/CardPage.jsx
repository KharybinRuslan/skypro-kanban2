import { useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import PopBrowse from "../components/popups/PopBrowse/PopBrowse";
import "./CardPage.css";

function CardPage() {
  const { id } = useParams();

  return (
    <div className="wrapper">
      <Header />
      <div style={{ display: "none" }}>Card ID: {id}</div>
      <PopBrowse />
    </div>
  );
}

export default CardPage;
