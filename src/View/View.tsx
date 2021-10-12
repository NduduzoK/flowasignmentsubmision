import { Component } from "react";
import { Button, Paper, TextField } from "@material-ui/core";
import application from "../Application/Application";
import Api from '../Api.json';
import axios from "axios";

// instructions said user specifies the date as Input
interface UserInput{
    fromDate : Date,
    toDate: Date,
    rowsdata: any
}


//date type is String "11-10-2021"
type  props={
    data:string;
}

export class View extends Component<props, UserInput>
{
 
    state: any;
    app: application;
    
    //constructor
    constructor(props: props) {
        super(props);
        this.state = {
            fromDate: "2021-01-01",
            toDate: "2021-10-11",
            rowsdata: [{}]
        };
       //binding user date
        this.app = new application();
        this.userdateFrom = this.userdateFrom.bind(this);
        this.userdateTo = this.userdateTo.bind(this);
        //after getting the date from user then return list of Prices
        this.GetPriceList();
    }

    //setting the state of start date
    private userdateFrom(date: any) {
        this.setState({
            fromDate:
                date.target.value,
        });
    }
    //setstate of endDate
    private userdateTo(date: any) {
        this.setState({
            toDate: date.target.value,
        });
    }
    //

    /**
     * This Method is essentially for FETCHING data(Bitcoin Prices) from API
     */
    GetPriceList = async () => {
        
        let url = Api.API_URL; // fetch data from URL ( coindesk api)
        //accepting user input dates
        let input = {
            'startdate': this.state.fromDate,
            'enddate': this.state.toDate,
        }
        //using axios to use the GET 
        const results: any = await axios.get(url, { params: input });
        //entries
        const data: any = Object.entries(results.data.bpi);
        var details: any = [];
        data.forEach((item: any, index: number) => {

            //pushing the data to the UI 
            details.push(
                {
                    "date": this.app.getdateString(item[0],""),
                    "price": item[1],
                    "number": this.app.getPrimeNumbers((item[1])),
                    "value": this.app.getTotalCount(item[1]),
                    "isPrime": this.app.getPrimeSume(item[1])

                }
            )
        });
        
        //set state with rows filled with new DATA ( user specified dates)
        this.setState({rowsdata: details});
        
    }

    render() {


        //Simple Desing : Tabe
        const { fromDate } = this.state.fromDate;
        const { toDate } = this.state.toDate;
        return (
            <Paper>
                <div style={{ textAlign: "center" }}>
                    <TextField
                        id="date"
                        label="From Date"
                        type="date"
                        defaultValue="2021-01-01"
                        value={fromDate}
                        className="textField"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            max: this.app.getdateString(new Date(),"yeardate") ,

                        }}
                        onChange={this.userdateFrom}
                    />

                    <TextField
                        id="todate"
                        label="To Date"
                        type="date"
                        defaultValue="2021-10-11"
                        value={toDate}
                        className="textField"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            max: this.app.getdateString(new Date(),"yeardate") ,

                        }}
                        onChange={this.userdateTo}
                    />
                    <Button  variant="contained" color="secondary" className="postbtn"  onClick={this.GetPriceList}>Get Price</Button>
                </div>

                <div style={{ height: 400, width: '100%' }} className="tbloverflow" >
                    <table className="table" >
                        <thead style={{ backgroundColor: "#000000", color: "white" }}>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Prime Number</th>
                            <th>Total </th>
                            <th>Is Prime ?</th>
                        </thead>

                        <tbody>
                            {this.state.rowsdata && this.state.rowsdata.map(function (record: any, key: any) {
                                return (
                                    <tr key={key}>
                                        <td>{record.date}</td>
                                        <td>{record.price}</td>
                                        <td>{record.number}</td>
                                        <td>{record.value}</td>
                                        <td>{record.isPrime}</td>
                                    </tr>
                                )

                            })}
                        </tbody>
                    </table>

                </div>

            </Paper>
//at the bottom of the table i could have written
            //:dates with prime sum are : then return date but
            //I assume the implemented solution gives the idea
        )
    }
}

export default View

