import { useState } from 'react'
import './AdminButton.css'
import { HiOutlineCog } from 'react-icons/hi'

export default function AdminButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="admin-button-container">
      <a
        href="/admin/login"
        className="admin-button"
        title="Aller à l'administration"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <HiOutlineCog size={20} />
      </a>
      {isHovered && <div className="admin-tooltip">Administration</div>}
    </div>
  )
}
