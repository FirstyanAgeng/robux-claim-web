import React, { useState, useEffect } from "react";
import { Menu, Loader2, CheckCircle } from "lucide-react";

// --- KOMPONEN UNTUK TRIK PSIKOLOGIS ---

// 1. Komponen Notifikasi Social Proof
const SocialProofNotification = ({ user, amount }) => (
  <div className="fixed bottom-4 left-4 bg-gray-800 border border-green-500 text-white text-sm py-2 px-4 rounded-lg shadow-lg z-50 animate-fade-in-out">
    <strong>{user}</strong> baru saja berhasil mendapatkan{" "}
    <span className="font-bold text-green-400">
      {amount.toLocaleString("en-US")} Robux!
    </span>
  </div>
);

// 2. Komponen Loading Spinner
const LoadingSpinner = ({ message }) => (
  <div className="flex flex-col items-center justify-center gap-4 text-white p-8">
    <Loader2 className="w-12 h-12 animate-spin text-primary" />
    <p className="text-lg font-semibold animate-pulse">{message}</p>
  </div>
);

// 3. Komponen Countdown Timer
const CountdownTimer = ({ initialMinutes = 10 }) => {
  const [seconds, setSeconds] = useState(initialMinutes * 60);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const secs = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="bg-red-500/20 border border-red-500 text-white text-center py-2 px-4 rounded-lg mt-6">
      <p className="font-bold">
        Penawaran ini berakhir dalam:{" "}
        <span className="text-xl tracking-wider">{formatTime(seconds)}</span>
      </p>
    </div>
  );
};

function App() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [notification, setNotification] = useState(null);

  const initialTasks = [
    {
      name: "Tugas 1: Follow Instagram",
      url: "https://www.instagram.com/acen.ggaul?igsh=anlleTR1Y2o0anR6",
      completed: false,
    },
    {
      name: "Tugas 2: Subscribe YouTube",
      url: "https://www.youtube.com/@roblox?sub_confirmation=1",
      completed: false,
    },
  ];
  const [tasks, setTasks] = useState(initialTasks);
  const [verifyingTaskIndex, setVerifyingTaskIndex] = useState(null);

  const robuxOptions = [
    { amount: 500 },
    { amount: 10000 },
    { amount: 50000 },
    { amount: 100000 },
  ];

  useEffect(() => {
    const fakeUsers = [
      "User991",
      "xXSlayerXx",
      "RobloxPro22",
      "Jenny_12",
      "GamerZ",
    ];
    const fakeAmounts = [500, 10000, 50000, 100000];
    const showRandomNotification = () => {
      const user = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
      const amount =
        fakeAmounts[Math.floor(Math.random() * fakeAmounts.length)];
      setNotification({ user, amount });
      setTimeout(() => setNotification(null), 4000);
    };
    const interval = setInterval(
      showRandomNotification,
      Math.random() * 7000 + 8000
    );
    return () => clearInterval(interval);
  }, []);

  const simulateLoading = (message, nextStep) => {
    setLoadingMessage(message);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(nextStep);
    }, 2500);
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) simulateLoading(`Mencari akun ${username}...`, 2);
  };
  const handleRobuxSelect = (amount) => {
    setSelectedAmount(amount);
    simulateLoading("Mengalokasikan Robux...", 3);
  };
  const handleVerify = () => {
    simulateLoading("Mempersiapkan verifikasi...", 4);
  };

  const handleTaskClick = (taskIndex) => {
    if (verifyingTaskIndex !== null || tasks[taskIndex].completed) return;
    window.open(tasks[taskIndex].url, "_blank", "noopener,noreferrer");
    setVerifyingTaskIndex(taskIndex);
    setTimeout(() => {
      setTasks((currentTasks) =>
        currentTasks.map((task, index) =>
          index === taskIndex ? { ...task, completed: true } : task
        )
      );
      setVerifyingTaskIndex(null);
    }, 3500);
  };

  const completedTasksCount = tasks.filter((task) => task.completed).length;
  const allTasksCompleted = completedTasksCount === tasks.length;

  const whatsappMessage = encodeURIComponent(
    `Klaim Robux: ${username} - ${selectedAmount.toLocaleString("en-US")}`
  );
  const whatsappUrl = `https://wa.me/6282185780582?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-dark flex flex-col text-white">
      {notification && (
        <SocialProofNotification
          user={notification.user}
          amount={notification.amount}
        />
      )}

      <header className="bg-dark-lighter sticky top-0 z-40 border-b border-gray-700">
        <div className="flex justify-between items-center px-4 h-14 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden w-11 h-11 flex items-center justify-center hover:bg-gray-700 rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
            <div className="text-xl font-bold">MySite</div>
          </div>
          <nav className="hidden md:flex gap-8 font-semibold">
            <a
              href="#"
              className="px-2 h-14 flex items-center hover:text-primary"
            >
              Discover
            </a>
            <a
              href="#"
              className="px-2 h-14 flex items-center hover:text-primary"
            >
              Marketplace
            </a>
            <a
              href="#"
              className="px-2 h-14 flex items-center text-primary font-bold"
            >
              Robux
            </a>
          </nav>
          <div className="w-10 h-10 bg-gray-600 rounded-full font-bold flex items-center justify-center select-none">
            {username ? username.charAt(0).toUpperCase() : "U"}
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-dark-lighter border-t border-gray-700">
            <nav className="flex flex-col py-2">
              <a
                href="#"
                className="px-4 py-3 hover:bg-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Discover
              </a>
              <a
                href="#"
                className="px-4 py-3 hover:bg-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Marketplace
              </a>
              <a
                href="#"
                className="px-4 py-3 hover:bg-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Robux
              </a>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1 w-full py-6 flex flex-col items-center justify-center gap-6 px-4">
        {isLoading ? (
          <LoadingSpinner message={loadingMessage} />
        ) : (
          <>
            {step === 1 && (
              <div className="w-full max-w-4xl animate-fade-in">
                <section
                  className="bg-cover bg-center rounded-xl p-8 md:p-12 mb-6 text-center shadow-lg"
                  style={{
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUMRByandbXnTUTzM_H0eE-qUpBQANYsaLHdV5auOXm7GxwVq4dCWsJjIfGe679oz8bys&usqp=CAU')`,
                  }}
                >
                  <div className="bg-black/60 p-6 rounded-lg">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-md">
                      Pusat Hadiah Resmi
                    </h1>
                    <p className="text-lg text-gray-200 mt-2">
                      Klaim hadiah eksklusif untuk para pemain setia!
                    </p>
                  </div>
                </section>

                <section className="bg-dark-lighter p-8 rounded-xl w-full">
                  <form
                    onSubmit={handleUsernameSubmit}
                    className="flex flex-col gap-4"
                  >
                    <label htmlFor="username" className="text-lg font-bold">
                      Roblox Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Masukkan username Anda..."
                      className="w-full p-3 text-base rounded-lg border-none outline-none text-black bg-gray-200 focus:ring-4 focus:ring-primary/50"
                      required
                    />
                    <button
                      type="submit"
                      className="w-fit bg-green-500 text-white py-3 px-7 font-bold rounded-lg hover:bg-primary-hover"
                    >
                      Periksa Akun
                    </button>
                  </form>
                </section>
              </div>
            )}

            {step === 2 && (
              <section className="bg-dark-lighter p-6 md:p-8 rounded-xl w-full max-w-4xl animate-fade-in">
                <div className="text-center mb-6">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    Pilih Jumlah Robux
                  </h1>
                  <p className="text-gray-300">
                    Selamat,{" "}
                    <span className="font-bold text-primary">{username}</span>!
                    Akun Anda memenuhi syarat.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {robuxOptions.map((option) => (
                    <button
                      key={option.amount}
                      onClick={() => handleRobuxSelect(option.amount)}
                      className="bg-dark hover:bg-gray-800 p-4 rounded-lg flex items-center justify-center gap-3 transition-colors"
                    >
                      <span className="font-bold text-xl text-green-400">
                        {option.amount.toLocaleString("en-US")} Robux
                      </span>
                    </button>
                  ))}
                </div>
                <CountdownTimer initialMinutes={10} />
              </section>
            )}

            {step === 3 && (
              <section className="bg-dark-lighter p-8 rounded-xl w-full max-w-2xl text-center animate-fade-in">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Langkah Terakhir, {username}
                </h2>
                <p className="text-gray-300 mb-6">
                  Sistem kami mendeteksi aktivitas yang tidak biasa. Untuk
                  keamanan, selesaikan verifikasi singkat untuk membuktikan Anda
                  bukan robot.
                </p>
                <button
                  onClick={handleVerify}
                  className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-md transition-colors"
                >
                  Verifikasi Sekarang
                </button>
                <CountdownTimer initialMinutes={5} />
              </section>
            )}

            {step === 4 && (
              <section className="bg-dark-lighter p-8 rounded-xl w-full max-w-2xl animate-fade-in">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Verifikasi Manusia
                </h2>
                <p className="text-gray-300 mb-6">
                  Selesaikan semua tugas untuk membuka{" "}
                  {selectedAmount.toLocaleString("en-US")} Robux.
                </p>
                <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
                  <div
                    className="bg-green-500 h-4 rounded-full transition-all duration-500"
                    style={{
                      width: `${(completedTasksCount / tasks.length) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="text-center text-sm text-gray-400 mb-6">
                  {completedTasksCount} dari {tasks.length} tugas selesai
                </p>

                <div className="flex flex-col gap-4 mb-8">
                  {tasks.map((task, index) => (
                    <button
                      key={index}
                      onClick={() => handleTaskClick(index)}
                      disabled={verifyingTaskIndex !== null || task.completed}
                      className={`w-full text-center font-semibold py-3 px-5 rounded-md transition-all duration-300 flex items-center justify-center
                        ${
                          task.completed
                            ? "bg-green-600 text-white cursor-default"
                            : verifyingTaskIndex === index
                            ? "bg-yellow-500/50 text-white cursor-wait"
                            : "bg-gray-700 hover:bg-gray-600 text-white"
                        }`}
                    >
                      {verifyingTaskIndex === index ? (
                        <>
                          {" "}
                          <Loader2 className="animate-spin mr-2" />{" "}
                          Memverifikasi...{" "}
                        </>
                      ) : task.completed ? (
                        <>
                          {" "}
                          <CheckCircle className="mr-2" /> {task.name} Selesai{" "}
                        </>
                      ) : (
                        task.name
                      )}
                    </button>
                  ))}
                </div>

                {allTasksCompleted ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-md animate-bounce"
                  >
                    KLAIM SEKARANG!
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-full block text-center bg-gray-600 text-gray-400 font-bold py-3 px-8 rounded-md cursor-not-allowed"
                  >
                    Selesaikan semua tugas untuk klaim
                  </button>
                )}
              </section>
            )}
          </>
        )}
      </main>

      <footer className="bg-dark text-gray-500 text-sm text-center py-6 select-none">
        <p>Copyright 2025</p>
      </footer>
    </div>
  );
}

export default App;
