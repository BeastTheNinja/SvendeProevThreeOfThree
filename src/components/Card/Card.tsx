import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  title?: string;
};

function Card({ children, title }: CardProps) {
  return (
    <article>
      {title && <h2>{title}</h2>}

      {children}
    </article>
  );
}

export default Card;
