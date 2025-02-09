import { createContext, useContext, useState } from 'react'

const DateContext = createContext()

const DateProvider = ({ children }) => {
	const [selectedDate, setSelectedDate] = useState(new Date())
	const value = { selectedDate, setSelectedDate }

	return <DateContext.Provider value={value}>{children}</DateContext.Provider>
}

const useDateContext = () => {
	const context = useContext(DateContext)
	if (!context) {
		throw new Error('useDateContext must be used within a DateProvider')
	}
	return context
}

export { DateProvider, useDateContext }
