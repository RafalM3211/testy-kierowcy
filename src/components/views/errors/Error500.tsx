import ErrorPageTemplate from "./ErrorPageTemplate";

export default function Error404() {
  return (
    <ErrorPageTemplate
      errorCode={500}
      errorMessage="Błąd wewnętrzny serwera. Przepraszamy"
    />
  );
}
