"use client";

import React, { useEffect, useState } from 'react';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';

const Darkmode = () => {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark";
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (theme) {
      localStorage.setItem("theme", theme);
      const element = document.documentElement;
      if (theme === "dark") {
        element.classList.add("dark");
        element.classList.add("dark");
      } else {
        element.classList.remove("light");
        element.classList.remove("dark");
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div className='relative'>
      <IoMdSunny
        onClick={toggleTheme}
        className={`w-12 cursor-pointer absolute right-0 z-10 transition-all duration-300 ${theme === "dark" ? "opacity-0" : "opacity-100"}`}
      />
      <IoMdMoon
        onClick={toggleTheme}
        className={`w-12 cursor-pointer ${theme === "dark" ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
};

export default Darkmode;