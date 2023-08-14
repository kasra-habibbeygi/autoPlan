const PERMISSION = {
    //داشبورد
    DASHBOARD: {
        LIST: 0,
        URL: '/dashboard'
    },

    //دسترسی پرسنل
    ACCESS_PERSONNEL: {
        ADD: 1,
        EDIT: 2,
        DELETE: 3,
        LIST: 4,
        URL: '/accessibility'
    },

    //دسترسی پست
    ACCESS_POST: {
        ADD: 5,
        EDIT: 6,
        DELETE: 7,
        LIST: 8,
        URL: '/accessibility'
    },

    //علت انحراف
    DEVIATION_REASON: {
        ADD: 9,
        EDIT: 10,
        DELETE: 11,
        LIST: 12,
        URL: '/deviation'
    },

    //تعریف جایگاه
    SEAT_CAPACITY: {
        ADD: 13,
        EDIT: 14,
        DELETE: 15,
        LIST: 16,
        URL: '/station'
    },

    //کسری قطعات
    LACK_PARTS: {
        ADD: 17,
        EDIT: 18,
        DELETE: 19,
        LIST: 20,
        URL: '/deficiency'
    },

    //تنظیمات پذیرش
    SETTING_RECEPTION: {
        ADD: 21,
        EDIT: 22,
        LIST: 23,
        URL: '/setting'
    },

    //تنظیمات ساعت کاری نمایندگی
    REPRESENTATION_WORKING_TIME: {
        ADD: 24,
        EDIT: 25,
        LIST: 26,
        URL: '/setting'
    },

    // ظرفیت سنجی
    CAPACITY_MEASUREMENT: {
        ADD: 27,
        EDIT: 28,
        DELETE: 29,
        LIST: 30,
        URL: '/qualification'
    },

    //اقدام اصلاحی
    CORRECTIVE_ACTION: {
        ADD: 31,
        EDIT: 32,
        DELETE: 33,
        LIST: 34,
        URL: '/corrective'
    },

    //برنامه ریزی تعمیرات
    VEHICLE_SPECIFICATIONS: {
        ADD_EDIT_VEHICLE_DETAIILS: 35,
        ADD_EDIT_DIAGNOSIS: 36,
        ADD_EDIT_TIME: 37,
        LIST: 38,
        URL: '/planning'
    },

    //کسری تجهیزات
    EQUIPMENT_SHORTAGE: {
        ADD: 40,
        EDIT: 41,
        DELETE: 42,
        LIST: 43,
        URL: '/equipment'
    },

    //نمودارها و اکسل
    EXCEL: {
        LIST: 44,
        URL: '/reporting'
    }
};

export default PERMISSION;
