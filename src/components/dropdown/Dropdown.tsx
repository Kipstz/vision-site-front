import { useState } from 'react'
import { Link } from 'react-router-dom';

// ${isVisible ? '--visible' : ''}
const Dropdown = ({
  items,
  title,
}: {
  items: { href: string; label: string }[]
  title: string
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [timeout, setTimeoutValue] = useState<any>(null)

  const handleClicked = () => {
    setIsVisible((preV) => !preV)
  }

  const handleToggle = () => {
    if (!isVisible) return
    const t = setTimeout(() => {
      setIsVisible(false)
    }, 1000)

    setTimeoutValue(t)
  }

  const handleRemoveTimeout = () => {
    if (!isVisible) return
    timeout && clearTimeout(timeout)
  }

  return (
    <div
      onMouseOver={handleRemoveTimeout}
      onMouseLeave={handleToggle}
      className={`dropdown__wrapper ${isVisible ? '--visible' : ''}`}
    >
      <div onClick={handleClicked} className="dropdown__text">
        <p>{title}</p>
        <svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 1L7 7L1 1"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className={`dropdown__content`}>
        {items.map((_item, index) => (
          <Link key={'dropdown' + index} to={_item.href} className="dropdown__item">
            {_item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

export { Dropdown }
