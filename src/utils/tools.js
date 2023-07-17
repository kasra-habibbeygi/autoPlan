import jMoment from 'moment-jalaali';

class Tools {
    changeIsoDateToTimeStamp(date) {
        return Date.parse(date);
    }

    changeDateToJalali(date) {
        return jMoment.unix(parseInt(Date.parse(date) / 1000)).format('jYYYY/jMM/jDD - HH:mm:ss');
    }

    changeTimeStampToIsoDate(date) {
        return new Date(date).toISOString();
    }

    TableRowCalculator(limit, page, index) {
        return limit * page - (limit - 1) + index;
    }
}

export default new Tools();
