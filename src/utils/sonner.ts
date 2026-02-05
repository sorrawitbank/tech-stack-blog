import { toast } from "sonner";

interface Params {
  message: string;
  description: string;
}

const sonner = {
  success: (params: Params) => {
    toast.success(params.message, {
      description: params.description,
      position: "bottom-right",
      style: {
        padding: "16px",
        backgroundColor: "var(--color-brand-green)",
        backdropFilter: "blur(20px)",
        border: "0px",
      },
      classNames: {
        icon: "text-white size-8!",
        title: "text-headline-4 text-white!",
        description: "text-body-2 text-white!",
      },
    });
  },
  error: (params: Params) => {
    toast.error(params.message, {
      description: params.description,
      position: "bottom-right",
      style: {
        padding: "16px",
        backgroundColor: "var(--color-brand-red)",
        backdropFilter: "blur(20px)",
        border: "0px",
      },
      classNames: {
        icon: "text-white size-8!",
        title: "text-headline-4 text-white!",
        description: "text-body-2 text-white!",
      },
    });
  },
};

export default sonner;
