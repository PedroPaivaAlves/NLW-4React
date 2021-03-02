import "../styles/global.css";
import {
  ChallangesContext,
  ChallangesProvider,
} from "../contexts/ChallangesContext";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
