export const jalaliMonth = (x) => {
    switch (x) {
        case '١':
            return "فروردین";

        case '۲':
            return "اردیبهشت";

        case '۳':
            return "خرداد";

        case '۴':
            return "تیر";

        case '۵':
            return "مرداد";

        case '۶':
            return "شهریور";

        case '۷':
            return "مهر";

        case '۸':
            return "آبان";

        case '۹':
            return "آذر";

        case '۱۰':
            return "دی";

        case '۱۱':
            return "بهمن";

        case '۱۲':
            return "اسفند";

        default:
            throw new Error("month should be between 1 and 12")
    }
}

export const giveMeDateInFa = (str) => {
    const result = str.split('/');
    result[1] = jalaliMonth(result[1])
    return result;
};

export const convertRoles = role => {
    if (role === '111010')
        return "ادمین"
    else if (role === '000101')
        return "کاربر عادی"
    else if (role === '000000')
        return "تایید نشده"
}

export const convertEventAt = str => { // 1402-02-25
    let yr = '', month = '', day = '';
    for (let i = 0; i < 3; i++) yr += str[i];
    for (let i = 5; i < 7; i++) month += str[i];
    for (let i = 8; i < 10; i++) day += str[i];
    return [yr, month, day]
}