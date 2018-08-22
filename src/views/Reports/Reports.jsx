/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/TableReports.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import {connect} from "react-redux";
import { expensesUpdate } from "../../actions/UserActions";
import _ from 'lodash';


// _.groupBy(['one', 'two', 'three'], 'length');
// => { '3': ['one', 'two'], '5': ['three'] }


const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 60,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    reportsButton: {
        padding: "10px 10px",
        margin: "20px 0 0 30px"
    },
    container: {
        display: 'inline-block',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    tableCategory: {
        width: '45%'
    },
    tableCategoryFont: {
        fontWeight: 'bold'
    },
    tableCategoryUAH: {
        float: "right"
    },
    tableSumCategory: {
        marginLeft: "20px"
    },
    noExpenses: {
        textAlign: "center",
        fontWeight: 'bold',
        padding: '30px'
    },
    modalField: {
        margin: "0 0 0 50px"
    },
    modalButton: {
        textAlign: "center",
        padding: "10px 0 0 0"
    },
    modalTitle: {
        textAlign: "center",
        padding: "0 0 30px 0"
    },
    modalTitleWarning: {
        color: "red"
    },
    reportsTitle: {
        width: "103%"
    },
});
const Day = 86400000;
const Week = 604800000;
const Month = 2592000000;
// const sortedExpenses = [];
class Reports extends React.Component {
    state = {
        Interval: Day,
        startPeriod: new Date().setHours(0, 0, 0, 1) - Day,
        endPeriod: new Date().setHours(23, 59, 59, 999) + Day,
        open: false,
        sortedExpenses: []
        };
    componentDidMount = () => {
        if(!localStorage.getItem('token'))  this.props.history.push('/signin');
        this.props.expensesUpdate();
    };
    getModalStyle = () => {
        const top = 50;
        const left = 50;
        return {
            borderRadius: "25px",
            border: "2px solid #9c27b0",
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    };
    changePeriod = change => {
        const { startPeriod, endPeriod, Interval } = this.state;
        if(change==="prev"){
            this.setState({startPeriod: startPeriod - Interval, endPeriod: endPeriod - Interval})
        }
        if(change==="next"){
            this.setState({startPeriod: startPeriod + Interval, endPeriod: endPeriod + Interval})
        }
    };
    dayPeriod = () => {this.setState({Interval: Day})};
    weekPeriod = () => {this.setState({Interval: Week})};
    monthPeriod = () => {this.setState({Interval: Month})};
    calendarValuePrev = e => {this.setState({startPeriod: Date.parse(e.target.value)-10799999})};
    calendarValueNext = e => {this.setState({endPeriod: Date.parse(e.target.value)+75599999})};
    handleOpen = () => {this.setState({open: true})};
    handleClose = () => {
        this.state.startPeriod > this.state.endPeriod ? this.setState({
            open: false,
            startPeriod: new Date().setHours(0, 0, 0, 1) - Day,
            endPeriod: new Date().setHours(23, 59, 59, 999) + Day
        }): this.setState({open: false})
    };
    addPeriod = () => {this.state.startPeriod < this.state.endPeriod && this.setState({open: false})};
    createExpList = expenses => {
        let sortedExpenses = [];
        this.sortExpenses(expenses, sortedExpenses);
        _.forEachRight(sortedExpenses, item => {
            _.forEachRight(sortedExpenses, i => {
                if(item.categoryID===i.parentID){item.valueUAH = Number(item.valueUAH) + Number(i.valueUAH)}
            })
        });
        return sortedExpenses.map((i) => {return [i.name, String(i.valueUAH), i.parentID]});
        // return sortedExpenses.map((i) => {
        //     let x = 0;
        //     _.forEachRight(sortedExpenses, item => {if(i.categoryID===item.parentID){x += Number(item.valueUAH)}})
        //     console.log(x)
        //     return [i.name, String(x+Number(i.valueUAH)), i.parentID]
        // });
    };
    sortExpenses = (expenses, sortedExpenses) => {
        const { grouped } = this.props.expenses;
        const { startPeriod, endPeriod } = this.state;
        let uniqArr = _.uniqBy([...expenses.filter(i => i.millisecDate >= startPeriod && i.millisecDate <= endPeriod)].reverse(), "categoryID");
        return uniqArr.length && uniqArr.reduce((groups, expense) => {
            sortedExpenses.push(expense);
            if (grouped[expense.categoryID]) {this.sortExpenses(grouped[expense.categoryID], sortedExpenses)}
        }, {});
    };
    render() {
        const { classes } = this.props;
        const { expenses, grouped } = this.props.expenses;
        console.log("grouped", grouped)
        console.log("this.state", this.state)
        let sortTime = expenses.filter(i => i.millisecDate >= this.state.startPeriod && i.millisecDate <= this.state.endPeriod);
        return (
            <div>
                <Grid container>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="info">
                                <h4 className={classes.cardTitleWhite}>Expenses reports</h4>
                                <p className={classes.cardCategoryWhite}>Here is some expenses reports</p>
                            </CardHeader>
                            <CardBody>
                                <Grid container>
                                    <GridItem xs={4} sm={4} md={4}>
                                        <h4 className={classes.reportsTitle}>{(new Date(this.state.startPeriod)).toString().substring(0, 15)} / {new Date(this.state.endPeriod).toString().substring(0, 15)}</h4>
                                    </GridItem>
                                    <GridItem xs={8} sm={8} md={8}>
                                        <Button color="primary" className={classes.reportsButton} onClick={() => this.changePeriod("prev")}>
                                            <KeyboardArrowLeft/>
                                        </Button>
                                        <Button color="primary" className={classes.reportsButton} onClick={() => this.changePeriod("next")}>
                                            <KeyboardArrowRight/>
                                        </Button>
                                        <Button color="primary" className={classes.reportsButton} onClick={this.dayPeriod}>DAY</Button>
                                        <Button color="primary" className={classes.reportsButton} onClick={this.weekPeriod}>WEEK</Button>
                                        <Button color="primary" className={classes.reportsButton} onClick={this.monthPeriod}>MONTH</Button>
                                        <Button color="primary" className={classes.reportsButton} onClick={this.handleOpen}>PERIOD</Button>
                                        <Modal open={this.state.open} onClose={this.handleClose}>
                                            <div style={this.getModalStyle()} className={classes.paper}>
                                                {
                                                    this.state.startPeriod < this.state.endPeriod ?
                                                        <div className={classes.modalTitle}>
                                                            <Typography variant="title" id="modal-title">Select a date period</Typography>
                                                        </div>
                                                        :
                                                        <div className={classes.modalTitle}>
                                                        <Typography variant="title" id="modal-title">
                                                            <span className={classes.modalTitleWarning}>Incorrect date period</span>
                                                        </Typography>
                                                        </div>
                                                }
                                                <form className={classes.container} noValidate>
                                                    <TextField
                                                        id="date"
                                                        label="from"
                                                        type="date"
                                                        defaultValue={new Date(this.state.startPeriod+10800001).toISOString().substring(0, 10)}
                                                        className={classes.modalField}
                                                        InputLabelProps={{shrink: true,}}
                                                        onChange={this.calendarValuePrev}
                                                    />
                                                </form>
                                                <form className={classes.container} noValidate>
                                                    <TextField
                                                        id="date"
                                                        label="before"
                                                        type="date"
                                                        defaultValue={new Date(this.state.endPeriod).toISOString().substring(0, 10)}
                                                        className={classes.modalField}
                                                        InputLabelProps={{shrink: true,}}
                                                        onChange={this.calendarValueNext}
                                                    />
                                                </form>
                                                <div className={classes.modalButton}>
                                                    <Button color="primary" className={classes.reportsButton} onClick={this.addPeriod}>SELECT PERIOD</Button>
                                                </div>
                                            </div>
                                        </Modal>
                                    </GridItem>
                                </Grid>
                                {
                                    sortTime && sortTime.length>0 && grouped[0] ?
                                    <Table
                                        tableHeaderColor="primary"
                                        tableHead={["Category", "Expenses value, UAH"]}
                                        tableData={grouped[0] && this.createExpList(grouped[0])}
                                        sub={false}
                                    />
                                     :
                                    <div className={classes.noExpenses}>No expenses in this period</div>
                                }
                            </CardBody>
                        </Card>
                    </GridItem>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.userData,
    expenses: state.expensesList
});
const mapDispatchToProps = dispatch => ({
    expensesUpdate: () => dispatch(expensesUpdate())
});
Reports.propTypes = {
    classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Reports));
