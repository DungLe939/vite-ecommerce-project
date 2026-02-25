import dayjs from "dayjs";


export function formatDay(time) {
    return dayjs(time).format('MMMM D');
}