const CustomEvent = ({ booking }) => {

    return (
        <div className="flex flex-col flex-wrap w-full overflow-hidden">
            <h2 className="text-nowrap text-ellipsis">{booking.patientName}</h2>
            <h2 className="text-nowrap italic text-l text-ellipsis">{booking.doctorName}</h2>
        </div>
    );  
}
 
export default CustomEvent;