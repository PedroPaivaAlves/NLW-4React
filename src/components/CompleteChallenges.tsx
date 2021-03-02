import { useContext } from "react";
import { ChallangesContext } from "../contexts/ChallangesContext";
import styles from "../styles/components/CompletedChallenges.module.css";

export function CompleteChallenges() {
  const { challangesCompleted } = useContext(ChallangesContext);
  return (
    <div className={styles.CompletedeChallengesConteiner}>
      <span>Desafios Completos</span>
      <span>{challangesCompleted}</span>
    </div>
  );
}
