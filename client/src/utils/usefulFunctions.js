//GET TERM DEPNDS ON SYSTEM TIME
export const getTerm =() => {
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