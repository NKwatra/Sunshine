export const parseData = (Data, units) => {
    const weatherUnit = units === "Metric" ? "℃" : "℉";
    let data = extractFieldsFromJson(Data);
    return formatData(data, weatherUnit);
};

const formatData = (data, weatherUnit) => {
    const weatherForcast = data.map(
        ({ max_temp, min_temp, valid_date, description, icon }, index) => {
            const currentDate = new Date(valid_date);
            let month, date, day, weatherIcon;
            weatherIcon = getIcon(icon);
            if (index > 1) {
                day = getDay(currentDate.getDay(), index);
            }
            if (index === 0 || index > 6) {
                month = getMonth(currentDate.getMonth(), index);
                date = currentDate.getDate();
            }

            if (index === 0)
                return {
                    date: `Today, ${month} ${date}`,
                    description: description,
                    max_temp: `${max_temp.toFixed(0)}${weatherUnit}`,
                    min_temp: `${min_temp.toFixed(0)}${weatherUnit}`,
                    icon: weatherIcon
                };
            else if (index === 1)
                return {
                    date: "Tomorrow",
                    description: description,
                    max_temp: `${max_temp.toFixed(0)}${weatherUnit}`,
                    min_temp: `${min_temp.toFixed(0)}${weatherUnit}`,
                    icon: weatherIcon
                };
            else if (index >= 2 && index <= 6)
                return {
                    date: day,
                    description: description,
                    max_temp: `${max_temp.toFixed(0)}${weatherUnit}`,
                    min_temp: `${min_temp.toFixed(0)}${weatherUnit}`,
                    icon: weatherIcon
                };
            else
                return {
                    date: `${day}, ${month} ${date}`,
                    description: description,
                    max_temp: `${max_temp.toFixed(0)}${weatherUnit}`,
                    min_temp: `${min_temp.toFixed(0)}${weatherUnit}`,
                    icon: weatherIcon
                };
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
            weather: { description },
            weather: { code }
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
                description,
                icon: code
            }
        ];
    }, []);
};

const getIcon = code => {
    switch (code) {
        case 200:
            return require("../../assets/images/weather/t01d.png");
        case 201:
            return require("../../assets/images/weather/t02d.png");
        case 202:
            return require("../../assets/images/weather/t03d.png");
        case 230:
            return require("../../assets/images/weather/t04d.png");
        case 231:
            return require("../../assets/images/weather/t04d.png");
        case 232:
            return require("../../assets/images/weather/t04d.png");
        case 233:
            return require("../../assets/images/weather/t05d.png");
        case 300:
            return require("../../assets/images/weather/d01d.png");
        case 301:
            return require("../../assets/images/weather/d02d.png");
        case 302:
            return require("../../assets/images/weather/d03d.png");
        case 500:
            return require("../../assets/images/weather/r01d.png");
        case 501:
            return require("../../assets/images/weather/r02d.png");
        case 502:
            return require("../../assets/images/weather/r03d.png");
        case 511:
            return require("../../assets/images/weather/f01d.png");
        case 520:
            return require("../../assets/images/weather/r04d.png");
        case 521:
            return require("../../assets/images/weather/r05d.png");
        case 522:
            return require("../../assets/images/weather/r06d.png");
        case 600:
            return require("../../assets/images/weather/s01d.png");
        case 601:
            return require("../../assets/images/weather/s02d.png");
        case 602:
            return require("../../assets/images/weather/s03d.png");
        case 610:
            return require("../../assets/images/weather/s04d.png");
        case 611:
            return require("../../assets/images/weather/s05d.png");
        case 612:
            return require("../../assets/images/weather/s05d.png");
        case 621:
            return require("../../assets/images/weather/s01d.png");
        case 622:
            return require("../../assets/images/weather/s02d.png");
        case 623:
            return require("../../assets/images/weather/s06d.png");
        case 700:
            return require("../../assets/images/weather/a01d.png");
        case 711:
            return require("../../assets/images/weather/a02d.png");
        case 721:
            return require("../../assets/images/weather/a03d.png");
        case 731:
            return require("../../assets/images/weather/a04d.png");
        case 741:
            return require("../../assets/images/weather/a05d.png");
        case 751:
            return require("../../assets/images/weather/a06d.png");
        case 800:
            return require("../../assets/images/weather/c01d.png");
        case 801:
            return require("../../assets/images/weather/c02d.png");
        case 802:
            return require("../../assets/images/weather/c02d.png");
        case 803:
            return require("../../assets/images/weather/c03d.png");
        case 804:
            return require("../../assets/images/weather/c04d.png");
        case 900:
            return require("../../assets/images/weather/u00d.png");
    }
};

export const parseDbData = (data, units) => {
    let weatherUnits = units === "Metric" ? "℃" : "℉";
    if (data[0].units !== units) {
        if (data[0].units === "Metric") {
            data = data.map(row => ({
                ...row,
                max_temp: (9 * row.max_temp) / 5 + 32,
                min_temp: (9 * row.min_temp) / 5 + 32
            }));
        } else {
            data = data.map(row => ({
                ...row,
                max_temp: ((row.max_temp - 32) * 5) / 9,
                min_temp: ((row.min_temp - 32) * 5) / 9
            }));
        }
    }
    return formatData(data, weatherUnits);
};
