import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropDown"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()
  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    let active = true
    ;(async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        if (active) setSubLinks(res.data?.data || [])
      } catch {
        if (active) setSubLinks([])
      } finally {
        if (active) setLoading(false)
      }
    })()
    return () => { active = false }
  }, [])

  useEffect(() => setMobileOpen(false), [location.pathname])
  const matchRoute = (route) => matchPath({ path: route }, location.pathname)

  return (
    <header className="cn-navbar">
      <div className="cn-nav-inner">
        <Link className="cn-brand" to="/" aria-label="CodeNest home">
          <span className="cn-brand-mark">&lt;/&gt;</span>
          <span>Code<span>Nest</span></span>
        </Link>

        <nav className="cn-nav-links" aria-label="Primary navigation">
          {NavbarLinks.map((link, index) => link.title === "Catalog" ? (
            <div className="cn-nav-dropdown" key={index}>
              <button className={`cn-nav-link ${matchRoute("/catalog/:catalogName") ? "active" : ""}`}>
                {link.title} <BsChevronDown />
              </button>
              <div className="cn-dropdown-menu">
                {loading ? <span className="cn-dropdown-empty">Loading…</span> :
                  subLinks.filter(x => x?.courses?.length > 0).length ? subLinks.filter(x => x?.courses?.length > 0).map((x) => (
                    <Link key={x._id || x.name} to={`/catalog/${x.name.split(" ").join("-").toLowerCase()}`}>
                      {x.name}
                    </Link>
                  )) : <span className="cn-dropdown-empty">No courses available</span>}
              </div>
            </div>
          ) : (
            <Link className={`cn-nav-link ${matchRoute(link.path) ? "active" : ""}`} to={link.path} key={index}>{link.title}</Link>
          ))}
        </nav>

        <div className="cn-nav-actions">
          {user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="cn-cart" aria-label="Shopping cart">
              <AiOutlineShoppingCart />{totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}
          {!token ? (
            <>
              <Link className="cn-nav-login" to="/login">Log in</Link>
              <Link className="cn-nav-signup" to="/signup">Get started</Link>
            </>
          ) : <ProfileDropdown />}
          <button className="cn-mobile-toggle" onClick={() => setMobileOpen(v => !v)} aria-label="Toggle navigation">
            {mobileOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav className="cn-mobile-menu">
          {NavbarLinks.map((link) => <Link key={link.title} to={link.path}>{link.title}</Link>)}
          {!token ? <><Link to="/login">Log in</Link><Link to="/signup">Get started</Link></> : <Link to="/dashboard/my-profile">Dashboard</Link>}
        </nav>
      )}
    </header>
  )
}
export default Navbar
