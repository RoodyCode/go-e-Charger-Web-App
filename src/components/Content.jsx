import { useState, useEffect, useRef } from 'react'

import Charge from '../tabs/Charge'
import Energy from '../tabs/Energy'
import Settings from '../tabs/Settings'
import { ip, refreshInterval } from '../config'
import { STATUS_KEYS } from '../chargeState'

const Content = ({ tab }) => {
  const [data, setData] = useState({})
  const abortRef = useRef(null)
  const fetchData = async () => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    try {
      const url = new URL('/api/status', ip)
      url.searchParams.set('filter', STATUS_KEYS.join(','))
      const res = await fetch(url, {
        signal: AbortSignal.any([controller.signal, AbortSignal.timeout(refreshInterval)])
      })
      if (!res.ok) return
      setData(await res.json())
    } catch (err) {
      if (err.name === 'AbortError' || err.name === 'TimeoutError') return
    }
  }
  const refresh = () => fetchData()
  useEffect(() => {
    fetchData()
    const timer = setInterval(fetchData, refreshInterval)
    return () => {
      clearInterval(timer)
      abortRef.current?.abort()
    }
  }, [])
  return (
    <div className="content">
      {tab == 'charge' ? (
        <Charge refresh={refresh} data={data} />
      ) : tab == 'energy' ? (
        <Energy refresh={refresh} data={data} />
      ) : tab == 'settings' ? (
        <Settings />
      ) : (
        ''
      )}
    </div>
  )
}

export default Content
