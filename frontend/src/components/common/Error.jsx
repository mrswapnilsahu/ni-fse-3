import { useRouteError } from "react-router-dom";
// import PageNotFoundIllustration from "../assets/svgs/404.svg";

const Error = () => {
  // Get the information of route error using useRouteError hook
  const { status: statusCode, statusText } = useRouteError();
  return (
    <div className="not-found--container">
      {/* <img src={PageNotFoundIllustration} alt="Page Not found" /> */}
      <h1>
        {statusCode} : {statusText}
      </h1>
    </div>
  );
};

export default Error;
