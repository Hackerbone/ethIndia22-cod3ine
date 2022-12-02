import React from "react";

type ButtonProp = {
  title: string;
  isLoading?: boolean;
  onClickFunc: any;
  children?: any;
  style?: any;
};

const Button: React.FC<ButtonProp> = ({
  title,
  onClickFunc,
  isLoading = false,
  children,
  style,
}) => {
  return (
    <button onClick={onClickFunc} disabled={isLoading} style={style}>
      {title}
      {children}
    </button>
  );
};

export default Button;
