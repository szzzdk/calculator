interface ButtonProps {
  children?: React.ReactNode;
  onClick?: (value?: string) => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <>
      <div>
        <button
          onClick={() =>
            onClick && typeof children === "string" && onClick(children)
          }
          type="button"
          className={`flex justify-center items-center w-12 rounded-full mb-1 ${className}`}
        >
          {children}
        </button>
      </div>
    </>
  );
};
