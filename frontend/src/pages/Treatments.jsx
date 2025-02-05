import TreatmentCard from "../components/treatment/TreatmentCard"
import tempTreatmentData from '../data/tempTreatData.json'

const Treatments = () => {

    return (
        <div className="flex w-full p-8 gap-8 flex-wrap justify-center">
            {tempTreatmentData.map((treatment, index) => (
                <TreatmentCard key={ index } treatment={ treatment }/>
            ))}
        </div>
    )
  }

export default Treatments