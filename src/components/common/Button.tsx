type ButtonType = "Primary" | "Secondary" | "Text";

interface NavigationProps {
  buttonType: ButtonType;
  label?: string | React.ReactElement;
  href?: string;
}

const primaryStyle: string =
  "flex gap-1.5 h-12 px-10 py-3 text-body-1 text-white bg-brown-600 rounded-full transition-colors duration-200 hover:bg-brown-400 active:bg-brown-500 disabled:opacity-40";
const secondaryStyle: string =
  "flex gap-1.5 h-12 px-10 py-3 text-body-1 text-brown-600 border border-brown-400 rounded-full transition-colors duration-200 hover:text-brown-400 active:text-brown-500 disabled:border-brown-600 disabled:opacity-40";
const textStyle: string =
  "flex gap-1.5 text-body-1 underline text-brown-600 transition-colors duration-200 hover:text-brown-400 active:text-brown-500 disabled:opacity-40";

export function NavigationButton(props: NavigationProps): React.ReactElement {
  switch (props.buttonType) {
    case "Primary":
      return (
        <a href={props.href} className={primaryStyle}>
          {props.label}
        </a>
      );
    case "Secondary":
      return (
        <a href={props.href} className={secondaryStyle}>
          {props.label}
        </a>
      );
    case "Text":
      return (
        <a href={props.href} className={textStyle}>
          {props.label}
        </a>
      );
  }
}
