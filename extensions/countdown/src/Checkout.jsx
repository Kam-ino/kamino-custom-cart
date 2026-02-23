import '@shopify/ui-extensions/preact';
import {render} from "preact";
import {useState, useEffect} from "preact/hooks";

// 1. Export the extension
export default async () => {
  render(<CountdownTimer initialTime={60*5} onExpire={handleExpire} text="🔥VALENTINE'S SALE ⚠️ Limited stock due to high demand Your cart is reserved for"/>, document.body)
};

const handleExpire = () => {
    console.log('Countdown expired!');
  };

function CountdownTimer({ initialTime, onExpire, text }) {
  
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire?.();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [onExpire]);

  const formatMMSS = (secondsTotal) => {
    const mm = Math.floor(secondsTotal / 60);
    const ss = secondsTotal % 60;
    const pad = (n) => String(n).padStart(2, '0');
    return `${pad(mm)}:${pad(ss)}`;
  };

  return (
    <s-banner heading="Countdown Timer" tone="critical">
      <s-text>{text}: {formatMMSS(timeLeft)}</s-text>
    </s-banner>
  );
}