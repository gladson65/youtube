
export const findDay = (date) => {

    let date1 = new Date();
    let date2 = new Date(date);
    let Difference_In_Time = date1.getTime() - date2.getTime()

    // Calculating the no. of days between two dates
    let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));

    return Difference_In_Days;
}