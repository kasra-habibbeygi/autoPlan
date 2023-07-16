const PERMISSION = {
    DASHBOARD: 0, //داشبورد
    //ظرفیت سنجی
    CAPACITY: {
        EDIT: 1,
        DELETE: 2,
        ADD: 3
    },
    // تعریف جایگاه
    STATION_DEFINATION: {
        EDIT: 4,
        DELETE: 5,
        ADD: 6
    },
    //کسری قطعات
    LACK_PARTS: {
        EDIT: 7,
        DELETE: 8,
        ADD: 9
    },
    //برنامه ریزی تعمیرات
    REPAIR_PLANNING: {
        EDIT: 10,
        VEHICLE_SPECIFICATIONS: 11,
        DIAGNOSIS: 12,
        TIME: 13
    },
    //علت انحراف
    DEVIATION_RESON: {
        EDIT: 14,
        DELETE: 15,
        ADD: 16
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
    //دسترسی پنل
    ACCESS: {
        EDIT: 21,
        DELETE: 22,
        ADD_POST: 23,
        ADD_PERSONEL: 24
    },
    //تنظیمات سایت
    SETTING: {
        RECEPTION: 25,
        REPRESENTATION: 26,
        EDIT_PROFILE: 27
    }
};

export default PERMISSION;
