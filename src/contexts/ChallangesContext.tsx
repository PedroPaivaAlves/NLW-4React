import { createContext, ReactNode, useEffect, useState } from "react";
import challengesJson from "../../challenges.json";
import Cookies from "js-cookie";
import { LevelUpModal } from "../components/LevelUpModal";

interface ChallangesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challangesCompleted: number;
}

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}
interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challangesCompleted: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  experienceToNextLevel: number;
  completeChallenge: () => void;
  closeLevelUpModel: () => void;
}

export const ChallangesContext = createContext({} as ChallengesContextData);

export function ChallangesProvider({
  children,
  ...rest
}: ChallangesProviderProps) {
  const [level, setLevel] = useState(!isNaN(rest.level) ? rest.level : 1);
  const [currentExperience, setCurrentExperience] = useState(
    !isNaN(rest.currentExperience) ? rest.currentExperience : 0
  );
  const [challangesCompleted, setChallangesCompleted] = useState(
    !isNaN(rest.challangesCompleted) ? rest.challangesCompleted : 0
  );
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  //Solicitando permissão de exibição de notificações
  useEffect(() => {
    Notification.requestPermission();
  }, []);

  //salvando datos nos cookies com a biblioteca js-cookies
  useEffect(() => {
    Cookies.set("level", String(level));
    Cookies.set("currentExperience", String(currentExperience));
    Cookies.set("challangesCompleted", String(challangesCompleted));
  }, [level, currentExperience, challangesCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModel() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(
      Math.random() * challengesJson.length
    );
    const challenge = challengesJson[randomChallengeIndex];

    setActiveChallenge(challenge);

    //adicionando audio
    new Audio("/notification.mp3").play();
    if (Notification.permission === "granted") {
      new Notification("Novo Desafio ", {
        body: `Valendo ${challenge.amount} xp!`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }
    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      levelUp();
      finalExperience = finalExperience - experienceToNextLevel;
    }
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallangesCompleted(challangesCompleted + 1);
  }

  return (
    <ChallangesContext.Provider
      value={{
        level,
        currentExperience,
        challangesCompleted,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge,
        closeLevelUpModel,
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallangesContext.Provider>
  );
}
