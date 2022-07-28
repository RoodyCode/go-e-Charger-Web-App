import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBattery, faPlug, faCogs } from '@fortawesome/free-solid-svg-icons'

const Nav = ({ tab, setTab }) => {
  const navItems = [
    { name: 'Laden', id: 'charge', icon: faBattery },
    { name: 'Strom', id: 'energy', icon: faPlug },
    { name: 'System', id: 'settings', icon: faCogs }
  ]
  return (
    <nav>
      {navItems.map(item => (
        <div
          key={item.id}
          onClick={() => setTab(item.id)}
          className={tab == item.id ? `nav-active` : ''}
        >
          <FontAwesomeIcon icon={item.icon} />
          <span>{item.name}</span>
        </div>
      ))}
    </nav>
  )
}

export default Nav
