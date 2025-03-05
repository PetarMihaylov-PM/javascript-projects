import { formatCurrency } from "../scripts/utils/money.js";

// basic case
if(formatCurrency(2095) === '20.95'){
  console.log('passed');
} else {
  console.log('failed');
}


//edge cases
if(formatCurrency(0) === '0.00'){
  console.log('passed');
} else {
  console.log('failed');
}

if(formatCurrency(2000.5) === '20.01'){
  console.log('passed');
} else {
  console.log('failed');
}

if(formatCurrency(2000.4) === '20.00'){
  console.log('passed');
} else {
  console.log('failed');
}