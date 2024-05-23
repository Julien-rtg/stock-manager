export class DateService {
  public getCurrentDate() {
    // Create a new Date object to get the current date
    const currentDate = new Date();

    // Get the day, month, and year components
    const day = currentDate.getDate().toString().padStart(2, "0"); // Add leading zero if needed
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = currentDate.getFullYear();

    // Construct the date string in the format "DD-MM-YYYY"
    return `${day}-${month}-${year}`;
  }
}
