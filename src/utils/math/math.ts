
const math = (num1: number, num2: number, operator: 'add' | 'subtract' | 'divide') => {
  let result: number | undefined
  switch (operator) {
    case 'add':
      result = num1 + num2
      break;
    case 'subtract':
      result = num1 - num2
      break;
    case 'divide':
      result = num1 / num2
      break;    
  }

  return result
}


export default math