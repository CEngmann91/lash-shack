import moment from "moment";


export function getDateFormatted(date: string) : string {
    return getDate(date, 'DD/MM/YYYY');
}
export function getDate(date: string, dateFormat: string) : string {
    return moment(date, dateFormat).fromNow();
}

// export function convertToHoursMinutes(value: number) : string
// { 
//   var hours = Math.floor(value / 60);  
//   var minutes = value % 60;
//   return hours + ":" + minutes;         
// }


export function remove(arr: number[], item: number) {
    const newArr = [...arr];
    newArr.splice(newArr.findIndex(i => i === item), 1);
    return newArr;
};

export function arraymove(arr: any[], fromIndex: number, toIndex: number) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}


/*export function NewlineText(input : string) {
    const text = input;
    return text.split('\n').map(str => <p>{str}</p>);
}*/