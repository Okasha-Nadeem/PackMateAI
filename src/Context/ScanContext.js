// src/Context/ScanContext.js
import React, { createContext, useContext, useState } from "react";

const ScanContext = createContext();

export const ScanProvider = ({ children }) => {
  const [scans, setScans] = useState([]); // All scans
  const [theme, setTheme] = useState("dark"); // dark/light

  // Add a new scan
  const addScan = (scan) => {
    const newScan = {
      ...scan,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setScans([newScan, ...scans]);
  };

  // Toggle dark/light theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Recent scans (latest 3)
  const recentScans = scans.slice(0, 3);

  // Older scans as history
  const historyScans = scans.slice(3);

  return (
    <ScanContext.Provider
      value={{
        scans,
        addScan,
        recentScans,
        historyScans,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ScanContext.Provider>
  );
};

export const useScans = () => useContext(ScanContext);
