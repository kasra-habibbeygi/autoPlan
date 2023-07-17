import jMoment from 'moment-jalaali';

class Tools {
    changeIsoDateToTimeStamp(date) {
        return Date.parse(date);
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

    TableRowCalculator(limit, page, index) {
        return limit * page - (limit - 1) + index;
    }
}

export default new Tools();
