"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import "./page.css";

export default function Home() {
  const images = [
    { src: "/breakavo.jpeg", alt: "Avocado Breakfast" },
    { src: "/turkeggs.jpg", alt: "Turkish Eggs" },
    { src: "/frenchN.jpeg", alt: "French Breakfast" },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showTopBar, setShowTopBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Image slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Scroll detection for top bar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // scrolling down → hide
        setShowTopBar(false);
      } else {
        // scrolling up → show and stay
        setShowTopBar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <main className="container">
      {/* Top bar */}
      <header className={`topBar ${showTopBar ? "visible" : "hidden"}`}>
        <div className="logo">Baity Corner</div>
      </header>

      {/* Hero Section */}
      <section className="imageWrapper">
        {images.map((img, index) => (
          <Image
            key={index}
            src={img.src}
            alt={img.alt}
            fill
            priority
            quality={100}
            sizes="100vw"
            className={`image ${index === currentIndex ? "active" : ""}`}
          />
        ))}

        <div className="overlay"></div>
        <div className="overlayText">
          <h1>Mornin’ Mood</h1>
        </div>
      </section>

      {/* Scrollable Section */}
      <section className="contentSection">
        <h2>About This Breakfast</h2>
        <p>
          This classic English breakfast features eggs, bacon, sausage, toast,
          baked beans, and more — the perfect start to your day!
        </p>

        <h2>More Delicious Dishes</h2>
        <p>
          Explore our curated menu full of delightful morning favorites, freshly
          brewed coffee, and homemade pastries. Scroll down for more
          mouth-watering options.
        </p>
      </section>
    </main>
  );
}
