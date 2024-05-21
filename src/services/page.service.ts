import {toast, ToastOptions} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class PageService {
  private static _baseTheme: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  };

  static flashErrorMessage(message: string) {
    const theme: ToastOptions = this._baseTheme;
    theme.type = "error";

    const notify = () => toast(message, theme);
    notify();
  }

  static flashSuccessMessage(message: string) {
    const theme: ToastOptions = this._baseTheme;
    theme.type = "success";

    const notify = () => toast(message, theme);
    notify();
  }
}