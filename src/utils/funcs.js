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

export const jalaliMonthEn = (x) => {
    switch (x) {
        case '01':
            return "فروردین";

        case '02':
            return "اردیبهشت";

        case '03':
            return "خرداد";

        case '04':
            return "تیر";

        case '05':
            return "مرداد";

        case '06':
            return "شهریور";

        case '07':
            return "مهر";

        case '08':
            return "آبان";

        case '09':
            return "آذر";

        case '10':
            return "دی";

        case '11':
            return "بهمن";

        case '12':
            return "اسفند";

        default:
            throw new Error("month should be between 1 and 12")
    }
}

export const convertToFarsiNum = x => {
    switch (x) {
        case '0':
            return '۰';
        case '1':
            return '١';

        case '2':
            return '۲';

        case '3':
            return '۳';

        case '4':
            return '۴';

        case '5':
            return '۵';

        case '6':
            return '۶';

        case '7':
            return '۷';

        case '8':
            return '۸';

        case '9':
            return '۹';
        default:
            return x
    }
}

export const dateInFarsi = str => {
    let newStr = '';
    for (let i = 0; i < str.length; i++) {
        newStr += convertToFarsiNum(str[i])
    }
    return newStr;
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
    for (let i = 0; i < 4; i++) yr += str[i];
    for (let i = 5; i < 7; i++) month += str[i];
    for (let i = 8; i < 10; i++) day += str[i];
    return [yr, month, day]
}

export const encString = str => {
    if (typeof str !== "string") return null
    let res = []
    for (let i = 0; i < str.length; i++) {
        if (i % 2 === 0) {
            res[i + 1] = str[i]
        } else {
            res[i - 1] = str[i]
        }
    }
    return res.join("")
}

export const extractIdFromFilename = str => {
    if (typeof str !== "string") return null
    let res = []
    for (let i = 0; i < str.length; i++) {
        if (str[i] === "_") {
            for (let j = i + 1; j < str.length; j++) {
                if (str[j] === "_") break
                res.push(str[j])
            }
            break
        }
    }
    return encString(res.join(""))
}

export const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}