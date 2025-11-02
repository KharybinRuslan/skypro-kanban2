import Header from "../components/Header/Header";
import PopNewCard from "../components/popups/PopNewCard/PopNewCard";
import "./NewCardPage.css";

function NewCardPage() {
  return (
    <div className="wrapper">
      <Header />
      <PopNewCard />
    </div>
  );
}

export default NewCardPage;
