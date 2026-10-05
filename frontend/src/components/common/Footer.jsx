import { Link } from "react-router-dom"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"

function Footer() {
  return (
    <footer className="cn-footer">
      <div className="cn-footer-main">
        <div className="cn-footer-brand">
          <Link className="cn-brand" to="/">
            <span className="cn-brand-mark">&lt;/&gt;</span><span>Code<span>Nest</span></span>
          </Link>
          <p>A focused learning workspace for developers who want to learn, build, and ship.</p>
          <div className="cn-socials">
            <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="https://twitter.com/" target="_blank" rel="noreferrer" aria-label="Twitter"><FaTwitter /></a>
          </div>
        </div>
        <div className="cn-footer-col"><h4>Platform</h4><Link to="/catalog/all">Courses</Link><Link to="/about">About</Link><Link to="/contact">Contact</Link></div>
        <div className="cn-footer-col"><h4>Account</h4><Link to="/login">Log in</Link><Link to="/signup">Create account</Link></div>
      </div>
      <div className="cn-footer-bottom"><span>© {new Date().getFullYear()} CodeNest. Built for practical learning.</span><span>Learn · Build · Ship</span></div>
    </footer>
  )
}
export default Footer
