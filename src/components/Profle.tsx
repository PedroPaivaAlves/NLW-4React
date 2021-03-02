import { useContext } from "react";
import { ChallangesContext } from "../contexts/ChallangesContext";
import styles from "../styles/components/Profile.module.css";

export function Profile() {
  const { level } = useContext(ChallangesContext);
  return (
    <div className={styles.profileContainer}>
      <img
        src="https://thumbs.jusbr.com/filters:format(webp)/imgs.jusbr.com/publications/artigos/images/capturar1452194585.JPG"
        alt="profile pic"
      />

      <div>
        <strong>Imagem Pic</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
