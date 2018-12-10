import React, { Component } from 'react'
import { Map, TileLayer, ZoomControl } from 'react-leaflet'

import { BoxZoomControl } from 'react-leaflet-box-zoom'

export default class App extends Component {

	render () {

		const boxZoomControlStyle = {
			width: '31px', 
			height: '31px', 
			border: '1px solid rgba(0,0,0,0.9)',
			boxShadow: '0 1px 5px rgba(0,0,0,0.65)', 
			backgroundPosition: '50% 50%',
			borderRadius: '2px',
			background: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAFJElEQVRIieWWXUxTZxjHf6enLUWKxaY4kYwqbEXSMTGQRQaRkYDjY5tDZdMYd7OoF4uJMSEmjmXxxmSLyZIFM+N2M128Gc6R2RncQJoRZUsMJsLYyPg4K3SVliIf/YBzTruLQ0nXGRfMjBf+kzc5ed/nPP/3fb7haYOwClk7sAuoAtYBJkAFQsAE8A3QC8z9X8QFwH7gbSAKDAIScB/QA+sBx/KSgPPA98uyj4y3gGGgBzgEpD9Etgg4A4wB7cDzj0r6IeADjq/yv+eAr9DMX7la0g+AEeCV1f6YhFPAPeClBx0+yMd7gDbgANB99OhRioqKmJyc5OrVq9TX1+P1enE6nbS2tiLL8sPIzwC1QCOaBVYgpgjmAWeBc0aj8VJzczOlpaVs2bIFgKGhIXbs2IGiKGzbtg1RFLFareTm5hIIBFBVNZX4F2AvWha4kw90KYJNaNF6vq6ujoKCAjEej6PTaWKqqiLLMoqiIMsyJpMJQRDIy8ujpaWFqqqqVOL7wGngTeCF5AN90ncu0AxcsFgsC2lpaYRCoZdHR0dfjMVif0xNTZnS09P/MpvNg3q9PhSPx0le4XCY6upqPB4PIyMjyRydwGFgJ1qGLKaaej9aILTW1taGq6ur0el0my9evHjW7XbvisfjVo/Hc1ySpBpRFMPl5eVDg4ODBINBzGYzFouFWCwGwIYNG5AkKaE3DjyD5uc5YCjV1FXLNwrYbDYKCwspKChwb9++/QiwtHbt2na9Xv97enp60OPxfNTW1taRaj4AWZZpampK3b6FVgNeT2wkE2cD4wAul4ubN2+i0+koLi6+UlFRceHatWsfK4ryc1FR0b75+fm9Pp+Pnp6eHwwGQ6soimkrz4vHWVxcxOFwJBMPATNoZfdfxBnANIDf72dqagpBEFAUhU2bNn1it9t75+bm3hkbG3vP4XDcOXbsWHNNTc2RiYmJg729vf16vb5BEASdIAjodDqysrIQhJVsnUer6esSG8k+fnf5ZrcA+vv7KSsrA2B2djZitVqv2O32e52dne+bzeaDTqdzQBTF7nA4/JnT6bS0t7efjEQiZUajccjhcATGx8cxmUz4/f6E/mbABpxLJd63bI7uhMny8vKw2WzMz8+zuLgYj0ajdwsLC7+QJOlZl8t12mg0llit1l9379592ePxrJ+ZmWnS6XT1gOD3+39bWFhYCgQCAJlowasCX6YS1wFZaO2NxKsNBgM2m41oNJqoUrLf7/8xPz+/d3h4+LVYLHZodHQ03+v1ljY2Nu6RJGltR0fHqZKSkkuRSCTg9XoBStByeRT4Fv6Zx260DmQDAonNzs5Otm7dyszMDCnoa2ho2OlyuQ5IktTi8/nW9fX11eTk5LxRUVFx0m63jymKkpAtByLAdw/ysQ+tci0Bt1cERJFgMIjD4WBpaQnQgi8zM5OMjAxkWb5bXFx8WVXV4Jo1a45v3LjxTm5u7oloNCq73W5CoZAInAC60LqWmvriSeBrtIZ/CVgArUwODg7i8/lQFIXKykpEUUQQBARBIBKJkJOT4y8pKTl348YNkyzLP4miqCYyA3gV2IzW8RYTZKm1+gqanw+n2nV6eprZ2VmuX7/OwMAAiqIQjUZRVRWLxYLVao0bDIZPRVG8PTc3R3d3N8u6TqL5dSBZnz5F/59oRb0NuMNyhCcj0Qa7uroAyM7OZnJyknA4zPT0tCrLMn19fQm5VrSI/hytdP4nHvsg8DA8kdEngcc27D2x8faJDfRPH/4GbHknm8naOLUAAAAASUVORK5CYII=")',
			backgroundColor: 'rgb(255, 255, 255)'
		};

		const boxZoomControlActiveStyle = {
			backgroundColor: '#a3a3a3'
		}

		return (
			<div className="map">
				<Map
					center={[44.635, 22.653]}
					zoom={12}
					zoomControl={false} >

					<TileLayer
						attribution=""
						url="https://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"/>
			
					<ZoomControl position='topright' />

					<BoxZoomControl 
						sticky={true}
					/>

				</Map>
			</div>
		)
	}
}
