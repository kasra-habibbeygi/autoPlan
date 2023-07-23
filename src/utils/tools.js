import jMoment from 'moment-jalaali';

class Tools {
    // most remove at end of project
    changeIsoDateToTimeStamp(date) {
        return Date.parse(date);
    }

    changeRawDateToIsoDate(date) {
        return new Date(date).toISOString();
    }

    changeDateToJalali(date, needTime = true) {
        if (needTime) {
            return jMoment.unix(parseInt(Date.parse(date) / 1000)).format('jYYYY/jMM/jDD - HH:mm:ss');
        }
        return jMoment.unix(parseInt(Date.parse(date) / 1000)).format('jYYYY/jMM/jDD');
    }

    changeTimeStampToIsoDate(date) {
        return new Date(date).toISOString();
    }

    // New
    changeDateToTimeStamp(data) {
        const jalaliDate = jMoment(data, 'jYYYY-jMM-jDD');
        const gregorianDate = jalaliDate.toDate();
        const timestamp = gregorianDate.getTime();

        return timestamp;
    }

    changeTimeStampToDate(date) {
        return jMoment.unix(parseInt(date / 1000)).format('jYYYY-jMM-jDD');
    }

    TableRowCalculator(limit, page, index) {
        return limit * page - (limit - 1) + index;
    }
}

export default new Tools();
