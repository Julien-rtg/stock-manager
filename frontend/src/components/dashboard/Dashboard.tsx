import { Nav } from "../nav/Nav";
import { ReactElement } from "react";
import { ToastContainer } from "react-toastify";

export const Dashboard = ({ template }: { template: ReactElement }) => {
  return (
    <div>
      <ToastContainer />
      <Nav template={template} />
    </div>
  );
};
