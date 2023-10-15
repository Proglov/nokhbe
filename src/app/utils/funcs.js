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