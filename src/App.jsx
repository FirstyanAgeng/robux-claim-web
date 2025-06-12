import React, { useState } from "react";
import { Menu } from "lucide-react";

// Komponen Ikon Robux sederhana menggunakan SVG
const RobuxIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2.5L4.5 6.25V13.75L12 17.5L19.5 13.75V6.25L12 2.5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 11.5L4.5 7.75M12 11.5V17.5M12 11.5L19.5 7.75M12 2.5V11.5L4.5 6.25"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function App() {
  const [username, setUsername] = useState("");
  // State baru untuk mengontrol tampilan halaman
  const [usernameSubmitted, setUsernameSubmitted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      console.log("Username submitted:", username);
      // Setelah submit, ubah state untuk pindah ke halaman berikutnya
      setUsernameSubmitted(true);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Data untuk pilihan Robux
  const robuxOptions = [
    { price: "$0.00", amount: 500 },
    { price: "$0.00", amount: 10000 },
    { price: "$0.00", amount: 50000 },
    { price: "$0.00", amount: 100000 },
  ];

  return (
    <div className="min-h-screen bg-dark flex flex-col text-white">
      {/* Header (tidak berubah) */}
      <header className="bg-dark-lighter sticky top-0 z-50 border-b border-gray-700">
        <div className="flex justify-between items-center px-4 h-14 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden w-11 h-11 flex items-center justify-center hover:bg-gray-700 rounded-lg"
              onClick={toggleMobileMenu}
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

      {/* Main Content - Tampilan berubah berdasarkan state */}
      <main className="flex-1 w-full py-6 flex flex-col items-center gap-6 px-4">
        {!usernameSubmitted ? (
          // HALAMAN 1: FORM USERNAME
          <>
            <section className="bg-dark-lighter p-8 rounded-xl w-full max-w-4xl text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                Enter Your Username
              </h1>
              <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Please provide your username to continue to the next step.
              </p>
            </section>
            <section className="p-6 w-full max-w-2xl">
              <div className="bg-dark-lighter p-6 rounded-xl w-full">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <label
                    htmlFor="username"
                    className="text-xl font-bold flex items-center gap-2"
                  >
                    Roblox username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username..."
                    className="w-full p-3 text-base rounded-lg border-none outline-none text-dark bg-gray-200 focus:ring-4 focus:ring-primary/50"
                    required
                    autoComplete="username"
                  />
                  <button
                    type="submit"
                    className="w-fit bg-primary text-white py-3 px-7 font-bold rounded-lg hover:bg-primary-hover focus:ring-4 focus:ring-primary/30"
                  >
                    Next
                  </button>
                </form>
              </div>
            </section>
          </>
        ) : (
          // HALAMAN 2: PILIHAN ROBUX
          <section className="bg-dark-lighter p-6 md:p-8 rounded-xl w-full max-w-4xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Get Robux
              </h1>
              <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Robux allows you to purchase upgrades for your avatar or buy
                special abilities in experiences.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {robuxOptions.map((option, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-dark p-4 rounded-lg border-t border-gray-700"
                >
                  <span className="text-lg font-semibold text-gray-300">
                    {option.price}
                  </span>
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-5 rounded-md flex items-center gap-2 transition-colors">
                    <RobuxIcon />
                    {/* Format angka dengan pemisah ribuan */}
                    {option.amount.toLocaleString("en-US")}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer (tidak berubah) */}
      <footer className="bg-dark text-gray-500 text-sm text-center py-6 select-none">
        <p>Copyright 2025</p>
      </footer>
    </div>
  );
}

export default App;
