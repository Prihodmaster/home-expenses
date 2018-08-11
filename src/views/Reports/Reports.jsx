/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
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
import { categoriesUpdate, expensesUpdate } from "../../actions/UserActions";

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
        margin: "20px 15px",
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
    }
    ,tableSumCategory: {
        marginLeft: "20px"
    }
});
const Day = 86400000;
const Week = 604800000;
const Month = 2592000000;
class Reports extends React.Component {
        state = {
            sortTimeCategory: this.props.expenses.expenses,
            Interval: Day,
            startPeriod: 1534240800000,
            endPeriod: 1533895200000,
            open: false
        };

    componentDidMount = () => {
        if(!localStorage.getItem('token'))  this.props.history.push('/signin');
        this.props.categoriesUpdate();
        this.props.expensesUpdate();
    };
    totalUAH = [];
    componentWillMount = () => {
        // this.totalUAHcategory();
    };
    getModalStyle = () => {
        const top = 50;
        const left = 50;
        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    };
    prevPeriod = () => {
        this.setState({
            startPeriod: this.state.startPeriod - this.state.Interval,
            endPeriod: this.state.endPeriod - this.state.Interval
        }, () => {
            if(this.props.expenses.expenses) {
                let FilteredCategory = this.props.expenses.expenses.filter(item => new Date(item.date).getTime() <= this.state.startPeriod && new Date(item.date).getTime() >= this.state.endPeriod);
                this.setState({
                    sortTimeCategory: FilteredCategory
                })
            }
        });

    };
    nextPeriod = () => {
        this.setState({
            startPeriod: this.state.startPeriod + this.state.Interval,
            endPeriod: this.state.endPeriod + this.state.Interval
        }, () => {
            if(this.props.expenses.expenses){
                let FilteredCategory = this.props.expenses.expenses.filter(item => new Date(item.date).getTime() <= this.state.startPeriod && new Date(item.date).getTime() >= this.state.endPeriod);
                console.log(FilteredCategory)
                this.setState({
                    sortTimeCategory: FilteredCategory
                })
            }

        }
        );
    };
    dayPeriod = () => {this.setState({Interval: Day})};
    weekPeriod = () => {this.setState({Interval: Week})};
    monthPeriod = () => {this.setState({Interval: Month})};
    calendarValuePrev = (e) => {
        this.setState({endPeriod: Date.parse(e.target.value)})
    };
    calendarValueNext = (e) => {
        this.setState({startPeriod: Date.parse(e.target.value)})
    };
    handleOpen = () => {
        this.setState({
            open: true
        });
    };
    handleClose = () => {
        let FilteredCategory = this.props.categories.categories.filter(item => new Date(item.date).getTime() <= this.state.startPeriod && new Date(item.date).getTime() >= this.state.endPeriod);
        this.setState({
            sortTimeCategory: FilteredCategory,
            open: false
        })

    };
    arrayTableData = [];
    UAH = 0;
    totalUAHcategory = () => {
        this.totalUAH = 0;
        this.arrayTableData = [];
        this.state.sortTimeCategory && this.state.sortTimeCategory.map(item =>{
            this.totalUAH = this.totalUAH + item.valueUAH;
            this.arrayTableData.push([item.name, item.valueUAH]);
            if(item.subCategories){this.totalUAHsubCategory(item)}
            return this.totalUAH
            }
        );
    };
    totalUAHsubCategory = item => {
        item.subCategories && item.subCategories.map((item) => {
            this.totalUAH = this.totalUAH + item.valueUAH;
            let UAH = item.valueUAH + item.valueUAH;
            this.arrayTableData.push([item.name, UAH]);
            if(item.subCategories){
                this.totalUAHsubCategory(item);
            }
        })
    };
    nextCubcategory = (item) =>  item.subCategories && item.subCategories.map((item, index) => {
        return (
            <div key={index} className={this.props.classes.tableSumCategory}>
                <span>{item.name}</span>
                <span className={this.props.classes.tableCategoryUAH}>{item.valueUAH}</span>
                {this.nextCubcategory(item)}
            </div>
        )
    });

    render() {
        console.log(this.props);
        console.log(this.state.sortTimeCategory);
        const { classes } = this.props;
        // const { categories } = this.props.categories;
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
                                        <h4>{(new Date(this.state.endPeriod)).toString().substring(0, 15)} / {new Date(this.state.startPeriod).toString().substring(0, 15)}</h4>
                                    </GridItem>
                                    <GridItem xs={8} sm={8} md={8}>
                                        <Button color="primary" className={classes.reportsButton} onClick={this.prevPeriod}>
                                            <KeyboardArrowLeft/>
                                        </Button>
                                        <Button color="primary" className={classes.reportsButton} onClick={this.nextPeriod}>
                                            <KeyboardArrowRight/>
                                        </Button>
                                        <Button color="primary" className={classes.reportsButton} onClick={this.dayPeriod}>DAY</Button>
                                        <Button color="primary" className={classes.reportsButton} onClick={this.weekPeriod}>WEEK</Button>
                                        <Button color="primary" className={classes.reportsButton} onClick={this.monthPeriod}>MONTH</Button>
                                        <Button color="primary" className={classes.reportsButton} onClick={this.handleOpen}>PERIOD</Button>
                                        <Modal

                                            open={this.state.open}
                                            onClose={this.handleClose}
                                        >
                                            <div style={this.getModalStyle()} className={classes.paper}>
                                                <Typography variant="title" id="modal-title">Select a date period</Typography>
                                                <form className={classes.container} noValidate>
                                                    <TextField
                                                        id="date"
                                                        label=""
                                                        type="date"
                                                        defaultValue="2017-05-24"
                                                        className={classes.textField}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        onChange={this.calendarValuePrev}
                                                    />
                                                </form>
                                                <form className={classes.container} noValidate>
                                                    <TextField
                                                        id="date"
                                                        label=""
                                                        type="date"
                                                        defaultValue="2017-05-24"
                                                        className={classes.textField}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        onChange={this.calendarValueNext}
                                                    />
                                                </form>
                                                <Button color="primary" className={classes.reportsButton} onClick={this.handleClose}>PERIOD</Button>
                                            </div>

                                        </Modal>
                                    </GridItem>
                                </Grid>
                                <Table
                                    tableHeaderColor="primary"
                                    tableHead={["Category", "Expenses value,UAH"]}
                                    tableData={[]}
                                />
                                <CardBody>
                                    {
                                        this.state.sortTimeCategory && this.state.sortTimeCategory.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    <div className={classes.tableCategory}>
                                                        <div className={classes.tableCategoryFont}>
                                                            <span className={classes.nameCategory}>{item.name}</span>
                                                            <span className={classes.tableCategoryUAH}>{item.valueUAH}</span>
                                                        </div>
                                                        {this.nextCubcategory(item)}
                                                    </div>
                                                    <hr />
                                                </div>
                                            )
                                        })
                                    }
                                </CardBody>
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
    categories: state.categoriesList,
    expenses: state.expensesList
});
const mapDispatchToProps = dispatch => ({
    categoriesUpdate: () => dispatch(categoriesUpdate()),
    expensesUpdate: () => dispatch(expensesUpdate()),
});
Reports.propTypes = {
    classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Reports));
