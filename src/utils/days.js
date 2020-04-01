export function extractFiveDays(list) {

    let currDate = '';
    let days = [];

    for (let i = 0; i < list.length; i++) {

        // get the date to compare
        let d = list[i].dt_txt.split(' ')[0];

        if (d !== currDate) {
            currDate = d;
            list[i].dayName = new Date(list[i].dt * 1000).toString().split(' ')[0]; // day name in short
            days.push(list[i]);
        }
    }

    return days.slice(0, 5);

}

export function extractSameDays(date, list) {

    let days = [];

    for (let i = 0; i < list.length; i++) {

        // get the date to compare
        let d = list[i].dt_txt.split(' ')[0];

        if (d === date) {
            days.push(list[i]);
        }
    }

    return days;

}