import { useNavigate } from "react-router";
import UpperImage from "../../assets/ImageUpper.svg";
import LowerImage from "../../assets/ImageLower.svg";
import Button from "../../components/Button/Button";
import styles from "./SplashScreen.module.scss";

function SplashScreen() {
    const navigate = useNavigate();

    return (
        <div className={styles.SplashScreen}>
            <div className={styles.imagesContainer}>
                <img src={UpperImage} alt="Upper Image" className={styles.UpperImage} />
                <img src={LowerImage} alt="Lower Image" className={styles.lowerImage} />
            </div>

            <div className={styles.textContainer}>
                <h1>Believe yourself</h1>
                <p>Train like a pro</p>
            </div>

            <Button
                className={styles.splashButton}
                onClick={() => navigate("/home")}
            >
                Start Training
            </Button>
        </div>
    );
}
export default SplashScreen;