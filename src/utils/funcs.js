export const jalaliMonth = (x) => {
    switch (x) {
        case 1:
            return "فروردین";

        case 2:
            return "اردیبهشت";

        case 3:
            return "خرداد";

        case 4:
            return "تیر";

        case 5:
            return "مرداد";

        case 6:
            return "شهریور";

        case 7:
            return "مهر";

        case 8:
            return "آبان";

        case 9:
            return "آذر";

        case 10:
            return "دی";

        case 11:
            return "بهمن";

        case 12:
            return "اسفند";

        default:
            throw new Error("month should be between 1 and 12")
    }
}

export const numToMonth = (str) => {
    let temp = '', temp2 = '';
    temp += str[5];
    temp += str[6];
    temp = jalaliMonth(parseInt(temp));
    for (let i = 8; i < 10; i++) {
        temp2 += str[i];
    }
    temp2 += ' '
    temp2 += temp;
    temp2 += ' ماه '
    for (let i = 0; i < 4; i++) {
        temp2 += str[i];
    }
    return temp2
}