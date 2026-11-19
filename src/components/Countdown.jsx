import { useEffect, useState } from "react";
import { getCountdown } from "../lib/countdown";

const pad = value => String(value).padStart(2, "0");
const units = [["days", "Ngày"], ["hours", "Giờ"], ["minutes", "Phút"], ["seconds", "Giây"]];

export default function Countdown({ startTime, time, date }) {
  const [remaining, setRemaining] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const update = () => setRemaining(getCountdown(startTime));
    update();
    const interval = window.setInterval(update, 1000);
    document.addEventListener("visibilitychange", update);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", update);
    };
  }, [startTime]);

  const started = remaining && remaining.started;
  const clock = remaining ? `${pad(remaining.hours)}:${pad(remaining.minutes)}:${pad(remaining.seconds)}` : "--:--:--";

  return (
    <div className={`countdown${expanded ? " countdown-expanded" : ""}${started ? " countdown-started" : ""}`}>
      <button className="countdown-toggle" type="button" onClick={() => setExpanded(value => !value)} aria-expanded={expanded} aria-controls="countdown-details" aria-label={expanded ? "Thu gọn đếm ngược đến Đại tiệc Khai Hoa" : "Xem đếm ngược đến Đại tiệc Khai Hoa"}>
        <span className="countdown-icon" aria-hidden="true">
          <svg viewBox="0 0 28 28" fill="none"><circle className="clock-track" cx="14" cy="14" r="11" /><circle className="clock-progress" cx="14" cy="14" r="11" pathLength="60" strokeDasharray={`${remaining ? remaining.seconds : 60} 60`} /><path d="M14 8v6l4 2" /></svg>
        </span>
        <span className="countdown-button-label">{started ? "Đã đến giờ Khai Hoa" : "Đếm ngược"}</span>
        {!started && <span className="countdown-preview" aria-hidden="true">{remaining && remaining.days > 0 && <span>{remaining.days} ngày · </span>}<span>{clock}</span></span>}
        <svg className="countdown-chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
      </button>
      <div className="countdown-details" id="countdown-details" hidden={!expanded}>
        <p className="countdown-caption">{started ? "Lên đồ, mình cùng nhập tiệc!" : "Một cuộc hẹn đáng mong chờ"}</p>
        <div className="countdown-units" role="timer" aria-label="Thời gian còn lại đến giờ khai tiệc" aria-live="off">
          {units.map(([key, label]) => <div className={`countdown-unit countdown-${key}`} key={key}><span className="countdown-number" key={key === "seconds" && remaining ? remaining.seconds : key}>{remaining ? pad(remaining[key]) : "--"}</span><span className="countdown-unit-label">{label}</span></div>)}
        </div>
        <p className="countdown-footnote">Giờ nâng ly · {time} · {date}</p>
      </div>
    </div>
  );
}

