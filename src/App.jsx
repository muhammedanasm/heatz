import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Swiper, SwiperSlide } from "swiper/react";
import earbudVideo from "./assets/video/earbud.mp4";
import bannerVideo from "./assets/video/banner.mp4";

import { Autoplay, Navigation, Parallax, EffectCreative } from "swiper/modules";
import {
  FiSearch,
  FiShoppingBag,
  FiMenu,
  FiArrowRight,
  FiArrowLeft,
  FiVolume2,
  FiBluetooth,
  FiCpu,
  FiBatteryCharging,
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
  FiActivity,
  FiWifi,
  FiAperture,
} from "react-icons/fi";

// Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";

gsap.registerPlugin(ScrollTrigger);

/* --- 1. GLOBAL STYLES --- */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,400;0,600;0,800;1,800&family=Manrope:wght@300;400;500;600&display=swap');

    :root {
      --z-cyan: #00f2ff;
      --z-blue: #0055ff;
      --z-black: #050505;
    }

    body {
      background-color: var(--z-black);
      color: white;
      font-family: 'Manrope', sans-serif;
      overflow-x: hidden;
      margin: 0;
    }

    .font-condensed { font-family: 'Barlow Condensed', sans-serif; }
    
    /* Vimeo Background Hack */
    .vimeo-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      overflow: hidden;
      z-index: 0;
    }
    .vimeo-wrapper iframe {
      width: 100vw;
      height: 56.25vw;
      min-height: 100vh;
      min-width: 177.77vh;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #000; }
    ::-webkit-scrollbar-thumb { background: #1a1a1a; }
    ::-webkit-scrollbar-thumb:hover { background: var(--z-cyan); }
    
    /* Marquee Animation */
    .animate-marquee { animation: marquee 20s linear infinite; } 
    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  `}</style>
);

/* --- 2. LOADER --- */
const Loader = ({ onComplete }) => {
  const container = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(container.current, { display: "none" });
          onComplete(true);
        },
      });
      tl.to(".loader-bar", {
        height: "0%",
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.inOut",
        delay: 1,
      });
    }, container);
    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={container}
      className="fixed inset-0 z-[9999] flex h-screen w-full pointer-events-none"
    >
      <div className="loader-bar w-1/4 h-full bg-[#00f2ff] border-r border-black/20"></div>
      <div className="loader-bar w-1/4 h-full bg-[#00c8ff] border-r border-black/20"></div>
      <div className="loader-bar w-1/4 h-full bg-[#0095ff] border-r border-black/20"></div>
      <div className="loader-bar w-1/4 h-full bg-[#0055ff]"></div>
    </div>
  );
};

/* --- 3. NAVBAR --- */
const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 px-6 md:px-12 py-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm transition-all">
    <div className="flex items-center gap-2 group cursor-pointer">
      <span className="text-4xl font-condensed font-black italic tracking-tighter text-white">
        ZEDX<span className="text-[#00f2ff]">.</span>
      </span>
    </div>
    <div className="hidden lg:flex gap-10 font-condensed text-lg font-bold uppercase tracking-wider text-gray-300">
      {["Series X", "Technology", "Studio", "Support"].map((item) => (
        <a
          key={item}
          href="#"
          className="hover:text-[#00f2ff] transition-colors"
        >
          {item}
        </a>
      ))}
    </div>
    <div className="flex items-center gap-6 text-white text-xl">
      <FiSearch className="hover:text-[#00f2ff] cursor-pointer" />
      <FiShoppingBag className="hover:text-[#00f2ff] cursor-pointer" />
      <FiMenu className="lg:hidden text-2xl" />
    </div>
  </nav>
);

/* --- 4. HERO SECTION --- */
const Hero = () => {
  const container = useRef(null);

  useLayoutEffect(() => {
    gsap.fromTo(
      ".hero-content",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, delay: 1.8, ease: "power4.out" }
    );
  }, []);

  return (
    <header
      ref={container}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* <div className="vimeo-wrapper">
        <iframe
          src="https://player.vimeo.com/video/1055106914?background=1&autoplay=1&loop=1&byline=0&title=0"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
          title="ZEDX Hero"
        ></iframe>
      </div> */}
      <div className="vimeo-wrapper">
        <video
          src={bannerVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>

      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-20 max-w-[1600px] mx-auto hero-content">
        <div className="inline-flex items-center gap-2 border border-[#00f2ff]/30 bg-black/40 backdrop-blur-md rounded-full px-4 py-1 w-fit mb-6">
          <span className="w-2 h-2 bg-[#00f2ff] rounded-full animate-pulse"></span>
          <span className="text-[#00f2ff] font-condensed uppercase tracking-widest text-sm font-bold">
            New Release
          </span>
        </div>
        <h1 className="text-7xl md:text-[130px] leading-[0.85] font-condensed font-black uppercase text-white italic">
          Silence <br /> The{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] to-[#0055ff]">
            Noise
          </span>
        </h1>
        <p className="mt-8 text-gray-300 max-w-md text-lg font-medium border-l-2 border-[#00f2ff] pl-6">
          Experience the Z-1 Earbuds. Featuring adaptive ANC and 50mm dynamic
          drivers.
        </p>
        <div className="mt-10 flex gap-6">
          <button className="bg-[#00f2ff] text-black px-10 py-4 font-condensed font-black uppercase tracking-widest hover:bg-white transition-colors skew-x-[-10deg]">
            <span className="block skew-x-[10deg]">Pre-Order Now</span>
          </button>
        </div>
      </div>
    </header>
  );
};

/* --- 5. HORIZONTAL SCROLL SECTION --- */
const HorizontalScroll = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".h-card");
      gsap.to(cards, {
        xPercent: -100 * (cards.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (cards.length - 1),
          end: () => "+=" + triggerRef.current.offsetWidth,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const techSpecs = [
    {
      title: "Z-1 Neural Chip",
      desc: "Proprietary silicon for ultra-low latency processing.",
      icon: <FiCpu />,
      img: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=1000", // Circuit board
    },
    {
      title: "Infinite Power",
      desc: "72h continuous playback with active cooling.",
      icon: <FiBatteryCharging />,
      img: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=1000", // Tech abstract
    },
    {
      title: "360° Spatial",
      desc: "Head-tracking soundstage for total immersion.",
      icon: <FiVolume2 />,
      img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=1000", // Studio gear
    },
    {
      title: "HyperLink 5.4",
      desc: "Lossless wireless transmission protocol.",
      icon: <FiBluetooth />,
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000", // Digital connection
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[#050505] border-t border-white/5"
    >
      <div
        ref={triggerRef}
        className="h-screen w-[400vw] flex flex-row relative"
      >
        <div className="h-card w-screen h-full flex flex-col justify-center px-10 md:px-32 bg-gradient-to-br from-[#0a0a0a] to-black border-r border-white/5">
          <h4 className="text-[#00f2ff] font-condensed uppercase tracking-widest text-xl mb-4">
            Engineering
          </h4>
          <h2 className="text-6xl md:text-9xl font-condensed font-black text-white uppercase italic mb-8">
            Inside The <br /> Architecture
          </h2>
          <div className="flex items-center gap-4 text-gray-500 animate-bounce">
            <FiArrowRight className="text-2xl" />{" "}
            <span className="uppercase tracking-widest text-sm">
              Scroll to Explore
            </span>
          </div>
        </div>
        {techSpecs.map((spec, i) => (
          <div
            key={i}
            className="h-card w-screen h-full flex items-center justify-center p-10 bg-[#050505] border-r border-white/5 relative"
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <span className="text-[40vw] font-condensed font-black text-white">
                {i + 1}
              </span>
            </div>
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">
              <div className="order-2 md:order-1">
                <div className="w-20 h-20 bg-[#00f2ff] rounded-full flex items-center justify-center text-black text-4xl mb-8 shadow-[0_0_30px_rgba(0,242,255,0.4)]">
                  {spec.icon}
                </div>
                <h3 className="text-6xl font-condensed font-black uppercase text-white mb-6">
                  {spec.title}
                </h3>
                <p className="text-gray-400 text-xl leading-relaxed">
                  {spec.desc}
                </p>
              </div>
              <div className="order-1 md:order-2 h-[500px] bg-[#111] rounded-2xl overflow-hidden border border-white/10 relative group">
                <img
                  src={spec.img}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                  alt={spec.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* --- 6. CINEMATIC SLIDER --- */
const CinematicSlider = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    gsap.to(containerRef.current, {
      scale: 1.05,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  const slides = [
    {
      type: "video",
      src: earbudVideo,
      text: "Urban Rhythm",
      sub: "Lose yourself in the city",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=1000",
      text: "Studio Quality",
      sub: "Precision in every note",
    },
    {
      type: "video",
      src: earbudVideo,
      text: "Game Mode",
      sub: "Zero latency reaction",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?auto=format&fit=crop&q=80&w=1600",
      text: "Neon Dreams",
      sub: "Light up your setup",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="py-24 bg-black relative overflow-hidden"
    >
      <div className="px-6 md:px-20 mb-12 flex justify-between items-end relative z-10">
        <h2 className="text-6xl md:text-8xl font-condensed font-black text-white uppercase italic">
          Lifestyle{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] to-[#0055ff]">
            Motion
          </span>
        </h2>
        <div className="hidden md:block w-32 h-1 bg-[#00f2ff]"></div>
      </div>

      <Swiper
        modules={[Autoplay, Parallax, EffectCreative]}
        spaceBetween={20}
        slidesPerView={1.1}
        centeredSlides={true}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        speed={1200}
        parallax={true}
        effect={"creative"}
        creativeEffect={{
          prev: { shadow: true, translate: ["-20%", 0, -100] },
          next: { translate: ["100%", 0, 0] },
        }}
        className="w-full h-[60vh] md:h-[80vh]"
      >
        {slides.map((slide, i) => (
          <SwiperSlide
            key={i}
            className="relative overflow-hidden group bg-[#050505] rounded-xl border border-white/5"
          >
            <div
              className="absolute inset-0 w-full h-full overflow-hidden"
              data-swiper-parallax="50%"
            >
              {slide.type === "video" ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[2s]"
                >
                  <source src={slide.src} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={slide.src}
                  alt="Lifestyle"
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[2s]"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80"></div>
            </div>

            <div className="absolute bottom-10 left-6 md:left-20 max-w-2xl">
              <p className="text-[#00f2ff] font-condensed uppercase tracking-[0.3em] mb-2 font-bold translate-y-10 opacity-0 group-[.swiper-slide-active]:translate-y-0 group-[.swiper-slide-active]:opacity-100 transition-all duration-700 delay-300">
                {slide.sub}
              </p>
              <h3 className="text-5xl md:text-8xl font-condensed font-black uppercase text-white leading-none translate-y-20 opacity-0 group-[.swiper-slide-active]:translate-y-0 group-[.swiper-slide-active]:opacity-100 transition-all duration-700 delay-100">
                {slide.text}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

/* --- 7. NEW ADVANCED PARALLAX SECTION: EXPLODED VISION --- */
const ExplodedVision = () => {
  const container = useRef(null);
  const textBg = useRef(null);
  const mainImg = useRef(null);
  const card1 = useRef(null);
  const card2 = useRef(null);
  const card3 = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
        },
      });

      // Background Text moves slightly
      tl.to(textBg.current, { x: -200, opacity: 0.5 }, 0);

      // Main image scales down and rotates slightly
      tl.to(mainImg.current, { scale: 0.8, rotation: 5, y: 50 }, 0);

      // Floating cards fly in from different directions
      tl.fromTo(card1.current, { y: 800, x: -200 }, { y: -100, x: 0 }, 0);
      tl.fromTo(card2.current, { y: 900, x: 200 }, { y: -50, x: 0 }, 0.1);
      tl.fromTo(card3.current, { y: 1000 }, { y: 100 }, 0.2);
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative w-full h-screen overflow-hidden bg-[#020202] flex items-center justify-center"
    >
      {/* Background Graphic */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 select-none pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1800"
          className="w-full h-full object-cover grayscale opacity-30"
        />
      </div>

      {/* Massive Background Text */}
      <div
        ref={textBg}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
      >
        <h1 className="text-[20vw] text-white/5 font-condensed font-black whitespace-nowrap leading-none">
          DECONSTRUCTED
        </h1>
      </div>

      {/* Main Center Image */}
      <div
        ref={mainImg}
        className="relative z-10 w-[300px] md:w-[500px] aspect-square"
      >
        <div className="absolute inset-0 bg-[#00f2ff]/20 blur-[100px] rounded-full"></div>
        <img
          src="https://images.unsplash.com/photo-1629429408209-1f912961dbd8?auto=format&fit=crop&q=80&w=800"
          alt="Exploded View"
          className="w-full h-full object-contain relative drop-shadow-[0_0_50px_rgba(0,242,255,0.3)]"
        />
      </div>

      {/* Floating Specs Cards */}
      <div className="absolute inset-0 z-20 pointer-events-none w-full max-w-[1400px] mx-auto">
        {/* Card 1: Top Left */}
        <div
          ref={card1}
          className="absolute top-[20%] left-[10%] w-64 bg-black/80 backdrop-blur-md border border-[#00f2ff]/30 p-6 rounded-lg"
        >
          <FiAperture className="text-[#00f2ff] text-3xl mb-4" />
          <h3 className="text-white font-condensed font-bold text-2xl uppercase">
            Hybrid Drivers
          </h3>
          <p className="text-gray-400 text-sm mt-2">
            10mm Beryllium coated dynamic drivers for deep bass.
          </p>
        </div>

        {/* Card 2: Top Right */}
        <div
          ref={card2}
          className="absolute top-[15%] right-[10%] w-64 bg-black/80 backdrop-blur-md border border-[#00f2ff]/30 p-6 rounded-lg text-right"
        >
          <div className="flex justify-end mb-4">
            <FiWifi className="text-[#00f2ff] text-3xl" />
          </div>
          <h3 className="text-white font-condensed font-bold text-2xl uppercase">
            Low Latency
          </h3>
          <p className="text-gray-400 text-sm mt-2">
            15ms response time using HyperLink™ proprietary band.
          </p>
        </div>

        {/* Card 3: Bottom Center */}
        <div
          ref={card3}
          className="absolute bottom-[10%] left-[50%] -translate-x-1/2 w-80 bg-black/80 backdrop-blur-md border border-[#00f2ff]/30 p-6 rounded-lg flex gap-4 items-center"
        >
          <FiActivity className="text-[#00f2ff] text-4xl" />
          <div>
            <h3 className="text-white font-condensed font-bold text-2xl uppercase">
              Active Cancellation
            </h3>
            <p className="text-gray-400 text-sm">-45dB noise reduction.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* --- 8. ORIGINAL PARALLAX SECTION (Refined) --- */
const DeepParallax = () => {
  const container = useRef(null);
  const bgRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        y: 100,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative w-full h-[80vh] overflow-hidden bg-black flex items-center justify-center border-t border-white/5"
    >
      <div ref={bgRef} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <img
          src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=2000"
          alt="Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] px-6 text-center">
        <h4 className="text-[#00f2ff] font-condensed uppercase tracking-widest text-xl mb-4">
          The Depth of Sound
        </h4>
        <h2 className="text-6xl md:text-[100px] leading-[0.9] font-condensed font-black uppercase text-white italic">
          Immersive <br /> Reality
        </h2>
        <p className="text-gray-400 mt-8 max-w-lg mx-auto text-lg">
          Our spatial audio engine maps sound in 3D space, placing you in the
          center of the action. Hear the unseen.
        </p>
      </div>
    </section>
  );
};

/* --- 9. PARALLAX GRID --- */
const ParallaxGrid = () => {
  return (
    <section className="py-20 px-4 md:px-12 bg-[#080808]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-auto">
        <div className="relative h-[600px] overflow-hidden bg-[#111] group rounded-sm border border-white/5">
          <video
            src={earbudVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
          <div className="absolute bottom-8 left-8">
            <h3 className="text-5xl font-condensed font-black uppercase text-white">
              Vision VR
            </h3>
            <p className="text-[#00f2ff] font-bold mt-2">Ready Player One</p>
          </div>
        </div>
        <div className="grid grid-rows-2 gap-8 h-[600px]">
          <div className="relative overflow-hidden bg-[#111] group rounded-sm border border-white/5">
            <img
              src="https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=1000"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
              alt="Keyboard"
            />
            <div className="absolute bottom-6 left-6 z-10">
              <h3 className="text-3xl font-condensed font-black uppercase text-white">
                Tactile Mech
              </h3>
            </div>
          </div>
          <div className="relative overflow-hidden bg-[#111] group rounded-sm border border-white/5">
            <img
              src="https://images.unsplash.com/photo-1605773527852-c546a8584ea3?auto=format&fit=crop&q=80&w=1000"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
              alt="Mouse"
            />
            <div className="absolute bottom-6 left-6 z-10">
              <h3 className="text-3xl font-condensed font-black uppercase text-white">
                Precision Aim
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* --- 10. PRODUCT CAROUSEL --- */
const ProductCarousel = () => {
  const products = [
    {
      name: "Z-1 Buds",
      price: "$149",
      img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Z-Stream Mic",
      price: "$199",
      img: "https://images.unsplash.com/photo-1590658006821-6d7b4b1e5914?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Z-OverEar",
      price: "$299",
      img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Z-Controller",
      price: "$59",
      img: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Z-Keypad",
      price: "$129",
      img: "https://images.unsplash.com/photo-1587829741301-dc798b91a603?auto=format&fit=crop&q=80&w=600",
    },
  ];

  return (
    <section className="py-24 bg-[#0a0a0a] border-t border-white/5">
      <div className="px-6 md:px-20 mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <h2 className="text-6xl font-condensed font-black uppercase text-white italic">
          The Collection
        </h2>
        <div className="flex gap-4">
          <button className="carousel-prev w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#00f2ff] hover:text-black hover:border-[#00f2ff] transition-all duration-300">
            <FiArrowLeft className="text-xl" />
          </button>
          <button className="carousel-next w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#00f2ff] hover:text-black hover:border-[#00f2ff] transition-all duration-300">
            <FiArrowRight className="text-xl" />
          </button>
        </div>
      </div>

      <div className="px-6 md:px-12">
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            nextEl: ".carousel-next",
            prevEl: ".carousel-prev",
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3.5 },
          }}
        >
          {products.map((p, i) => (
            <SwiperSlide key={i}>
              <div className="bg-black border border-white/10 group cursor-pointer hover:border-[#00f2ff] transition-colors duration-300 rounded-lg overflow-hidden">
                <div className="aspect-square overflow-hidden relative bg-[#050505]">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
                  <button className="absolute bottom-4 right-4 w-10 h-10 bg-[#00f2ff] rounded-full flex items-center justify-center text-black translate-y-10 group-hover:translate-y-0 transition-transform">
                    <FiShoppingBag />
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="text-3xl font-condensed font-bold uppercase text-white">
                    {p.name}
                  </h3>
                  <p className="text-[#00f2ff] font-bold text-xl">{p.price}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

/* --- 11. FOOTER --- */
const Footer = () => (
  <footer className="bg-black pt-24 pb-12 px-6 md:px-20 border-t border-white/10">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
      <div className="md:col-span-1">
        <h1 className="text-6xl font-condensed font-black italic uppercase text-white mb-6">
          ZEDX<span className="text-[#00f2ff]">.</span>
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          Pioneering the future of auditory experiences. We craft precision
          engineered gear for gamers, creators, and audiophiles.
        </p>
        <div className="flex gap-4 mt-6 text-xl text-white">
          <FiTwitter className="hover:text-[#00f2ff] cursor-pointer" />
          <FiInstagram className="hover:text-[#00f2ff] cursor-pointer" />
          <FiYoutube className="hover:text-[#00f2ff] cursor-pointer" />
        </div>
      </div>

      <div>
        <h4 className="text-white font-condensed font-bold uppercase text-xl mb-6 tracking-wide">
          Quick Links
        </h4>
        <ul className="space-y-3 text-gray-500 font-medium text-sm">
          <li className="hover:text-[#00f2ff] cursor-pointer transition-colors">
            Home
          </li>
          <li className="hover:text-[#00f2ff] cursor-pointer transition-colors">
            New Arrivals
          </li>
          <li className="hover:text-[#00f2ff] cursor-pointer transition-colors">
            Gaming Gear
          </li>
          <li className="hover:text-[#00f2ff] cursor-pointer transition-colors">
            Lifestyle Audio
          </li>
          <li className="hover:text-[#00f2ff] cursor-pointer transition-colors">
            Accessories
          </li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-condensed font-bold uppercase text-xl mb-6 tracking-wide">
          Contact
        </h4>
        <ul className="space-y-4 text-gray-500 font-medium text-sm">
          <li className="flex items-center gap-3">
            <FiMail className="text-[#00f2ff] text-lg" />
            <span>hello@zedx.store</span>
          </li>
          <li className="flex items-center gap-3">
            <FiPhone className="text-[#00f2ff] text-lg" />
            <span>+1 (800) 999-ZEDX</span>
          </li>
          <li className="flex items-start gap-3">
            <FiMapPin className="text-[#00f2ff] text-lg mt-1" />
            <span>
              88 Tech Blvd, Cyber City,
              <br />
              Neo Tokyo, JP
            </span>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-condensed font-bold uppercase text-xl mb-6 tracking-wide">
          Support
        </h4>
        <ul className="space-y-3 text-gray-500 font-medium text-sm">
          <li className="hover:text-[#00f2ff] cursor-pointer transition-colors">
            Order Tracking
          </li>
          <li className="hover:text-[#00f2ff] cursor-pointer transition-colors">
            Warranty Claim
          </li>
          <li className="hover:text-[#00f2ff] cursor-pointer transition-colors">
            Return Policy
          </li>
          <li className="hover:text-[#00f2ff] cursor-pointer transition-colors">
            Downloads & Drivers
          </li>
          <li className="hover:text-[#00f2ff] cursor-pointer transition-colors">
            FAQs
          </li>
        </ul>
      </div>
    </div>

    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-700 text-xs font-bold uppercase tracking-widest">
      <p>© 2025 ZEDX Electronics. All Rights Reserved.</p>
      <div className="flex gap-6 mt-4 md:mt-0">
        <span className="hover:text-white cursor-pointer">Privacy Policy</span>
        <span className="hover:text-white cursor-pointer">
          Terms of Service
        </span>
      </div>
    </div>
  </footer>
);

/* --- MAIN APP --- */
function App() {
  const [loaderDone, setLoaderDone] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="antialiased min-h-screen bg-[#050505]">
      <GlobalStyles />
      <Loader onComplete={setLoaderDone} />

      <main className="w-full">
        <Navbar />
        <Hero />
        <div className="bg-[#00f2ff] py-2 overflow-hidden whitespace-nowrap">
          <div className="flex animate-marquee gap-10">
            {[...Array(10)].map((_, i) => (
              <h2
                key={i}
                className="text-4xl font-condensed font-black uppercase text-black italic"
              >
                Next Gen Audio <span className="text-white mx-4">•</span>
              </h2>
            ))}
          </div>
        </div>
        <HorizontalScroll />
        <CinematicSlider />
        <ExplodedVision /> {/* NEW: Advanced Parallax Section added here */}
        <DeepParallax />
        <ParallaxGrid />
        <ProductCarousel />
        <section className="h-[60vh] flex items-center justify-center bg-[#050505] text-center px-4">
          <h1 className="text-[10vw] leading-[0.8] font-condensed font-black uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-black">
            Define <br /> Your Sound
          </h1>
        </section>
        <Footer />
      </main>
    </div>
  );
}

export default App;
