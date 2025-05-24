// imports
import * as readline from 'readline';

// readline config
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Cria manualmente uma função question que retorna Promise<string>
function question(query: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            resolve(answer);
        });
    });
}

async function main() {
    // user given value
    const answer = await question('Enter a *single* numeric value: ');

    if (/\s|,|;/.test(answer)) {
        console.log('Please enter a unique numeric value, without spaces or separators.');
        rl.close();
        return;
    }

    // saving applicable sets for given value
    const sets: string[] = [];

    // validating and adding sets 
    const stringValue = String(answer).trim();
    const normalizedValue = stringValue.replace(',', '.');
    const numericValue = Number(normalizedValue);

        // consts for validation
            // verify if it is of integer (Z) set
            const isInteger = !normalizedValue.includes('.') && !normalizedValue.includes('/') && Number.isInteger(numericValue);
            
            const isIntegerExcludingZero = isInteger && numericValue !== 0;

            // verify if it is of natural (N) set
            const isNatural = isInteger && numericValue >= 0; 

            // verify if it is of natural without 0 (N*) set
            const isNaturalExcludingZero = isNatural && numericValue !== 0;

            // verify if it is of rational (Q) set (or fraction) 
            const isRational = () => {
                // return if it's not on rational format (a/b)
                if (!stringValue.includes('/')) return false;

                // separating each value (['a', 'b'])
                const separatedValuesList = stringValue.split('/');

                // getting a garantee that it only have's 2 values (a & b)
                if (!(separatedValuesList.length === 2)) return false;

                // separating each of the two values ([a, b])
                const firstValue = Number(separatedValuesList[0].replace(',', '.'));
                const secondValue = Number(separatedValuesList[1].replace(',', '.'));

                // getting a garantee that the two values is number type
                if (
                    isNaN(firstValue) ||
                    isNaN(secondValue) ||
                    secondValue === 0
                ) return false;

                // if all tests passed
                return true;
            }

            // verify if it is of irrational (R\Q) set
            const irrationalNumbersList = [
                'π', 'e', 'φ', '√2', '√3', '√5', '√6', '√7', '√8', '√10', '√11', '√12', 
                '√13', '√14', '√15', '√17', '√18', '√19', '√20', '√21', '√22', '√23', 
                '√24', '√26', '√27', '√28', '√29', '√30', '√31', '√33', '√34', '√35', 
                '√37', '√38', '√39', '√40', 'log₂3', 'log₁₀2', 'logₑ5', 'log₃7', 'log₄9', 
                '2^√2', 'e^π', 'π^e', 'e^√2', '3^√5', 'sin(1)', 'cos(1)', 'tan(1)', 
                'arcsin(1/2)', 'arccos(1/3)', 'γ', 'ζ(3)', 'G', 'K'
            ];

            const isIrrational = irrationalNumbersList.some(item => item === normalizedValue);


            const isFraction = !isIrrational && normalizedValue.includes('.') && !normalizedValue.includes('/');

            // verify if it is of real (R) set
            const isRealNumber = 
                isInteger 
                || isIntegerExcludingZero
                || isNatural
                || isNaturalExcludingZero
                || isRational()
                || isFraction
                || isIrrational;
        
        // saving valid sets for user's input number
            if(isNaturalExcludingZero){ // Natural, Integer, Real
                sets.push('Natural excluding zero');
            };

            if(isNatural){
                sets.push('Natural');
            };

            if(isIntegerExcludingZero){
                sets.push('Integer excluding zero');
            };

            if(isInteger){
                sets.push('Integer');
            };

            if (isIrrational) {
                sets.push("Irrational");
            } else if (isRational()) {
                sets.push("Rational");
                if (stringValue.includes('/')) {
                    sets.push("Fraction");
                } else if (stringValue.includes('.')) {
                    sets.push("Decimal");
                }
            }

            if(isFraction){
                sets.push('Fraction');
            };

            if(isRealNumber){
                sets.push('Real');
            };
        
        const formattedMessage = 
            sets.length === 0 
                ? `${stringValue} is not a valid number!` 
                : `Value ${stringValue} contains the following sets: ${sets.join(', ')}`;

        console.log(formattedMessage);

        rl.close();
}

main();