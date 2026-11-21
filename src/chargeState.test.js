import assert from 'node:assert/strict'
import test from 'node:test'
import { chargePhase, statusLabel } from './chargeState.js'

test('charge phase follows car, acs, and trx', () => {
  assert.equal(chargePhase({}), 'loading')
  assert.equal(chargePhase({ car: 1 }), 'ready')
  assert.equal(chargePhase({ car: 2, acs: 1, trx: null }), 'charging')
  assert.equal(chargePhase({ car: 3, frc: 0 }), 'ready')
  assert.equal(chargePhase({ car: 3, frc: 1 }), 'paused')
  assert.equal(chargePhase({ car: 3, acs: 1, trx: null }), 'auth')
  assert.equal(chargePhase({ car: 1, acs: 1, trx: 0 }), 'ready')
  assert.equal(chargePhase({ car: 4 }), 'finished')
  assert.equal(chargePhase({ car: 5 }), 'error')
  assert.equal(chargePhase({ car: 0 }), 'error')
})

test('status labels stay in the existing wording', () => {
  assert.equal(statusLabel({}), '...')
  assert.equal(statusLabel({ car: 1 }), 'Bereit zum laden')
  assert.equal(statusLabel({ car: 2 }), 'Ladevorgang läuft...')
  assert.equal(statusLabel({ car: 3, frc: 1 }), 'Ladevorgang pausiert')
  assert.equal(statusLabel({ car: 3, frc: 2 }), 'Warte auf Fahrzeug')
  assert.equal(statusLabel({ car: 4 }), 'Ladevorgang abgeschlossen')
  assert.equal(statusLabel({ car: 1, acs: 1, trx: null }), 'Authentifizierung nötig')
  assert.equal(statusLabel({ car: 5 }), 'Fehler')
})
