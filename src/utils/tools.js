import jMoment from 'moment-jalaali';

class Tools {
    changeIsoDateToTimeStamp(date) {
        return Date.parse(date);
    }

    changeDateToJalali(date) {
        return jMoment.unix(parseInt(Date.parse(date) / 1000)).format('jYYYY/jMM/jDD - HH:mm:ss');
    }
}

export default new Tools();
