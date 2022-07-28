import { useState, useEffect } from 'react'

import Charge from '../tabs/Charge'
import Energy from '../tabs/Energy'
import Settings from '../tabs/Settings'
import { ip, refreshInterval } from '../config'

const Content = ({ tab }) => {
  const [data, setData] = useState({})
  const fetchData = async () => {
    const res = await (await fetch(`${ip}/api/status`)).json()
    setData(res)
  }
  const refresh = () => fetchData()
  useEffect(() => {
    fetchData()
    setInterval(() => fetchData(), refreshInterval)
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
