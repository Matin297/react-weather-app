const apiKey = process.env.REACT_APP_API_KEY;

// get weather forecast by geographic coordinates
export const getForcastByCoordsAPI = async (lon, lat) => {

    try {

        const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);

        const data = await response.json();

        return data;

    } catch (e) {
        console.log(e)
    }

}

export const getForecastByNameAPI = async (name) => {

    try {

        const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${apiKey}&units=metric`);

        const data = await response.json();

        return data;

    } catch (e) {
        console.log(e)
    }

}