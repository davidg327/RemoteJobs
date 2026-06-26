import moment from "moment";

export const date = (date: string) => {
    return moment(date).format('MM/DD/YYYY');
}
