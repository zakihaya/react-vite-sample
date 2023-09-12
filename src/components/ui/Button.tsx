import "./Button.scss";

type ButtonProps = {
  text: string;
  onClick: () => void;
};

const ButtonComponent = ({ text, onClick }: ButtonProps) => {
  return (
    <div className="button" onClick={onClick}>
      {text}
    </div>
  );
};

export default ButtonComponent;
