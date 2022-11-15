import moment from "moment";



export function getDateFormatted(date: string) {
    return getDate(date, 'DD/MM/YYYY');
}
export function getDate(date: string, dateFormat: string) {
    return moment(date, dateFormat).fromNow();
}


export function remove(arr: number[], item: number) {
    const newArr = [...arr];
    newArr.splice(newArr.findIndex(i => i === item), 1);
    return newArr;
  };


/*export function NewlineText(input : string) {
    const text = input;
    return text.split('\n').map(str => <p>{str}</p>);
}*/