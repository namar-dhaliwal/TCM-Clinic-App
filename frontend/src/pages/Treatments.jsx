import TreatmentCard from "../components/treatment/TreatmentCard"
import tempTreatmentData from '../data/tempTreatData.json'

const Treatments = () => {

    console.log(tempTreatmentData)

    return (
        <div className="flex w-full p-8 gap-4 flex-wrap align-middle">
            {tempTreatmentData.map((treatment, index) => (
                <TreatmentCard key={ index } imageUrl={ treatment.card_icon } cardTitle={treatment.treatment}/>
            ))}
        </div>
    )
  }

export default Treatments