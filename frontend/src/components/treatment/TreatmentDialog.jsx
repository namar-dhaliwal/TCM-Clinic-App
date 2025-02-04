import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";

const TreatmentDialog = ({ dialogTitle, headerImage, treatmentDescription, treatmentEffects }) => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <div>
            <button className='font-semibold text-white text-center text-sm' onClick={handleOpen}>
                Learn more
            </button>
            
            <div className={`${ open ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity ease-in-out duration-200`}>
                {/* Dialog black tint. */}
                <div className='fixed bg-black inset-0 bg-opacity-50 z-40' onClick={handleClose}/>

                <dialog open className='bg-white fix inset-0 w-1/3 min-w-80 h-5/6 z-40 rounded-xl overflow-hidden'>

                    {/* Treatment header. */}
                    <div className='flex justify-center items-center h-1/2 p-8'>
                        <img 
                            src={ headerImage } 
                            className='absolute object-cover h-1/2 w-full'
                        />
                        <div className='absolute inset-0 bg-black opacity-50 h-1/2'/>
                        <h1 className='relative text-3xl text-center text-white font-semibold'>{dialogTitle}</h1>
                        
                        <button className='absolute top-8 right-8' onClick={ handleClose }>
                            <IoClose size={36} className='text-white hover:scale-110 transition-transform ease-in-out duration-300'/>
                        </button>
                    </div>
                    
                    {/* Treatment desription */}
                    <div className='p-8 h-1/2'>
                        <div className='overflow-y-scroll [&::-webkit-scrollbar]:hidden h-full'>
                            <div className='text-blue-950'>
                                <h2 className='font-semibold text-xl'>Description:</h2>
                                <p className='mt-1'>{ treatmentDescription }</p>
                            </div>

                            {/* Treatment Effects*/}
                            <div className='text-blue-950 mt-8'>
                                <h2 className='font-semibold text-xl'>Effects:</h2>
                                <p className='mt-1'>{ treatmentEffects }</p>
                            </div>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    )
}

export default TreatmentDialog
