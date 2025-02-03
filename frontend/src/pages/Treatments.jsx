import TreatmentCard from "../components/treatment/TreatmentCard"
import bandAid from '../assets/images/band-aid.png'

const Treatments = () => {

    return (
        <div className="flex w-full p-8 gap-4 flex-wrap align-middle">
            <TreatmentCard imageUrl={bandAid} cardTitle={'ACC Assessments'}/>
            <TreatmentCard imageUrl={bandAid} cardTitle={'Accident and injury management'}/>
            <TreatmentCard imageUrl={bandAid} cardTitle={'Accident and injury management'}/>
            <TreatmentCard imageUrl={bandAid} cardTitle={'Accident and injury management'}/>
            <TreatmentCard imageUrl={bandAid} cardTitle={'Accident and injury management'}/>
            <TreatmentCard imageUrl={bandAid} cardTitle={'Accident and injury management'}/>
            <TreatmentCard imageUrl={bandAid} cardTitle={'Accident and injury management'}/>
        </div>
    )
  }

export default Treatments