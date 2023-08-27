"use strict"
function solveEquation(a, b, c) {
  let d = Math.pow(b, 2) - 4 * a * c;
  if (d < 0) {
    return [];
  } else if (d === 0) {
    let x = -b/(2*a);
    return [x];
  } else {
    let x1 = (-b + Math.sqrt(d) )/(2*a);
    let x2 = (-b - Math.sqrt(d) )/(2*a)
    return [x1, x2];
  }
}

function calculateTotalMortgage(percent, contribution, amount, countMonths) {
  if (isNaN(parseFloat(percent)) || isNaN(parseFloat(contribution)) || isNaN(parseFloat(amount)) || isNaN(parseFloat(countMonths))) {
    return false;
  }

  percent = percent / 100;
  percent = percent / 12;

  const creditBody = amount - contribution;

  const monthPayment = creditBody * (percent + percent / ((1 + percent)**countMonths - 1));

  const totalAmount = monthPayment * countMonths;

  const roundedTotalAmount = Math.round(totalAmount * 100) / 100;

  return roundedTotalAmount;
}