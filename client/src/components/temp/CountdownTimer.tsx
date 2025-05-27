import React, { useState, useEffect } from "react";

interface CountDownTimerProps {
  timer: number; // in seconds
}

const CountDownTimer = ({ timer }: CountDownTimerProps) => {
  return <div>{timer}</div>;
};

export default CountDownTimer;
