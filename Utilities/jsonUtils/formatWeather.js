export const parseData = (Data, units) => {
    const weatherUnit = units === "Metric" ? "℃" : "℉";
    let data = extractFieldsFromJson(Data);
    const weatherForcast = data.map(
        ({ max_temp, min_temp, valid_date, description }, index) => {
            const currentDate = new Date(valid_date);
            let month, date, day;
            if (index > 1) {
                day = getDay(currentDate.getDay(), index);
            }
            if (index === 0 || index > 6) {
                month = getMonth(currentDate.getMonth(), index);
                date = currentDate.getDate();
            }

            if (index === 0)
                return `Today, ${month} ${date} - ${description} - ${max_temp}${weatherUnit} / ${min_temp}${weatherUnit}`;
            else if (index === 1)
                return `Tomorrow - ${description} - ${max_temp}${weatherUnit} / ${min_temp}${weatherUnit}`;
            else if (index >= 2 && index <= 6)
                return `${day} - ${description} - ${max_temp}${weatherUnit} / ${min_temp}${weatherUnit}`;
            else
                return `${day}, ${month} ${date} - ${description} - ${max_temp}${weatherUnit} / ${min_temp}${weatherUnit}`;
        }
    );
    return weatherForcast;
};

const getMonth = (month, index) => {
    let returnMonth;
    if (index !== 0) {
        switch (month + 1) {
            case 1:
                returnMonth = "Jan";
                break;
            case 2:
                returnMonth = "Feb";
                break;
            case 3:
                returnMonth = "Mar";
                break;
            case 4:
                returnMonth = "Apr";
                break;
            case 5:
                returnMonth = "May";
                break;
            case 6:
                returnMonth = "Jun";
                break;
            case 7:
                returnMonth = "Jul";
                break;
            case 8:
                returnMonth = "Aug";
                break;
            case 9:
                returnMonth = "Sep";
                break;
            case 10:
                returnMonth = "Oct";
                break;
            case 11:
                returnMonth = "Nov";
                break;
            case 12:
                returnMonth = "Dec";
                break;
        }
    } else {
        switch (month + 1) {
            case 1:
                returnMonth = "January";
                break;
            case 2:
                returnMonth = "February";
                break;
            case 3:
                returnMonth = "March";
                break;
            case 4:
                returnMonth = "April";
                break;
            case 5:
                returnMonth = "May";
                break;
            case 6:
                returnMonth = "June";
                break;
            case 7:
                returnMonth = "July";
                break;
            case 8:
                returnMonth = "August";
                break;
            case 9:
                returnMonth = "September";
                break;
            case 10:
                returnMonth = "October";
                break;
            case 11:
                returnMonth = "November";
                break;
            case 12:
                returnMonth = "December";
                break;
        }
    }
    return returnMonth;
};

const getDay = (day, index) => {
    let Day;
    if (index > 6) {
        switch (day) {
            case 0:
                Day = "Mon";
                break;
            case 1:
                Day = "Tue";
                break;
            case 2:
                Day = "Wed";
                break;
            case 3:
                Day = "Thu";
                break;
            case 4:
                Day = "Fri";
                break;
            case 5:
                Day = "Sat";
                break;
            case 6:
                Day = "Sun";
                break;
        }
    } else {
        switch (day) {
            case 0:
                Day = "Monday";
                break;
            case 1:
                Day = "Tuesday";
                break;
            case 2:
                Day = "Wednessday";
                break;
            case 3:
                Day = "Thursday";
                break;
            case 4:
                Day = "Friday";
                break;
            case 5:
                Day = "Saturday";
                break;
            case 6:
                Day = "Sunday";
                break;
        }
    }
    return Day;
};

export const extractFieldsFromJson = data => {
    return data.reduce((result, dailyWeather) => {
        const {
            valid_date,
            wind_spd,
            max_temp,
            min_temp,
            pres,
            rh,
            weather: { description }
        } = dailyWeather;
        return [
            ...result,
            {
                valid_date,
                wind_spd,
                max_temp,
                min_temp,
                pres,
                rh,
                description
            }
        ];
    }, []);
};
