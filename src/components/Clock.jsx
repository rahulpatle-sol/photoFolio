// components/Clock.jsx
import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="text-4xl font-light tracking-widest">
      {time.toLocaleTimeString()}
    </div>
  );
}
