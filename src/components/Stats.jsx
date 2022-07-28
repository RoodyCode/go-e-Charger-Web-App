import Box from './Box'
import { faHeartPulse, faChargingStation, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

const Stats = ({ data }) => {
  return (
    <div className="stats">
      <Box icon={faHeartPulse} title="Status">
        {!data.led
          ? '...'
          : data.led.name == 'Finished'
          ? 'Ladevorgang abgeschlossen'
          : data.led.name == 'Charging'
          ? 'Ladevorgang läuft...'
          : data.led.name == 'Ready'
          ? 'Bereit zum laden'
          : data.led.name == 'Pulsate'
          ? 'Ladevorgang pausiert'
          : data.led.name == 'WaitAuth'
          ? 'Authentifizierung nötig'
          : ''}
      </Box>
      <Box icon={faInfoCircle} title="Information">
        <p>{data.pha ? data.pha.filter(val => val).length : '-'} - phasiger Anschluss</p>
        {data.nrg ? (
          <>
            <p>
              {data.nrg[0]} V / {data.nrg[1]} V / {data.nrg[2]} V
            </p>
            <p>
              {data.nrg[4]} A / {data.nrg[5]} A / {data.nrg[6]} A
            </p>
            <p>
              {data.nrg[7]} kW / {data.nrg[8]} kW / {data.nrg[9]} kW
            </p>
            <p>
              {data.nrg[12]} % / {data.nrg[13]} % / {data.nrg[14]} %
            </p>
          </>
        ) : (
          '-'
        )}
      </Box>
      <Box icon={faChargingStation} title="Energie">
        <p>Energie {data.wh ? (data.wh / 1000).toFixed(2) : '-'}kWh</p>
        <p>Gesamt {data.eto ? (data.eto / 1000).toFixed(1) : '-'}kWh</p>
      </Box>
    </div>
  )
}

export default Stats
