import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

function Template({ title, description1, description2, formType }) {
  const { loading } = useSelector((state) => state.auth)
  return (
    <main className="auth-shell">
      <div className="auth-panel">
        <div className="auth-brand"><span className="cn-brand-mark">&lt;/&gt;</span> CodeNest</div>
        <div className="auth-copy">
          <span className="section-kicker">{formType === "signup" ? "CREATE YOUR WORKSPACE" : "WELCOME BACK"}</span>
          <h1>{title}</h1>
          <p>{description1} <strong>{description2}</strong></p>
        </div>
        {loading ? <div className="auth-loading"><div className="spinner" /> <span>Working…</span></div> : formType === "signup" ? <SignupForm /> : <LoginForm />}
        <div className="auth-note"><span /> Secure account access <span /></div>
        <p className="auth-terms">By continuing, you agree to use CodeNest responsibly and keep your account credentials private.</p>
        <Link className="auth-home" to="/">← Back to CodeNest</Link>
      </div>
      <aside className="auth-aside">
        <div className="auth-aside-grid" />
        <div className="auth-code">
          <div className="terminal-bar"><span /><span /><span /><b>~/codenest</b></div>
          <pre>{`$ codenest init\\n\\n✓ workspace ready\\n✓ learning path selected\\n✓ progress tracking enabled\\n\\n> build something real_`}</pre>
        </div>
        <div className="auth-quote">"The fastest way to learn is to make something worth showing."</div>
      </aside>
    </main>
  )
}
export default Template
