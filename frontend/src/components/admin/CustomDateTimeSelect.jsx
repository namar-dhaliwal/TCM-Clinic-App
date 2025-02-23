const CustomDatetimeSelect = ({
	hour,
	setHour,
	minutes,
	setMinutes,
	period,
	setPeriod,
    error,
}) => {
	const generateHourOptions = () => {
		return Array.from({ length: 12 }, (_, i) => {
			const value = String(i + 1).padStart(2, '0')
			return (
				<option key={value} value={value}>
					{value}
				</option>
			)
		})
	}

	const generateMinuteOptions = () => {
		return ['00', '15', '30', '45'].map((value) => (
			<option key={value} value={value}>
				{value}
			</option>
		))
	}

	return (
		<div className='flex flex-col gap-2'>
			<div className='flex gap-2'>
				<label>Start Time:</label>
				<div className='flex flex-1 gap-2'>
					<select
						value={hour}
						onChange={(e) => setHour(e.target.value)}
						className={`border border-black rounded-md pl-1 flex-1 ${
                            error
                                ? 'bg-red-100 border-red-400 text-red-700'
                                : ''
                        }`}>
						{generateHourOptions()}
					</select>

					<select
						value={minutes}
						onChange={(e) => setMinutes(e.target.value)}
						className={`border border-black rounded-md pl-1 flex-1 ${
                            error
                                ? 'bg-red-100 border-red-400 text-red-700'
                                : ''
                        }`}>
						{generateMinuteOptions()}
					</select>

					<select
						value={period}
						onChange={(e) => setPeriod(e.target.value)}
						className={`border border-black rounded-md pl-1 flex-1 text-center ${
                            error
                                ? 'bg-red-100 border-red-400 text-red-700'
                                : ''
                        }`}>
						<option value='AM'>AM</option>
						<option value='PM'>PM</option>
					</select>
				</div>
			</div>
		</div>
	)
}

export default CustomDatetimeSelect
