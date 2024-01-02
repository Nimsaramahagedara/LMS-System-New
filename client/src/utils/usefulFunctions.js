//GET TERM DEPNDS ON SYSTEM TIME
export const getTerm = () => {
  const currentMonthIndex = new Date().getMonth();
  // 0-indexed (January is 0, February is 1, ..., December is 11)
  if (currentMonthIndex >= 0 && currentMonthIndex <= 3) {
    return 1;
  } else if (currentMonthIndex >= 4 && currentMonthIndex <= 7) {
    return 2;
  } else if (currentMonthIndex >= 8 && currentMonthIndex <= 11) {
    return 3;
  } else {
    console.error('Invalid month index:', currentMonthIndex);
    return 1;
  }
}

export const countAcademicDays = () => {
  const year = new Date(Date.now()).getFullYear(); // Fixed missing parentheses
  let startDate = new Date(`01-01-${year}`); // Use 'new Date' to create a Date object
  const endDate = new Date(); // Use the current date

  const academicDaysCount = Array
    .from({ length: (endDate - startDate) / (1000 * 3600 * 24) + 1 }) // Added +1 to include the end date
    .reduce((count) => {
      if (startDate.getDay() % 6 !== 0 && startDate.getDay() % 7 !== 0) {
        // Check for weekdays (Monday to Friday)
        count++;
      }
      startDate = new Date(startDate.setDate(startDate.getDate() + 1));
      return count;
    }, 0);

  return academicDaysCount; // Return the result
}