import React, { useState, useEffect } from "react";



/* 
TODO: 
Waiting for host to start header
Add player's monster
Background forestt image

Summary screen
- Exit lobby btn on top of summary screen

*/

interface WaitingGameStartScreenProps {
    battleWon: number;
    mostDamageDealt: number;
    numAbilityUsed: number;
    numCriticalHits: number;
    numSuccessfulDefends: number;
}

const WaitingGameStartScreen: React.FC<WaitingGameStartScreenProps> = ({
    battleWon,
    mostDamageDealt,
    numAbilityUsed,
    numCriticalHits,
    numSuccessfulDefends,
  }) => {
    return (
        <div
          style={{
            backgroundImage: "url('/path-to-forest-image.jpg')",
            backgroundSize: "cover",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            textAlign: "center",
          }}
        >
          <h1>Waiting for Host to Start</h1>
          <div style={{ margin: "20px 0" }}>
            <h2>Your Monster</h2>
            {/* Replace with actual monster image */}
            <img
              src="/path-to-monster-image.jpg"
              alt="Player's Monster"
              style={{ width: "200px", height: "200px" }}
            />
          </div>
          <div style={{ marginTop: "20px", padding: "10px", background: "rgba(0, 0, 0, 0.5)", borderRadius: "10px" }}>
            <h2>Summary</h2>
            <p>Battle Won: {battleWon}</p>
            <p>Most Damage Dealt: {mostDamageDealt}</p>
            <p>Abilities Used: {numAbilityUsed}</p>
            <p>Critical Hits: {numCriticalHits}</p>
            <p>Successful Defends: {numSuccessfulDefends}</p>
          </div>
          <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#ff4d4d",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => {
          // Add exit lobby logic here
          console.log("Exit lobby clicked");
        }}
      >
        Exit Lobby
      </button>
    </div>
  );
};

export default WaitingGameStartScreen;