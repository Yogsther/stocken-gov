// Copied from GitHub
// https://gist.github.com/IamSilviu/5899269
// Should maybe be moved, lowers cohesion of TaxOverview.
export default function getWeek(today: Date) {
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today.valueOf() - firstDayOfYear.valueOf()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}