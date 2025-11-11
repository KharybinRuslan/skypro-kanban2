import { LoaderWrapper, Spinner, LoaderText } from "./Loader.styled";

function Loader({ label = "Загрузка..." }) {
  return (
    <LoaderWrapper role="status" aria-live="polite">
      <Spinner />
      <LoaderText>{label}</LoaderText>
    </LoaderWrapper>
  );
}

export default Loader;

