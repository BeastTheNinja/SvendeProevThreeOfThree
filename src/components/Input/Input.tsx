import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

function Input({ label, id, ...props }: InputProps) {
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}

      <input
        id={id}
        {...props}
      />
    </div>
  );
}

export default Input;
