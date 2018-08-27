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
/* eslint-disable */

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
        margin: "20px 0 0 30px",
    },
    activeButton: {
        padding: "10px 10px",
        margin: "20px 0 0 30px",
        backgroundColor: "#34aab9!important"
    },
    container: {
        display: 'inline-block',
        flexWrap: 'wrap',
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
class Reports extends React.Component {
    state = {
        Interval: Day,
        startPeriod: new Date().setHours(0, 0, 0, 1) - Day,
        endPeriod: new Date().setHours(23, 59, 59, 999) + Day,
        open: false,
        incorrectDate: false,
        sortedExpenses: []
        };
    componentDidMount = () => {
        if(!localStorage.getItem('token'))  this.props.history.push('/signin');
        this.props.expensesUpdate();
    };
    componentWillReceiveProps = nextProps => {
        this.createExpList(nextProps.expenses.grouped[0], nextProps.expenses.grouped);
    }
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
            this.setState({
                startPeriod: startPeriod - Interval,
                endPeriod: endPeriod - Interval
            })
        }
        if(change==="next"){
            this.setState({
                startPeriod: startPeriod + Interval,
                endPeriod: endPeriod + Interval
            })
        }
    };
    dayPeriod = () => {
        this.setState({
            Interval: Day
        })
    };
    weekPeriod = () => {
        this.setState({
            Interval: Week
        })
    };
    monthPeriod = () => {
        this.setState({
            Interval: Month
        })
    };
    calendarValuePrev = e => {
        if(e.target.value!==""){
            this.setState({
                incorrectDate: false,
                startPeriod: Date.parse(e.target.value)-10799999
            })
        }else this.setState({
            incorrectDate: true
        })
    };
    calendarValueNext = e => {
        if(e.target.value!==""){
            this.setState({
                incorrectDate: false,
                endPeriod: Date.parse(e.target.value)+75599999
            })
        }else this.setState({
            incorrectDate: true
        })
    };
    handleOpen = () => {
        this.setState({
            open: true
        })};
    handleClose = () => {
        this.state.startPeriod > this.state.endPeriod ? this.setState({
            open: false,
            startPeriod: new Date().setHours(0, 0, 0, 1) - Day,
            endPeriod: new Date().setHours(23, 59, 59, 999) + Day
        }): this.setState({open: false})
    };
    addPeriod = () => {
        (this.state.startPeriod < this.state.endPeriod && !this.state.incorrectDate) && this.setState({open: false})
    };
    createExpList = (expenses, exp) => {
        let sortedExpenses = [];
        this.sortExpenses(expenses, sortedExpenses, exp);
        let sortCalculate = _.forEachRight(sortedExpenses, item => {
            _.forEachRight(sortedExpenses, i => {
                if(item.categoryID===i.parentID){item.valueUAH = Number(item.valueUAH) + Number(i.valueUAH)}
            })
        }).map((i) => {return [i.name, String(_.round(i.valueUAH, 2)), i.parentID]});
        this.setState({sortedExpenses: sortCalculate})
    };
    sortExpenses = (expenses, sortedExpenses, exp) => {
        const { startPeriod, endPeriod } = this.state;
        let uniqArr = exp!==0 &&_.uniqBy([...expenses.filter(
            i => i.millisecDate >= startPeriod && i.millisecDate <= endPeriod)
        ].reverse(), "categoryID");
        return uniqArr.length && uniqArr.reduce((groups, expense) => {
            sortedExpenses.push(expense);
            if (exp[expense.categoryID]) {
                this.sortExpenses(exp[expense.categoryID], sortedExpenses, exp)
            }
        }, {});
    };
    render() {
        const { startPeriod, endPeriod, incorrectDate } = this.state;
        const { classes } = this.props;
        const { expenses, grouped } = this.props.expenses;
        let sortTime = expenses.filter(
            i => i.millisecDate >= startPeriod && i.millisecDate <= endPeriod
        );
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
                                        <h4 className={classes.reportsTitle}>{(new Date(startPeriod)).toString().substring(0, 15)} / {new Date(endPeriod).toString().substring(0, 15)}</h4>
                                    </GridItem>
                                    <GridItem xs={8} sm={8} md={8}>
                                        <Button color="primary" className={classes.reportsButton} onClick={() => this.changePeriod("prev")}>
                                            <KeyboardArrowLeft/>
                                        </Button>
                                        <Button color="primary" className={classes.reportsButton} onClick={() => this.changePeriod("next")}>
                                            <KeyboardArrowRight/>
                                        </Button>
                                        <Button
                                            color="primary"
                                            className={this.state.Interval===Day ? classes.activeButton : classes.reportsButton}
                                            onClick={this.dayPeriod}
                                        >
                                            DAY
                                        </Button>
                                        <Button
                                            color="primary"
                                            className={this.state.Interval===Week ? classes.activeButton : classes.reportsButton}
                                            onClick={this.weekPeriod}
                                        >
                                            WEEK
                                        </Button>
                                        <Button
                                            color="primary"
                                            className={this.state.Interval===Month ? classes.activeButton : classes.reportsButton}
                                            onClick={this.monthPeriod}
                                        >
                                            MONTH
                                        </Button>
                                        <Button color="primary" className={classes.reportsButton} onClick={this.handleOpen}>PERIOD</Button>
                                        <Modal open={this.state.open} onClose={this.handleClose}>
                                            <div style={this.getModalStyle()} className={classes.paper}>
                                                {
                                                    startPeriod < endPeriod && !incorrectDate ?
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
                                                        id="datefrom"
                                                        label="from"
                                                        type="date"
                                                        defaultValue={new Date(startPeriod+10800001).toISOString().substring(0, 10)}
                                                        className={classes.modalField}
                                                        InputLabelProps={{shrink: true}}
                                                        onChange={this.calendarValuePrev}
                                                    />
                                                </form>
                                                <form className={classes.container} noValidate>
                                                    <TextField
                                                        id="datebefore"
                                                        label="before"
                                                        type="date"
                                                        defaultValue={new Date(endPeriod).toISOString().substring(0, 10)}
                                                        className={classes.modalField}
                                                        InputLabelProps={{shrink: true}}
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
                                        tableData={grouped[0] && this.state.sortedExpenses}
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
