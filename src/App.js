// App.js or main entry point
import "./App.css"
import React from 'react';
import { ServicesProvider } from './ServicesContext';
import Services from './Services';

export default function App() {
  return (
    <>
      <h1>Queuing System Simulation</h1>
      <ServicesProvider>
        <Services />
      </ServicesProvider>
    </>
  );
}
