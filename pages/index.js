import styles from "../styles/Home.module.css";
import LandingPage from "./../pages/ui/landingPage/LandingPage";
import Register from "./ui/auth/register";

export default function Home() {
  return (
    <div className={styles.container}>
      <Register />
    </div>
  );
}
