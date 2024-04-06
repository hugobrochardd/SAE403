import { useRouteError, useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import { XCircle } from "react-feather";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-10 text-center h-screen justify-center">
      <XCircle className="text-red-500 size-40" />
      <p className="text-2xl text-neutral-100">Désolé, une erreur inattendue s'est produite.</p>
      <p className="text-lg text-gray-500">
        <i>{error.statusText || error.message}</i>
      </p>
      <Button intent="primary" active="true" size="small" text="white"
        className=""
        onClick={() => navigate(-1)}
      >
        Retour
      </Button>
    </div>
  );
}