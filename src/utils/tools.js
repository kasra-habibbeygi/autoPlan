import jMoment from 'moment-jalaali';

class Tools {
    // most remove at end of project
    changeDateToJalali(date, needTime = true) {
        if (needTime) {
            return jMoment.unix(parseInt(Date.parse(date) / 1000)).format('jYYYY/jMM/jDD - HH:mm:ss');
        }
        return jMoment.unix(parseInt(Date.parse(date) / 1000)).format('jYYYY/jMM/jDD');
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
