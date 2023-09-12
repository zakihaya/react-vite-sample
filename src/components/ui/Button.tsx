import "./Button.scss";

type ButtonProps = {
  text: string;
  backgroundColor?: string;
  onClick: () => void;
};

const ButtonComponent = ({
  text,
  backgroundColor = "white",
  onClick,
}: ButtonProps) => {
  return (
    <div className="button" style={{ backgroundColor }} onClick={onClick}>
      {text}
    </div>
  );
};

export default ButtonComponent;
