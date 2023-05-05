import loaderGif from "../../assests/loader.gif";
import ReactDom from "react-dom";

const Loader = () => {
  return ReactDom.createPortal(
    <div className="fixed z-50 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50">
      <div className="absolute">
        <img src={loaderGif} alt="loading..." className="mx-auto" />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;
