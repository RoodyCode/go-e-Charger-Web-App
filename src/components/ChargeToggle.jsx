import { ip } from '../config'
import { chargePhase } from '../chargeState'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faLock, faCheck, faStop } from '@fortawesome/free-solid-svg-icons'

const ChargeToggle = ({ data, refresh }) => {
  const phase = chargePhase(data)
  const send = async query => {
    await fetch(`${ip}/api/set?${query}`)
    refresh()
  }

  const getIcon = () => {
    if (phase === 'finished') return faCheck
    if (phase === 'charging') return faStop
    if (phase === 'auth' || phase === 'error') return faLock
    return faBolt
  }
  const chargeHandler = () => {
    if (phase === 'charging') send('frc=1')
    if (phase === 'ready' || phase === 'paused') send('frc=2')
    if (phase === 'auth') send('trx=0')
  }
  return (
    <div
      onClick={chargeHandler}
      className={`charge-toggle ${phase === 'charging' ? 'pulse' : ''}`}
    >
      <FontAwesomeIcon icon={getIcon()} />
    </div>
  )
}

export default ChargeToggle
