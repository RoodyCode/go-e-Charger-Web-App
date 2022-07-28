import { ip } from '../config'

const Settings = ({ data }) => {
  const reboot = async () => {
    const res = await fetch(`${ip}/api/set?rst=true`)
  }
  return (
    <>
      <div className="btn-group-gap">
        <button onClick={() => reboot()}>System neustarten</button>
        <button>IP Reset</button>
      </div>
    </>
  )
}

export default Settings
