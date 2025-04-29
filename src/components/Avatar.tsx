import { ImgHTMLAttributes } from "react";
import styles from "./Avatar.module.css";

//HTMLImageElement - é uma interface global, não precisa importar

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean;
  /* Como estamos dando um extends em  HTMLImageElement, não precisamos importar 
  todas as propriedades de img como, src, title, alt, etc
  */
}

export function Avatar({ hasBorder = true, ...props }: AvatarProps) {
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      {...props}
    />
  );
}
