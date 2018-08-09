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
import {addCategory, renameCategory, moveCategory, deleteCategory, upSubCategory, downSubCategory, addSubcategory, categoriesUpdate} from "../../actions/UserActions";
import MenuItem from '@material-ui/core/MenuItem';
import _ from 'lodash';

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
    state = {
        category: [],
        groupCategory: {},
        subcategory: [],
        openDelete: false,
        openName: false,
        openSubcategoryList: false,
        indexCategory: 0,
        tempID: 0,
        indexSubCategory: 0,
        inputValueCategoryName: "",
        subcategories: "",
    };

    componentDidMount = () => {
        if(!localStorage.getItem('token'))  this.props.history.push('/signin');
        this.props.categoriesUpdate();
    };
    componentWillMount = () => {
        // this.groupCategories();

        this.setState({groupCategory: 1})
    };
    // componentDidUpdate = () => {
    //
    // };

    // grouped = this.groupCategories(this.props.categories.categories);
    // groupCategories = categories => {
    //     return categories.length && categories.reduce((grouped, category) => {
    //         if (!grouped[category.parentId]) {grouped[category.parentId] = []}
    //         grouped[category.parentId].push(category)
    //         return grouped;
    //     }, {});
    // };

    getModalStyle = () => {
        const top = 50;
        const left = 50;
        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    };
    addCategory = () => {
        let maxLocate = this.props.categories.categories.sort((a, b) => {
            if ((a.parentID===0 && a.location) > (b.parentID===0 && b.location)) {return -1}
            if ((a.parentID===0 && a.location) < (b.parentID===0 && b.location)) {return 1}
            return 0;
        });
        let locate = maxLocate[0] ? maxLocate[0].location: 0;
        locate +=1;
        this.setState({
            category: {
                userID: this.props.user.user._id,
                location: locate,
                parentID: 0,
                children: false,
                name: locate
            }
        }, ()=>{this.props.addCategory(this.state.category)})
    };
    handleOpenDelete = id => {
        this.setState({
            openDelete: true,
            tempID: id
        });
    };
    handleCloseDelete = () => {
        this.setState({ openDelete: false });
    };
    deleteCategory = () => {
        this.setState({openDelete: false}, () => {
            this.props.deleteCategory({id: this.state.tempID});
        })
    };
    handleOpenName = (id, i) => {
        this.setState({
            openName: true,
            inputValueCategoryName: this.props.categories.categories[i].name,
            tempID: id
        });
    };
    handleCloseName = () => {
        this.setState({openName: false})
    };
    renameCat =() => {
        this.setState({openName: false}, () => {
            let rename = {
                name: this.state.inputValueCategoryName,
                id: this.state.tempID
            };
            this.props.renameCategory(rename);
        })
    };
    moveUpCategory = (item) => {
        let current = _.findIndex(this.props.categories.categories, i => i._id == item._id);
        let swap = _.findLastIndex(this.props.categories.categories, i => i.parentID===0, current - 1);
        if(current!==0) {
            this.props.moveCategory({current: item, swap: this.props.categories.categories[swap]})
        }
    };
    moveDownCategory = (item) => {
        let current = _.findIndex(this.props.categories.categories, i => i._id == item._id);
        let swap = _.findIndex(this.props.categories.categories, i => i.parentID===0, current + 1);
        if(current!==this.props.categories.categories.length-1) {
            this.props.moveCategory({current: item, swap: this.props.categories.categories[swap]})
        }
    };

    copysubCategories = item => {
        item.subCategories.map((item) => {
            this.copyAllsub.push(item);
            if(item.subCategories){
                this.copysubCategories(item);
            }
        })
    }
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
    addSubcategory = () => {
        this.setState({
            subcategory: {name: this.state.subcategories}
        }, ()=>{
            subcategory = this.state.subcategory;
            indexCategory = this.state.indexCategory;
            this.props.addSubcategory();
        })

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
                                    categories && categories.sort(function (a, b) {
                                        if (a.location < b.location) {return -1}
                                        if (a.location > b.location) {return 1}
                                        return 0;
                                    }).map((item, i) => {
                                        if(item.parentID===0){
                                            return (
                                                <div key={i}>
                                                    <span className={classes.nameCategory} onClick={() => this.handleOpenName(item._id, i)}>{item.name}</span>
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
                                                            <Button color="primary" className={classes.reportsButton} onClick={() => this.renameCat()}>SAVE</Button>
                                                        </div>
                                                    </Modal>
                                                    <span>
                                                        <Button color="info" onClick={() => this.moveUpCategory(item)}><ArrowUpward/></Button>
                                                        <Button color="info" onClick={() => this.moveDownCategory(item)}><ArrowDownward/></Button>
                                                        <Button color="warning" onClick={() => this.handleOpenDelete(item._id)}><Cancel/></Button>
                                                        <Modal open={this.state.openDelete} onClose={this.handleCloseDelete}>
                                                            <div style={this.getModalStyle()} className={classes.paper}>
                                                                <Typography variant="title" id="modal-title">Do you really want to Delete this Category?</Typography>
                                                                <Typography variant="title" id="modal-title">{categories[this.state.indexCategory] && categories[this.state.indexCategory].name}</Typography>
                                                                <Button color="primary" className={classes.reportsButton} onClick={() => this.deleteCategory()}>YES</Button>
                                                                <Button color="primary" className={classes.reportsButton} onClick={this.handleCloseDelete}>NO</Button>
                                                            </div>
                                                         </Modal>
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
    renameCategory: (rename) => dispatch(renameCategory(rename)),
    addSubcategory: () => dispatch(addSubcategory(subcategory, indexCategory)),
    moveCategory: (data) => dispatch(moveCategory(data)),
    deleteCategory: (del) => dispatch(deleteCategory(del)),
    upSubCategory: (index, swap) => dispatch(upSubCategory(index, swap)),
    downSubCategory: (index, swap) => dispatch(downSubCategory(index, swap))
});
Config.propTypes = {
    classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Config));



