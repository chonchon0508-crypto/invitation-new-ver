import { useEffect, useRef, useState } from "react";
import Head from "../src/components/Head";
import Fireworks from "../src/components/Fireworks";
import Flower from "../src/components/Flower";
import event from "../src/config/event";
import invitees from "../src/config/invitees.json";

export default function Invitation({ inviteeId }) {
  const invitee = invitees[inviteeId] || invitees["team-consumer"];
  const [opened, setOpened] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const headingRef = useRef(null);

  useEffect(() => {
    if (!opened) return undefined;
    const timeout = window.setTimeout(() => setRevealed(true), 1050);
    return () => window.clearTimeout(timeout);
  }, [opened]);

  useEffect(() => {
    if (revealed && headingRef.current) headingRef.current.focus({ preventScroll: true });
  }, [revealed]);

  return (
    <>
      <Head title={`${event.name} · ${invitee.name}`} description={`${invitee.salutation} ${invitee.name}. ${event.time}, ${event.weekday}, ${event.date} tại ${event.venue}. Một buổi tối đặc biệt cùng khối Consumer.`} />
      <div className={`invitation-page${opened ? " is-opening" : ""}${revealed ? " is-revealed" : ""}`}>
        <div className="ambient ambient-one" aria-hidden="true" />
        <div className="ambient ambient-two" aria-hidden="true" />
        <div className="orbital orbital-one" aria-hidden="true" />
        <div className="orbital orbital-two" aria-hidden="true" />
        <div className="starlight" aria-hidden="true" />
        <Fireworks opened={opened} />

        <header className="masthead">
          <div className="brand-lockup">
            <Flower className="brand-flower" />
            <div><span className="brand-name">CONSUMER</span><span className="brand-caption">TOGETHER, WE BLOOM</span></div>
          </div>
          <div className="edition"><span>MỘT BUỔI TỐI ĐẶC BIỆT</span><span>20 . 11 . 2026</span></div>
        </header>

        <main className="invitation-main">
          <div className="hero-heading">
            <p className="eyebrow"><span /> MỘT LỜI MỜI, NGÀN NIỀM VUI <span /></p>
            <h1><span className="title-intro">Đại tiệc</span><span className="title-main">Khai hoa<span className="title-spark" aria-hidden="true">✧</span></span></h1>
            <p className="hero-subtitle">Một tối hội ngộ. Cùng nhau rực rỡ.</p>
          </div>

          {!revealed && (
            <div className="envelope-scene">
              <button className={`envelope${opened ? " envelope-open" : ""}`} type="button" onClick={() => setOpened(true)} disabled={opened} aria-label={`Mở thiệp ${invitee.salutation.toLowerCase()} ${invitee.name}`} aria-expanded={opened} aria-controls="invitation-details">
                <span className="envelope-glow" aria-hidden="true" />
                <span className="envelope-back" aria-hidden="true" />
                <span className="envelope-letter">
                  <Flower className="letter-flower" />
                  <span className="letter-salutation">{invitee.salutation}</span>
                  <span className="letter-name">{invitee.name}</span>
                  <span className="letter-rule" />
                  <span className="letter-note">Một lời mời dành riêng cho {invitee.pronoun}.</span>
                </span>
                <span className="envelope-pocket" aria-hidden="true" />
                <span className="envelope-left" aria-hidden="true" />
                <span className="envelope-right" aria-hidden="true" />
                <span className="envelope-bottom" aria-hidden="true" />
                <span className="envelope-flap" aria-hidden="true" />
                <span className="envelope-seal" aria-hidden="true"><Flower /><span>KH</span></span>
                <span className="envelope-inscription" aria-hidden="true">A LITTLE MYSTERY. A LOVELY EVENING.</span>
              </button>
              <p className="open-hint" aria-live="polite"><span className="hint-spark" aria-hidden="true">✧</span>{opened ? "Một buổi tối rực rỡ đang chờ…" : "Chạm vào bao thư, mở một niềm vui"}</p>
              <p className="cover-date">{event.time}<span>·</span>{event.weekday}, {event.date}</p>
            </div>
          )}

          <section id="invitation-details" className={`invitation-details${revealed ? " details-visible" : ""}`} hidden={!revealed} aria-labelledby="guest-heading">
            <div className="glass-card">
              <div className="card-corner corner-tl" aria-hidden="true" /><div className="card-corner corner-br" aria-hidden="true" />
              <div className="personal-note">
                <p className="eyebrow">{invitee.salutation}</p>
                <h2 id="guest-heading" tabIndex={-1} ref={headingRef}>{invitee.name}</h2>
                <p className="invite-copy">{invitee.message}</p>
              </div>
              <div className="event-details">
                <div className="time-detail">
                  <div className="date-tile"><span>20</span><span>11 / 2026</span></div>
                  <div><p className="detail-label">HẸN NHAU LÚC</p><p className="time-value">{event.time}</p><p className="detail-note">{event.weekday}, {event.date}</p></div>
                </div>
                <div className="venue-detail">
                  <p className="detail-label">TẠI QUÁN</p>
                  <h3>{event.venue}</h3>
                  <a className="map-link" href={event.mapUrl} target="_blank" rel="noopener noreferrer" aria-label={`Xem vị trí ${event.venue} trên Google Maps, mở tab mới`}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>Xem vị trí trên Google Maps</a>
                </div>
              </div>
              <div className="gathering-line"><span className="small-star" aria-hidden="true">✧</span><span><strong>{event.guestCount} người</strong> · Một cuộc hẹn của khối Consumer</span><span className="small-star" aria-hidden="true">✧</span></div>
              <div className="dress-code">
                <div className="dress-heading"><span className="detail-label">DRESS CODE</span><span className="dress-caption">Lên đồ thanh lịch, nhập tiệc hết mình.</span></div>
                <ul className="dress-colors" aria-label="Màu trang phục">
                  {event.dressCode.map(color => <li key={color.name}><span className={`color-swatch swatch-${color.id}`} aria-hidden="true" /><span>{color.name}</span></li>)}
                </ul>
              </div>
              <p className="closing-note">Gác lại deadline. Mang theo thần thái.<br /><em>Phần còn lại, mình cùng khai hoa.</em></p>
              <Flower className="card-flower" />
            </div>
            <p className="afterword">Hẹn một tối thật vui, cùng những người thật quý.</p>
          </section>
        </main>

        <footer className="page-footer"><span>KHỐI CONSUMER</span><span className="footer-flower" aria-hidden="true">✧</span><span>25 KHÁCH MỜI · MỘT ĐÊM KHAI HOA</span></footer>
      </div>
    </>
  );
}

Invitation.getInitialProps = ({ query }) => ({
  inviteeId: typeof query.u === "string" && Object.prototype.hasOwnProperty.call(invitees, query.u) ? query.u : "team-consumer"
});
