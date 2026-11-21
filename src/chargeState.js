const STATUS_KEYS = ['car', 'acs', 'trx', 'frc', 'amp', 'pha', 'nrg', 'wh', 'eto', 'cards']

// car: 0 unknown, 1 idle, 2 charging, 3 wait for car, 4 finished, 5 error
// acs: 0 open, 1 authentication required
// trx: null without a transaction, 0 for a session without a card
const chargePhase = data => {
  if (data == null || data.car == null) return 'loading'
  if (data.car === 2) return 'charging'
  if (data.car === 4) return 'finished'
  if (data.acs === 1 && data.trx == null) return 'auth'
  if (data.car === 3 && data.frc === 1) return 'paused'
  if (data.car === 1 || data.car === 3) return 'ready'
  return 'error'
}

const statusLabel = data => {
  const phase = chargePhase(data)
  if (phase === 'loading') return '...'
  if (phase === 'finished') return 'Ladevorgang abgeschlossen'
  if (phase === 'charging') return 'Ladevorgang läuft...'
  if (phase === 'auth') return 'Authentifizierung nötig'
  if (phase === 'paused') return 'Ladevorgang pausiert'
  if (phase === 'ready' && data.car === 3) return 'Warte auf Fahrzeug'
  if (phase === 'ready') return 'Bereit zum laden'
  return 'Fehler'
}

export { STATUS_KEYS, chargePhase, statusLabel }
