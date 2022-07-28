import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Box = ({ title, icon, children }) => {
  return (
    <div className="box">
      <div className="box-header">
        <span className="box-icon">
          <FontAwesomeIcon icon={icon} />
        </span>
        <span className="box-title">{title}</span>
      </div>
      <div className="box-content">{children}</div>
    </div>
  )
}

export default Box
