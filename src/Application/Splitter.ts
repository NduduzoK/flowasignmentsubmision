export default  class Splitter {

    /**
     * This Classs with Method : toArray
     * converted the price number into array
     * 
     */
    toArray(number:any)
    {
        if(number.toString().split(".").length > 1){

            number = number.toString().split(".")[0]+number.toString().split(".")[1];
        }
        else
        {
            number = number.toString().split(".")[0];
        }

        return number.split('').map(Number);
    }


}
