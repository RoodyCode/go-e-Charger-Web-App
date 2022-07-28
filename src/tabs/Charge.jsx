import ChargeToggle from '../components/ChargeToggle'
import Stats from '../components/Stats'

const Charge = ({ data }) => {
  return (
    <>
      <ChargeToggle data={data} />
      <Stats data={data} />
    </>
  )
}

export default Charge
