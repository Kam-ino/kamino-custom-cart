import '@shopify/ui-extensions/preact';
import {render} from 'preact';
import {useEffect, useMemo, useState} from 'preact/hooks';

export default async () => {
  render(<Extension />, document.body);
};

function Extension() {
  // Pull initial values
  const [bannerText, setBannerText] = useState(
    shopify.settings.value.banner_text ||
      "⚠️ Limited stock due to high demand. Your cart is reserved for"
  );
  const [minutes, setMinutes] = useState(Number(shopify.settings.value.minutes) || 5);

  // ✅ Make it reactive: detect changes from the editor and update state
  useEffect(() => {
    let lastBanner = shopify.settings.value.banner_text;
    let lastMinutes = shopify.settings.value.minutes;

    const id = setInterval(() => {
      const nextBanner = shopify.settings.value.banner_text;
      const nextMinutes = shopify.settings.value.minutes;

      if (nextBanner !== lastBanner) {
        lastBanner = nextBanner;
        setBannerText(
          nextBanner ||
            "⚠️ Limited stock due to high demand. Your cart is reserved for"
        );
      }

      if (nextMinutes !== lastMinutes) {
        lastMinutes = nextMinutes;
        const n = Number(nextMinutes);
        setMinutes(Number.isFinite(n) && n > 0 ? n : 5);
      }
    }, 200);

    return () => clearInterval(id);
  }, []);

  return (
    <CountdownTimer
      initialTime={minutes * 60}
      text={bannerText}
      onExpire={() => console.log('Countdown expired!')}
    />
  );
}

function CountdownTimer({initialTime, onExpire, text}) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  // ✅ Reset countdown if minutes changes
  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) onExpire?.();
  }, [timeLeft, onExpire]);

  const formatMMSS = (secondsTotal) => {
    const mm = Math.floor(secondsTotal / 60);
    const ss = secondsTotal % 60;
    return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
  };


  const heading =
    typeof shopify.settings.value.banner_heading === 'string'
      ? shopify.settings.value.banner_heading.trim()
      : '🔥VALENTINE’S SALE ';
  
  return (
    <s-banner heading={heading} tone="critical">
      <s-text>
        {text}: {formatMMSS(timeLeft)}
      </s-text>
    </s-banner>
  );
}