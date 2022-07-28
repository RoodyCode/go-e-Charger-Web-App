import { ip } from '../config'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faLock, faCheck, faStop } from '@fortawesome/free-solid-svg-icons'

const ChargeToggle = ({ data, refresh }) => {
  const authenticate = () => fetch(`${ip}/api/set?trx=0`)
  const startCharging = () => fetch(`${ip}/api/set?frc=2`)
  const stopCharging = () => fetch(`${ip}/api/set?frc=1`)

  const getIcon = () => {
    if (!data.led) return faBolt
    console.log(data.led.name)
    if (data.led.name == 'Finished') return faCheck
    if (data.led.name == 'Charging') return faStop
    if (data.led.name == 'Ready') return faBolt
    if (data.led.name == 'WaitAuth') return faLock
    if (data.led.name == 'Pulsate') return faBolt
    else return faLock
  }
  const chargeHandler = () => {
    if (!data.led) return
    if (data.led.name == 'Finished') return
    if (data.led.name == 'Charging') stopCharging()
    if (data.led.name == 'Ready') startCharging()
    if (data.led.name == 'Pulsate') startCharging()
    if (data.led.name == 'WaitAuth') authenticate()
  }
  return (
    <div
      onClick={chargeHandler}
      className={`charge-toggle ${data.led && data.led.name == 'Charging' ? 'pulse' : ''}`}
    >
      <FontAwesomeIcon icon={getIcon()} />
    </div>
  )
}

export default ChargeToggle
