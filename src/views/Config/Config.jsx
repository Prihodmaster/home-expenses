import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Cancel from "@material-ui/icons/Cancel";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import {connect} from "react-redux";
import {addCategory, addCategoryName, upCategory, downCategory, deleteCategory, upSubCategory, downSubCategory, addSubcategory, categoriesUpdate} from "../../actions/UserActions";
import MenuItem from '@material-ui/core/MenuItem';

let category;
let subcategory;
let categoryName;
let indexCategory;
let indexSubCategory;
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
    nameCategory: {
        margin: "0 20px",
        display: "inline-block",
        width: "30%",
        height: "25px",
        fontWeight: 'bold'
    },
    nextCubcategory: {
        width: "24%",
        marginLeft: "40px",
        display: "inline-block"
    },
    nextCubcategoryButton: {
        marginLeft: "25%",
    },
    itemCubcategory: {
        marginLeft: "4%",
    },
    Cancel: {
        marginLeft: "450px"
    },
    subCategoryButton: {
        width: "70px",
        height: "40px"
    },
    nameSpan: {
        width: "70px",
        height: "40px"
    },
});
class Config extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
            groupCategory: {},
            subcategory: [],
            open: false,
            openName: false,
            openSubcategoryList: false,
            indexCategory: 0,
            indexSubCategory: 0,
            inputValueCategoryName: "",
            subcategories: "",
        };
    }
    componentDidMount = () => {
        if(!localStorage.getItem('token'))  this.props.history.push('/signin');
        // setTimeout(() => this.props.categoriesUpdate(), 1000);
        // if(!this.props.categories) this.props.categoriesUpdate()
        this.props.categoriesUpdate()
    };

    // groupedCategories = groupCategories(this.props.categories.categories);
    // groupCategories = function (categories) {
    //     return categories.length && categories.reduce((groupedCategories, category) => {
    //         if (!groupedCategories[category.parentId]) {
    //             groupedCategories[category.parentId] = []
    //         }
    //         groupedCategories[category.parentId].push(category)
    //         return groupedCategories;
    //     }, {});
    // };

    componentWillMount = () => {
        // this.groupCategories();
        this.setState({groupCategory: 1})
    };

    copysubCategories = item => {
        item.subCategories.map((item) => {
            this.copyAllsub.push(item);
            if(item.subCategories){
                this.copysubCategories(item);
            }
        })
    }
    getModalStyle = () => {
        const top = 50;
        const left = 50;
        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    };
    handleOpen = (i) => {
        this.setState({
            open: true,
            indexCategory: i
        });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    handleOpenName = (i) => {
        console.log(i);
        this.setState({
            openName: true,
            indexCategory: i,
            inputValueCategoryName: this.props.categories.categories[i].name
        });
    };
    handleCloseName = () => {
        this.setState({
            openName: false,
            category: {name: this.state.inputValueCategoryName}
        }, () => {
            this.props.addCategoryName(this.state.inputValueCategoryName, this.state.indexCategory);
        })

    };
    handleOpenSubcategory = (i) => {
        this.setState({
            openSubcategoryList: true,
            indexCategory: i
        });
    };
    handleCloseSubcategory = () => {
        this.setState({
            openSubcategoryList: false
        });
    };
    getValueCategoryName = (e) => {
        this.setState({inputValueCategoryName: e.target.value});
    };
    location = 0;
    addCategory = () => {
        this.location += 1;
        this.setState({
            category: {
                userID: this.props.user.user._id,
                location: this.location,
                parentID: 0,
                children: false,
                date: new Date().toString(),
                name: 'пусто',
                description: '',
                valueUAH: 0
            }
        }, ()=>{
            category = this.state.category;
            console.log(category);
            this.props.addCategory(category);
        })
    };
    addSubcategory = () => {
        this.setState({
            subcategory: {name: this.state.subcategories}
        }, ()=>{
            subcategory = this.state.subcategory;
            indexCategory = this.state.indexCategory;
            this.props.addSubcategory();
        })

    };
    deleteCategory = () => {
        this.props.deleteCategory(this.state.indexCategory);
        this.setState({open: false});
    };
    moveUpCategory = (index) => {
        let x = this.props.categories.categories;
        let swap = 0;
        for (let i = 0; i < index; i++) {
            if (x[i].parentID===0) {swap=i}
        }
        this.props.upCategory(index, swap);
    };
    moveDownCategory = (index) => {
        let x = this.props.categories.categories;
        let swap = 0;
        for (let i = x.length-1; i > index; i--) {
            if (x[i].parentID===0) {swap=i}
        }
        this.props.downCategory(index, swap);
    };
    handleChangeCategory = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    moveUpSubcategory = (id, parentID) => {
        let x = this.props.categories.categories;
        let index = 0;
        for (let i = 0; i < x.length; i++) {
            if (x[i].id===id) {index=i}
        }
        let swap = 0;
        for (let i = 0; i < index; i++) {
            if (x[i].parentID===parentID) {swap=i}
        }
        console.log(index, swap);
        this.props.upSubCategory(index, swap);
    };
    sub = (id) => {
        return (
            this.props.categories.categories.filter((item) => item.parentID===id).map((item, i) => {
                return (
                    <div key={i}>
                        <span>{item.name}</span>
                        <span>
                            <Button color="info" className={this.props.classes.subCategoryButton} onClick={() => this.moveUpSubcategory(item.id, item.parentID)}><ArrowUpward/></Button>
                            <Button color="info" className={this.props.classes.subCategoryButton}><ArrowDownward/></Button>
                            <Button color="warning" className={this.props.classes.subCategoryButton}><Cancel/></Button>
                        </span>
                        {this.sub(item.id)}
                    </div>
                )
            })
        )
    };

    render() {
        const categories = this.props.categories.categories;
        const { classes } = this.props;
        console.log(this.props);
        return (
            <div>
                <Grid container>
                    <GridItem xs={10} sm={10} md={10}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={this.props.cardTitleWhite}>Edit Categories</h4>
                                <p className={this.props.cardCategoryWhite}>Please, config your categories</p>
                            </CardHeader>
                            <CardBody>
                                {
                                    categories && categories.map((item, i) => {
                                        if(item.parentID===0){
                                            return (
                                                <div key={i}>
                                                    <span className={classes.nameCategory} onClick={() => this.handleOpenName(i)}>{item.name}</span>
                                                    <Modal open={this.state.openName} onClose={this.handleCloseName}>
                                                        <div style={this.getModalStyle()} className={classes.paper}>
                                                            <Typography variant="title" id="modal-title">Edit category name</Typography>
                                                            <TextField
                                                                id="CategoryName"
                                                                label="Edit category name"
                                                                type="text"
                                                                className={classes.TextField}
                                                                margin="normal"
                                                                fullWidth
                                                                value={this.state.inputValueCategoryName}
                                                                onChange={this.getValueCategoryName}
                                                            />
                                                            <Button color="primary" className={classes.reportsButton} onClick={() => this.handleCloseName()}>SAVE</Button>
                                                        </div>
                                                    </Modal>
                                                    <span>
                                                        <Button color="info" onClick={() => this.moveUpCategory(i)}><ArrowUpward/></Button>
                                                        <Button color="info" onClick={() => this.moveDownCategory(i)}><ArrowDownward/></Button>
                                                        <Button color="warning" onClick={() => this.handleOpen(i)}><Cancel/></Button>
                                                        {/*<Modal open={this.state.open} onClose={this.handleClose}>*/}
                                                            {/*<div style={this.getModalStyle()} className={classes.paper}>*/}
                                                                {/*<Typography variant="title" id="modal-title">Do you really want to Delete this Category?</Typography>*/}
                                                                {/*<Typography variant="title" id="modal-title">{categories[this.state.indexCategory].name}</Typography>*/}
                                                                {/*<Button color="primary" className={classes.reportsButton} onClick={() => this.deleteCategory()}>YES</Button>*/}
                                                                {/*<Button color="primary" className={classes.reportsButton} onClick={this.handleClose}>NO</Button>*/}
                                                            {/*</div>*/}
                                                         {/*</Modal>*/}
                                                    <Button color="info" onClick={() => this.handleOpenSubcategory(i)}>*</Button>
                                                    </span>
                                                    {/*{this.sub(item.id)}*/}
                                                </div>
                                            )
                                        }

                                    })
                                }
                                {/*<Modal open={this.state.openSubcategoryList} onClose={this.handleCloseSubcategory}>*/}
                                    {/*<div style={this.getModalStyle()} className={classes.paper}>*/}
                                        {/*<Cancel className={classes.Cancel} onClick={() => this.handleCloseSubcategory()}/>*/}
                                        {/*<Typography variant="title" id="modal-title">Subcategories list</Typography>*/}
                                        {/*{this.sub(categories[this.state.indexCategory].id)}*/}
                                        {/*<TextField*/}
                                            {/*id="select-subcategory"*/}
                                            {/*select*/}
                                            {/*label="Subcategory"*/}
                                            {/*className={classes.TextField}*/}
                                            {/*value={this.state.subcategories}*/}
                                            {/*onChange={this.handleChangeCategory('subcategories')}*/}
                                            {/*SelectProps={{MenuProps: {className: classes.menu}}}*/}
                                            {/*fullWidth*/}
                                            {/*margin="normal"*/}
                                        {/*>*/}
                                            {/*/!*{this.sub(categories[this.state.indexCategory].id)}*!/*/}
                                        {/*</TextField>*/}
                                        {/*<Button color="primary" className={classes.reportsButton} onClick={this.addSubcategory}>ADD CATEGORY</Button>*/}
                                    {/*</div>*/}
                                {/*</Modal>*/}
                                <Button color="primary" onClick={this.addCategory}>ADD CATEGORY</Button>
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
    categories: state.categoriesList
});
const mapDispatchToProps = dispatch => ({
    categoriesUpdate: () => dispatch(categoriesUpdate()),
    addCategory: (category) => dispatch(addCategory(category)),
    addSubcategory: () => dispatch(addSubcategory(subcategory, indexCategory)),
    addCategoryName: (categoryName, index) => dispatch(addCategoryName(categoryName, index)),
    upCategory: (index, swap) => dispatch(upCategory(index, swap)),
    downCategory: (index, swap) => dispatch(downCategory(index, swap)),
    deleteCategory: (index) => dispatch(deleteCategory(index)),
    upSubCategory: (index, swap) => dispatch(upSubCategory(index, swap)),
    downSubCategory: (index, swap) => dispatch(downSubCategory(index, swap))
});
Config.propTypes = {
    classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Config));



