import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const error = ({ msg, time }) => {
  return toast.error(
    { msg },
    {
      position: "top-right",
      autoClose: { time } || 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    }
  );
};
const success = ({ msg, time }) => {
  return toast.success(
    { msg },
    {
      position: "top-right",
      autoClose: { time } || 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    }
  );
};
const warn = ({ msg, time }) => {
  return toast.warn(
    { msg },
    {
      position: "top-right",
      autoClose: { time } || 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    }
  );
};
const info = ({ msg, time }) => {
  return toast.info(
    { msg },
    {
      position: "top-right",
      autoClose: { time } || 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    }
  );
};
const def = ({ msg, time }) => {
  return toast(
    { msg },
    {
      position: "top-right",
      autoClose: { time } || 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    }
  );
};

const container=()=>{
    return <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
    />
}
export default {error,success,warn,info,def,container};
