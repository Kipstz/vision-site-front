import { Link } from "react-router-dom"

const Logo = ({
  width = 75,
  height = 75,
  href,
}: {
  href?: string
  height?: number
  width?: number
}) => {
  if (href) {
    return (
      <div className="__logo">
        <Link to={href}>
          <img
            className="--link"
            alt="logo"
            src="/assets/logo.svg"
            width={width}
            height={height}
          />
        </Link>
      </div>
    )
  }

  return (
    <div className="__logo">
      <img
        className="--link"
        alt="logo"
        src="/assets/logo.svg"
        width={width}
        height={height}
      />
    </div>
  )
}

export default Logo
