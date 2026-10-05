import { Link } from "react-router-dom"
import { FaArrowRight, FaCode, FaLayerGroup, FaRocket, FaCheckCircle } from "react-icons/fa"
import Footer from "../components/common/Footer"

const pillars = [
  {
    icon: FaCode,
    title: "Learn by building",
    text: "Structured lessons turn concepts into working code instead of passive tutorials.",
  },
  {
    icon: FaLayerGroup,
    title: "Stay organized",
    text: "Keep courses, progress, and learning milestones in one focused workspace.",
  },
  {
    icon: FaRocket,
    title: "Ship with confidence",
    text: "Practice practical skills that map directly to real projects and developer workflows.",
  },
]

function Home() {
  return (
    <div className="codenest-home">
      <section className="hero-shell">
        <div className="hero-grid" />
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> Developer learning, without the noise</div>
          <h1>Learn the skills.<br /><span>Build the proof.</span></h1>
          <p>
            CodeNest is a practical learning platform for developers who want
            structured courses, hands-on practice, and visible progress.
          </p>
          <div className="hero-actions">
            <Link className="cn-btn cn-btn-primary" to="/signup">Start learning <FaArrowRight /></Link>
            <Link className="cn-btn cn-btn-secondary" to="/signup">Explore courses</Link>
          </div>
          <div className="hero-trust">
            <FaCheckCircle /> Project-focused <FaCheckCircle /> Progress tracking <FaCheckCircle /> Instructor-led
          </div>
        </div>

        <div className="hero-terminal" aria-label="CodeNest learning preview">
          <div className="terminal-bar"><span /><span /><span /><b>codenest / workspace</b></div>
          <div className="terminal-body">
            <div className="terminal-line"><i>01</i><span><em>const</em> learner = {`{`}</span></div>
            <div className="terminal-line"><i>02</i><span>&nbsp;&nbsp;goal: <strong>"become job-ready"</strong>,</span></div>
            <div className="terminal-line"><i>03</i><span>&nbsp;&nbsp;mode: <strong>"build-first"</strong>,</span></div>
            <div className="terminal-line"><i>04</i><span>&nbsp;&nbsp;progress: <strong>72</strong>,</span></div>
            <div className="terminal-line"><i>05</i><span>&nbsp;&nbsp;next: <strong>"ship the project"</strong></span></div>
            <div className="terminal-line"><i>06</i><span>{`}`}</span></div>
            <div className="terminal-status"><span /> Workspace synced</div>
          </div>
        </div>
      </section>

      <section className="cn-section">
        <div className="section-intro">
          <span className="section-kicker">WHY CODENEST</span>
          <h2>A better home for serious learning.</h2>
          <p>Less scrolling. More building. Everything you need to turn learning time into demonstrable skills.</p>
        </div>
        <div className="pillar-grid">
          {pillars.map(({ icon: Icon, title, text }) => (
            <article className="pillar-card" key={title}>
              <div className="pillar-icon"><Icon /></div>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="card-arrow">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="build-banner">
        <div>
          <span className="section-kicker">YOUR NEXT MILESTONE</span>
          <h2>Stop collecting tutorials.<br />Start collecting shipped work.</h2>
        </div>
        <Link className="cn-btn cn-btn-primary" to="/signup">Create your workspace <FaArrowRight /></Link>
      </section>
      <Footer />
    </div>
  )
}

export default Home
