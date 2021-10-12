import Splitter from "./Splitter";


/**
 * Thuis Class deals with all the logic
 * TODO: Get Prime Numbers from the Price(not repeated), Calcuulate the Total
 * TODO: Check if Sum is PRIME
 */
export class controller extends Splitter
{
    //disregrding the duplicates
    
    unique = (value: any, index: number, currV: any) => {
        return currV.indexOf(value) === index;
    }
    
    /*
      *! This Method  Get the prime numbers from the price of Bitcoin
     */
     getPrimeNumbers = (number: any) => {

        let  numberlist = this.toArray(number) //store numbers in Array
         numberlist = numberlist.filter(this.unique)//only unique numbers allowed
         //checking the Primes if PRIME then return a,b,c...
         numberlist = numberlist.filter((data: any) => {
            //taking  0 and 1 as non-Prime numbers 
            if (data === 0 || data === 1) return false;
            //range of numbers
            for (let i = 2; i <= Math.sqrt(data); i++) {
                if (data % i === 0) return false;
            }
            return true;
        })
        return numberlist.join(","); //if a and be are primes then return a,b
    }

    /**
     ** This Method gets the total of Prime  Numbers from the Price
     */
    getTotalCount = (number: any) => {
        
        /**
         * Shorter method is to call the 
         * getPrimeNumbers method and then add them
         * but that will need me to declare variables
         * globally
         */
        
        //getprimenumbers()
        var numberlist = this.toArray(number)
        numberlist = numberlist.filter(this.unique)
        numberlist = numberlist.filter((data: any) => {
            if (data === 0 || data === 1) return false;
            for (let i = 2; i <= Math.sqrt(data); i++) {
                if (data % i === 0) return false;
            }
            return true;
        })

        //adding the two numbers
        let sum = 0;
        for (let i = 0; i < numberlist.length; i++) {
            sum += numberlist[i];

        }

        return sum; //return the sum irregardless whether its PRIME or NOT
    }
    
    //isPrime
    /**
     * This Method now Checks if the Sum of PrimeNumber is a PrimeNumber itself
     */
    getPrimeSume(number: any) {
        
        //getprimenumbers()
         var numberlist = this.toArray(number)
        numberlist = numberlist.filter(this.unique)
        numberlist = numberlist.filter((data: any) => {
            if (data === 0 || data === 1) return false;
            for (let i = 2; i <= Math.sqrt(data); i++) {
                if (data % i === 0) return false;
            }
            return true;
        })

        let sum = 0;
        for (let i = 0; i < numberlist.length; i++) {
            sum += numberlist[i];
           //prime number = 6i-1
            if(sum === (6*i -1))
            {
                //if prime return yes
                return ` YES`;
            }
        }
        //not prime
        return  `NO`;
    }
    /**
     * This method will get data as string format as I am using 
     * "11-01-2021" 
     */
    getdateString = (date: any, type: string) => {

        if (typeof date === "string") {
            date = new Date(date)
        }

        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();
        let year = date.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }

        if (type === 'yeardate') {
            return [year, month, day].join('-');
        } else {
            return [day, month, year].join('-');
        }

    }

}

export default controller
