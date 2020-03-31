const apiKey = "161a835b70c46f77f49107baab678981";

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