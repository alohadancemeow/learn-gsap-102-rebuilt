import React, { useEffect, useState } from "react";
import { Route } from 'react-router-dom'
import gsap from "gsap";
import "./styles/App.scss";

// components
import Header from "./components/Header";
import Navigation from "./components/Navigation";

// pages
import Home from "./pages/Home";
import CaseStudy from './pages/CaseStudy'
import Approach from './pages/Approach'
import About from './pages/About'
import Services from './pages/Services'

// routes
const routes = [
  { path: '/', name: 'Home', Component: Home },
  { path: '/case-study', name: 'Case Study', Component: CaseStudy },
  { path: '/approach', name: 'Approach', Component: Approach },
  { path: '/services', name: 'Services', Component: Services },
  { path: '/about-us', name: 'About Us', Component: About },
]

function debounce(fn, ms) {
  let timer;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

function App() {

  // # Display body
  gsap.to('body', 0, {
    css: { visibility: 'visible' }
  })

  // # State
  const [demensions, setDemensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  })

  useEffect(() => {

    // vh
    let vh = demensions.height * .01
    document.documentElement.style.setProperty('--vh', `${vh}px`)

    // resize
    const debouncedHandleResize = debounce(function handleResize() {
      setDemensions({
        ...demensions,
        height: window.innerHeight,
        width: window.innerWidth
      })
    }, 1000)

    window.addEventListener('resize', debouncedHandleResize)

    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }

  }, [])

  return (
    <>
      <Header demensions={demensions} />
      <div className="App">
        {
          routes.map(({ path, Component }) => (
            <Route
              key={path}
              exact
              path={path}
            >
              <Component demensions={demensions} />
            </Route>
          ))
        }
      </div>
      <Navigation />
    </>
  );
}

export default App;
