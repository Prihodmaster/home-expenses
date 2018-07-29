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
import {addCategory, addCategoryName, upCategory, downCategory, deleteCategory, upSubCategory, downSubCategory, addSubcategory} from "../../actions/UserActions";
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
    copyAllsub = [];
    componentWillMount = () => {
        this.copyAllsub = [];
        this.props.categories.categories && this.props.categories.categories.map(item =>{
                if(item.subCategories){this.copysubCategories(item)}
                return this.copyAllsub
            }
        );
        this.setState({copyAll: this.copyAll})
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
    handleOpen = (index) => {
        this.setState({
            open: true,
            indexCategory: index
        });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    handleOpenName = (index) => {
        this.setState({
            openName: true,
            indexCategory: index,
            inputValueCategoryName: this.props.categories.categories[index].name
        });
    };
    handleCloseName = () => {
        this.setState({
            openName: false,
            category: {name: this.state.inputValueCategoryName}
        }, () => {
            categoryName = this.state.inputValueCategoryName;
            indexCategory = this.state.indexCategory;
            this.props.addCategoryName();
        })

    };
    handleOpenSubcategory = (index) => {
        this.setState({
            openSubcategoryList: true,
            indexCategory: index
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
    addCategory = () => {
        this.setState({
            category: {
                date: new Date().toString(),
                name: '',
                description: '',
                valueUAH: '',
                subCategories: []
            }
        }, ()=>{
            category = this.state.category;
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

        indexCategory = this.state.indexCategory;
        this.props.deleteCategory();
        this.setState({open: false, indexCategory: 0});
    };

    moveUpCategory = (index) => {
        this.setState({indexCategory: index}, () => {
            indexCategory = this.state.indexCategory;
            this.props.upCategory();
        })
    };
    moveDownCategory = (index) => {
        this.setState({indexCategory: index}, () => {
            indexCategory = this.state.indexCategory;
            this.props.downCategory();
        })
    };
    // moveUpSubCategory = (index) => {
    //     this.setState({indexSubCategory: index}, () => {
    //         indexCategory = this.state.indexCategory;
    //         indexSubCategory = this.state.indexSubCategory;
    //         this.props.upSubCategory(indexCategory, indexSubCategory);
    //     })
    // };
    // moveDownSubCategory = (index) => {
    //     this.setState({indexSubCategory: index}, () => {
    //         indexCategory = this.state.indexCategory;
    //         indexSubCategory = this.state.indexSubCategory;
    //         this.props.downSubCategory();
    //     })
    // };
    handleChangeCategory = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    nextCubcategory = (item) =>  item.subCategories && item.subCategories.map((item, index) => {
        return (
            <div key={index} className={this.props.classes.itemCubcategory}>
                <span className={this.props.classes.nextCubcategory}>{item.name}</span>
                <span className={this.props.classes.nextCubcategoryButton}>
                    <Button color="info" className={this.props.classes.subCategoryButton}><ArrowUpward/></Button>
                    <Button color="info" className={this.props.classes.subCategoryButton}><ArrowDownward/></Button>

                </span>
                {this.nextCubcategory(item)}
            </div>
        )
    });

    render() {
        const categories = this.props.categories.categories;
        const { classes } = this.props;
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
                                    categories && categories.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <span className={classes.nameCategory} onClick={() => this.handleOpenName(index)}>
                                                    {
                                                        item.name !== "" ? item.name: <span className={classes.nameSpan}></span>
                                                    }
                                                </span>
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
                                                        <Button color="primary" className={classes.reportsButton} onClick={() => this.handleCloseName(index)}>SAVE</Button>
                                                    </div>
                                                </Modal>
                                                <span>
                                                    <Button color="info" onClick={() => this.moveUpCategory(index)}><ArrowUpward/></Button>
                                                    <Button color="info" onClick={() => this.moveDownCategory(index)}><ArrowDownward/></Button>
                                                    <Button color="warning" onClick={() => this.handleOpen(index)}><Cancel/></Button>
                                                    <Modal open={this.state.open} onClose={this.handleClose}>
                                                        <div style={this.getModalStyle()} className={classes.paper}>
                                                            <Typography variant="title" id="modal-title">Do you really want to Delete this Category?</Typography>
                                                            <Button color="primary" className={classes.reportsButton} onClick={() => this.deleteCategory()}>YES</Button>
                                                            <Button color="primary" className={classes.reportsButton} onClick={this.handleClose}>NO</Button>
                                                        </div>
                                                     </Modal>

                                                    <Button color="info" onClick={() => this.handleOpenSubcategory(index)}>*</Button>
                                                </span>
                                                    {
                                                        this.nextCubcategory(item)
                                                    }
                                                <hr />
                                            </div>
                                        )
                                    })
                                }
                                <Modal open={this.state.openSubcategoryList} onClose={this.handleCloseSubcategory}>
                                    <div style={this.getModalStyle()} className={classes.paper}>
                                        <Cancel className={classes.Cancel} onClick={() => this.handleCloseSubcategory()}/>
                                        <Typography variant="title" id="modal-title">Subcategories list</Typography>
                                        {
                                            this.copyAllsub.map((item, index) => {
                                                return (
                                                    <div key={index}>
                                                        <span className={classes.nameCategory}>{item.name}</span>
                                                        <span>
                                                            <Button color="info" className={classes.subCategoryButton}><ArrowUpward/></Button>
                                                            <Button color="info" className={classes.subCategoryButton}><ArrowDownward/></Button>
                                                            <Button color="warning" className={classes.subCategoryButton}><Cancel/></Button>
                                                        </span>
                                                    </div>
                                                )
                                            })

                                        }
                                        <TextField
                                            id="select-subcategory"
                                            select
                                            label="Subcategory"
                                            className={classes.TextField}
                                            value={this.state.subcategories}
                                            onChange={this.handleChangeCategory('subcategories')}
                                            SelectProps={{
                                                MenuProps: {
                                                    className: classes.menu,
                                                },
                                            }}
                                            fullWidth
                                            margin="normal"
                                        >
                                            {this.copyAllsub.map((item, index) => (
                                                <MenuItem key={index} value={item.name}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <Button color="primary" className={classes.reportsButton} onClick={this.addSubcategory}>ADD CATEGORY</Button>
                                    </div>
                                </Modal>
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
    addCategory: (category) => dispatch(addCategory(category)),
    addSubcategory: () => dispatch(addSubcategory(subcategory, indexCategory)),
    addCategoryName: () => dispatch(addCategoryName(categoryName, indexCategory)),
    upCategory: () => dispatch(upCategory(indexCategory)),
    downCategory: () => dispatch(downCategory(indexCategory)),
    deleteCategory: () => dispatch(deleteCategory(indexCategory)),
    upSubCategory: (indexCategory, indexSubCategory) => dispatch(upSubCategory(indexCategory, indexSubCategory)),
    downSubCategory: () => dispatch(downSubCategory(indexCategory, indexSubCategory))
});
Config.propTypes = {
    classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Config));



