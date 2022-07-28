import { ip } from '../config'

const Energy = ({ data, refresh }) => {
  const amps = [6, 10, 16]
  const setAmp = async amp => {
    const res = await fetch(`${ip}/api/set?amp=` + amp)
    refresh()
  }
  return (
    <>
      <h3>RFID Chips</h3>
      <div className="list">
        {data.cards
          ? data.cards.map(card => (
              <div key={card.name} className="list-item">
                <div>{card.name}</div>
                <div>{(card.energy / 1000).toFixed(2)} kWh</div>
              </div>
            ))
          : 'loading...'}
      </div>
      <div className="btn-group">
        {amps.map(amp => (
          <button
            key={amp}
            className={data.amp && data.amp == amp ? 'btn-active' : ''}
            onClick={() => setAmp(amp)}
          >
            {amp} A
          </button>
        ))}
      </div>
    </>
  )
}

export default Energy
