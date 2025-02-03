import React from 'react'

const TreatmentCard = ({ imageUrl = '', cardTitle = ''}) => {
    const transitionStyle = 'transition-all ease-in-out duration-300'

    return (
        <div className={`group flex flex-col justify-between items-center w-64 aspect-square p-8 bg-blue-950 rounded-xl bg-opacity-0 hover:bg-opacity-100 hover:shadow-2xl ${transitionStyle}`}>
            <img src={imageUrl} alt="" className={`flex justify-center w-1/3 object-center group-hover:filter group-hover:invert group-hover:brightness-0 ${transitionStyle}'+`}/>

            <h1 className={`text-xl font-semibold text-blue-950 text-center group-hover:text-white ${transitionStyle}`}>
                {cardTitle}
            </h1>

            <div className='flex flex-col justify-center items-center w-fit'>
                <button className='font-semibold text-white text-center text-sm'>
                    Learn more
                </button> {/* This will be changed to a dialog*/}

                <span className={`mt-1 w-5/12 h-0.5 bg-blue-500 group-hover:w-full ${transitionStyle}`}/>
            </div>
        </div>
    )
}

export default TreatmentCard
