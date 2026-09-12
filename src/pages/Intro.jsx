import { useEffect, useState } from "react";
import "../styles/intro.css";

function Intro() {

    const messages = [
        "Power outage?",
        "Water shortage?",
        "Mess isn't clean?",
        "Every issue. One Solution."
    ];

    const [messageIndex, setMessageIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [bulbOn, setBulbOn] = useState(false);
    const [lightMode, setLightMode] = useState(false);

    useEffect(() => {

        let letterIndex = 0;
        let isCancelled = false;

        function flickerBulb(callback) {

            let count = 0;

            const flicker = setInterval(() => {

                setBulbOn(prev => !prev);

                count++;

                if (count === 6) {

                    clearInterval(flicker);

                    setBulbOn(false);

                    if (!isCancelled) {
                        callback();
                    }

                }

            }, 180);
        }

        function typeMessage() {

            if (isCancelled) return;

            if (letterIndex < messages[messageIndex].length) {

                setDisplayText(
                    messages[messageIndex].substring(0, letterIndex + 1)
                );

                letterIndex++;

                setTimeout(typeMessage, 70);

            } else {

                if (messageIndex === messages.length - 1) {

                    setShowButton(true);

                } else {

                    setTimeout(eraseMessage, 1500);

                }
            }
        }

        function eraseMessage() {

            if (isCancelled) return;

            if (letterIndex > 0) {

                setDisplayText(
                    messages[messageIndex].substring(0, letterIndex - 1)
                );

                letterIndex--;

                setTimeout(eraseMessage, 30);

            } else {

                setMessageIndex(prev => prev + 1);

            }
        }

        flickerBulb(typeMessage);

        return () => {
            isCancelled = true;
        };

    }, [messageIndex]);


    function handleEnter() {

        setBulbOn(true);
        setLightMode(true);
        setShowButton(false);

        setTimeout(() => {

            window.location.href = "/login";

        }, 1800);

    }


    return (

        <section
            id="intro"
            className={lightMode ? "light-mode" : ""}
        >

            <div className="wire"></div>

            <div
                className={`bulb ${bulbOn ? "on" : ""}`}
            ></div>

            <div className="intro-content">

                <h1 id="introText">
                    {displayText}
                </h1>

                <button
                    id="enterBtn"
                    className={showButton ? "show" : ""}
                    onClick={handleEnter}
                >
                    Resolve360
                </button>

            </div>

        </section>

    );

}

export default Intro;