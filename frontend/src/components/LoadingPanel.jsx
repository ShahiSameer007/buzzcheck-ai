import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


const steps = [
  "🧠 Reading content...",
  "🎭 Detecting emotional language...",
  "📌 Extracting claims...",
  "⚠️ Assessing manipulation...",
  "📊 Computing trust score..."
];

function LoadingPanel() {

  const [step, setStep] = useState(0);

  useEffect(() => {

    const timer = setInterval(() => {

      setStep((prev) => {

        if (prev >= steps.length - 1)
          return prev;

        return prev + 1;

      });

    }, 1400);

    return () => clearInterval(timer);

  }, []);

  return (

    <div className="loading-container">

      <h1>
        BuzzCheck <span>AI</span>
      </h1>

    <motion.div
        className="loader-orb"
        animate={{
            rotate:360
        }}
        transition={{
            repeat:Infinity,
            duration:2.5,
            ease:"linear"
        }}
    >

        <div className="orb-ring"></div>

        <div className="orb-dot"></div>

    </motion.div>

      <AnimatePresence mode="wait">

        <motion.h2

          key={step}

            initial={{
                opacity:0,
                y:20,
                filter:"blur(8px)"
            }}

            animate={{
                opacity:1,
                y:0,
                filter:"blur(0px)"
            }}

            exit={{
                opacity:0,
                y:-20,
                filter:"blur(8px)"
            }}

            transition={{
                duration:.55,
                ease:"easeOut"
            }}

        >

          {steps[step]}

        </motion.h2>

      </AnimatePresence>

    </div>

  );

}

export default LoadingPanel;