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
}

export default new Tools();
