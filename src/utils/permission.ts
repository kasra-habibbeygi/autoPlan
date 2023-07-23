const PERMISSION = {
    //داشبورد
    DASHBOARD: 0,

    //دسترسی پرسنل
    ACCESS_PERSONNEL: {
        ADD: 200,
        EDIT: 222,
        DELETE: 123,
        LIST: 4
    },

    //دسترسی پست
    ACCESS_POST: {
        ADD: 222,
        EDIT: 222,
        DELETE: 222,
        LIST: 8
    },

    //علت انحراف
    DEVIATION_REASON: {
        ADD: 9,
        EDIT: 10,
        DELETE: 11,
        LIST: 12
    },

    //ظرفیت سنجی
    CAPACITY: {
        ADD: 13,
        EDIT: 14,
        DELETE: 15,
        LIST: 16
    },

    //کسری قطعات
    LACK_PARTS: {
        ADD: 17,
        EDIT: 18,
        DELETE: 19,
        LIST: 20
    },

    //تنظیمات پذیرش
    SETTING_RECEPTION: {
        ADD: 21,
        EDIT: 22,
        LIST: 23
    },

    //تنظیمات ساعت کاری نمایندگی
    REPRESENTATION_WORKING_TIME: {
        ADD: 24,
        EDIT: 25,
        LIST: 26
    },

    // تعریف جایگاه
    SEAT_CAPACITY: {
        ADD: 27,
        EDIT: 28,
        DELETE: 29,
        LIST: 30
    }
};

export default PERMISSION;
