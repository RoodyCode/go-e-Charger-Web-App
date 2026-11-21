import ChargeToggle from '../components/ChargeToggle'
import Stats from '../components/Stats'

const Charge = ({ data, refresh }) => {
  return (
    <>
      <ChargeToggle data={data} refresh={refresh} />
      <Stats data={data} />
    </>
  )
}

export default Charge
