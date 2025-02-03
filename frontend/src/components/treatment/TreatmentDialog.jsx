import React, { useState } from 'react'

const TreatmentDialog = ({ dialogTitle }) => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <div>
            <button className='font-semibold text-white text-center text-sm' onClick={handleOpen}>
                Learn more
            </button>
            
            <div className={`${ open ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity ease-in-out duration-200`}>
                <div className='fixed bg-black inset-0 bg-opacity-50 z-40' onClick={handleClose}/>

                <dialog open className='bg-white fix inset-0 w-1/3 min-w-80 h-5/6 z-40 rounded-xl overflow-hidden'>
                    <div className='flex justify-center items-center h-1/2 p-8'>
                        <img 
                            src="https://images.unsplash.com/photo-1512290746430-3ffb4fab31bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                            className='absolute object-cover h-1/2 w-full'
                        />
                        <div className='absolute inset-0 bg-black opacity-50 h-1/2'/>
                        <h1 className='relative text-3xl text-center text-white font-semibold'>{dialogTitle}</h1>
                    </div>
                    
                    <body className='p-8 h-1/2'>
                        <p className='h-full overflow-y-scroll [&::-webkit-scrollbar]:hidden'>Acupuncture is a traditional Chinese medicine practice that involves inserting thin, sterile needles into specific points on the body to promote natural healing and balance. It helps to restore the flow of energy, known as "Qi," through the body's meridians. Acupuncture is commonly used to relieve pain, reduce stress, improve circulation, and support overall wellness. It can be effective for conditions such as chronic pain, migraines, digestive issues, anxiety, and sleep disorders. Each session is tailored to the individual's needs, ensuring a holistic and personalized approach to health.</p>
                    </body>
                </dialog>
            </div>
        </div>
    )
}

export default TreatmentDialog
