const PERMISSION = {
    //داشبورد
    DASHBOARD: 0,

    //دسترسی پرسنل
    ACCESS_PERSONNEL: {
        ADD: 1,
        EDIT: 2,
        DELETE: 3,
        LIST: 4
    },

    //دسترسی پست
    ACCESS_POST: {
        ADD: 5,
        EDIT: 6,
        DELETE: 7,
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
    STATION_DEFINITION: {
        EDIT: 4,
        DELETE: 5,
        ADD: 6
    },

    //برنامه ریزی تعمیرات
    REPAIR_PLANNING: {
        EDIT: 10,
        VEHICLE_SPECIFICATIONS: 11, // مشخصات خودرو
        DIAGNOSIS: 12, //عیب یابی
        TIME: 13
    },

    //گزارش گیری
    REPORTS: {
        LAST_MONTH: 17,
        DEVIATION_AMOUNT: 18, //میزان انحراف در هر بخشی نمایندگی
        REPORT: 19, // گزارش میزان انحراف در هر بخش
        UPDATE: 20 // میزان بروز انحراف در شش ماه گذشته
    },
    //اقدام اصلاحی
    CORRECTIVE_ACTION: {
        EDIT: 21,
        DELETE: 22,
        ADD: 23
    },

    //تنظیمات سایت
    SETTING: {
        RECEPTION: 28, // تنظیمات پذیرنده
        REPRESENTATION: 29, //ساعت کار نمایندگی
        EDIT_PROFILE: 30
    }
};

export default PERMISSION;
