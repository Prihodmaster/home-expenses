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
import {List, ListItem, Paper} from "@material-ui/core";
import {connect} from "react-redux";
import {addCategory, renameCategory, moveCategory, deleteCategory, addSubcategory, categoriesUpdate, removeFromSub, getUser} from "../../actions/UserActions";
import MenuItem from '@material-ui/core/MenuItem';
import _ from 'lodash';

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
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    nameCategory: {
        margin: "0 0 0 20px",
        display: "inline-block",
        width: "30%",
        minHeight: "25px",
        fontWeight: 'bold',
        wordWrap: 'break-word',
        verticalAlign: "middle"
    },
    Cancel: {
        marginLeft: "450px"
    },
    categoryPaper: {
        width: '100%',
        border: '1px solid #9dd9e0',
        borderRadius: '10px',
    },
    categoryItem: {
        position: 'relative'
    },
    categoryBody: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
    },
    categoryList: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'column',
        padding: '0px 16px 3px 6px',
        position: 'relative'
    },
    modalTextField: {
        width: "75%",
        float: "left"
    },
    modalButton: {
        textAlign: "center",
        padding: "10px 0 0 0"
    },
    nameCatModal: {
        color: "red"
    },
    scrollSub: {
        overflowY: "auto",
        overflowX: "hidden",
        maxHeight: "200px",
        margin: "15px auto"
    },
    noCategories: {
        textAlign: "center",
        fontWeight: 'bold',
        padding: '10px'
    }
});
class Config extends React.Component {
    state = {
        subListToAdd: [],
        openDelete: false,
        openName: false,
        openSubList: false,
        tempID: 0,
        subID: 0,
        name: ""
    };
    componentDidMount = () => {
        if(!localStorage.getItem('token'))  this.props.history.push('/signin');
        this.props.getUser();
        this.props.categoriesUpdate();
    };
    componentWillReceiveProps = nextProps => {
        this.setState({
            subListToAdd: [...nextProps.categories.categories].filter(i => i.parentID==="0" && i.isSub===false)
        });
    };
    getModalStyle = () => {
        const top = 50;
        const left = 50;
        return {
            borderRadius: "25px",
            border: "2px solid #9c27b0",
            width: "350px",
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    };
    getModalStyleSub = () => {
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
    maxLocate = () => {
        let maxLocate = _.orderBy([...this.props.categories.categories], ['location'], ['desc']);
        let locate = maxLocate[0] ? maxLocate[0].location: 0;
        locate +=1;
        return locate
    };
    addCategory = () => {
        let category = {
            userID: this.props.user.user._id,
            location: this.maxLocate(),
            parentID: "0",
            subFromID: "",
            isSub: false,
            name: this.maxLocate()
        };
        this.props.addCategory(category)
    };
    handleOpenDelete = item => {
        this.setState({
            openDelete: true,
            name: item.name,
            tempID: item._id
        });
    };
    handleCloseDelete = () => {
        this.setState({
            openDelete: false
        })
    };
    deleteCategory = () => {
        const { grouped } = this.props.categories;
        let arrSubFromID =[];
        grouped[this.state.tempID] && _.forEach(grouped[this.state.tempID], item => arrSubFromID.push(item.subFromID));
        this.setState({openDelete: false},
            () => this.props.deleteCategory({id: this.state.tempID, arrSub: arrSubFromID})
        )
    };
    handleOpenName = item => {
        const { categories } = this.props.categories;
        let current = _.findIndex(categories, i => i._id === item._id);
        this.setState({
            openName: true,
            name: categories[current].name,
            tempID: item._id
        });
    };
    handleCloseName = () => {
        this.setState({
            openName: false
        })
    };
    renameCat = () => {
        this.setState({openName: false}, () => {
            this.props.renameCategory({name: this.state.name, id: this.state.tempID});
        })
    };
    moveCategory = (item, move) => {
        let temp = [...this.props.categories.grouped[item.parentID]];
        let current = _.findIndex(temp, i => i._id === item._id);
        if(move==="Up"){
            let swap = _.findLastIndex(temp, i => i.parentID===item.parentID, current - 1);
            if(swap < current && swap!== -1) {this.props.moveCategory({current: item, swap: temp[swap]})}
        }
        if(move==="Down"){
            let swap = _.findIndex(temp, i => i.parentID===item.parentID, current + 1);
            if(swap > current && swap!== -1) {this.props.moveCategory({current: item, swap: temp[swap]})}
        }
    };
    handleOpenSub = item => {
        this.setState({
            openSubList: true, tempID: item._id
        })
    };
    handleCloseSub = () => {
        this.setState({
            openSubList: false
        })
    };
    handleChangeCategory = () => e => {
        this.setState({
            subID: e.target.value
        })
    };
    getValueCategoryName = e => {
        this.setState({
            name: e.target.value
        })
    };
    addSubcategory = () => {
        const { tempID, subID, subListToAdd } = this.state;
        let current = _.findIndex(subListToAdd, i => i._id === subID);
        if(subListToAdd.length>0 && current!==-1){
            let sub = {
                userID: this.props.user.user._id,
                location: this.maxLocate(),
                parentID: tempID,
                subFromID: subID,
                isSub: true,
                name: subListToAdd[current].name
            };
            this.props.addSubcategory(sub);
        }
    };
    removeFromSub = item => {
        this.props.removeFromSub(item)
    };
    groupCategories = categories => {
        const { classes } = this.props;
        const { subListToAdd, tempID } = this.state;
        const { grouped } = this.props.categories;
        return categories.sort(function (a, b) {
            if (a.location < b.location) {return -1}
            if (a.location > b.location) {return 1}
            return 0;
        }).map(item => (
            <List key={item._id} className = {classes.categoryList}>
                <ListItem className = {classes.categoryList}>
                    <Paper className={classes.categoryPaper}>
                        <div className={classes.categoryItem}>
                            <span className={classes.nameCategory} onClick={() => this.handleOpenName(item)}>{item.name}</span>
                            <Modal open={this.state.openName} onClose={this.handleCloseName}>
                                <div style={this.getModalStyle()} className={classes.paper}>
                                    <Typography variant="title" id="modal-title">Edit category name</Typography>
                                    <TextField
                                        id="CategoryName"
                                        label="Edit category name"
                                        type="text"
                                        margin="normal"
                                        fullWidth
                                        className={classes.modalTextField}
                                        value={this.state.name}
                                        onChange={this.getValueCategoryName}
                                    />
                                    <Button color="primary" className={classes.reportsButton} onClick={() => this.renameCat()}>SAVE</Button>
                                </div>
                            </Modal>
                            <span>
                            <Button color="info" onClick={() => this.moveCategory(item, "Up")}><ArrowUpward/></Button>
                            <Button color="info" onClick={() => this.moveCategory(item, "Down")}><ArrowDownward/></Button>
                            <Button color="warning" onClick={() => item.parentID==="0" ? this.handleOpenDelete(item): this.removeFromSub(item)}><Cancel/></Button>
                            <Modal open={this.state.openDelete} onClose={this.handleCloseDelete}>
                                <div style={this.getModalStyle()} className={classes.paper}>
                                    <Typography variant="title" id="modal-title">Do you really want to Delete this Category:
                                        <span className={classes.nameCatModal}> {this.state.name} </span>?
                                    </Typography>
                                     <div className={classes.modalButton}>
                                        <Button color="primary" className={classes.reportsButton} onClick={() => this.deleteCategory()}>YES</Button>
                                        <Button color="primary" className={classes.reportsButton} onClick={this.handleCloseDelete}>NO</Button>
                                    </div>

                                </div>
                             </Modal>
                            <Button color="info" onClick={() => this.handleOpenSub(item)}>*</Button>
                            <Modal open={this.state.openSubList} onClose={this.handleCloseSub}>
                                <div style={this.getModalStyleSub()} className={classes.paper}>
                                    <Cancel className={classes.Cancel} onClick={() => this.handleCloseSub()}/>
                                    <Typography variant="title" id="modal-title">Subcategories list</Typography>
                                    {
                                        grouped[tempID] && grouped[tempID].length>0 ?
                                            <div className={classes.scrollSub}>
                                                <List className = {classes.categoryList}>
                                                    {this.groupSub(grouped[tempID])}
                                                </List>
                                            </div>
                                            :
                                            <div className={classes.noCategories}>No subcategories</div>
                                    }
                                    <TextField
                                        id="select-category"
                                        select
                                        label="Category"
                                        className={classes.TextField}
                                        value={this.state.subID}
                                        onChange={this.handleChangeCategory()}
                                        SelectProps={{MenuProps: {className: classes.menu}}}
                                        fullWidth
                                        margin="normal"
                                    >
                                        {
                                            subListToAdd && subListToAdd.map((item, i) => (
                                                <MenuItem key={i} value={item._id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))
                                        }
                                    </TextField>
                                    <Button color="primary" className={classes.reportsButton} onClick={this.addSubcategory}>ADD CATEGORY</Button>
                                </div>
                            </Modal>
                            </span>
                        </div>
                        {grouped[item._id] && this.groupCategories(grouped[item._id])}
                    </Paper>
                </ListItem>
            </List>
        ))
    };
    groupSub = categories => {
        const { classes } = this.props;
        const { grouped } = this.props.categories;
        return categories.sort(function (a, b) {
            if (a.location < b.location) {return -1}
            if (a.location > b.location) {return 1}
            return 0;
        }).map(item => (
            <List key={item._id} className = {classes.categoryList}>
                <ListItem className = {classes.categoryList}>
                    <Paper className={classes.categoryPaper}>
                        <div className={classes.categoryItem}>
                            <span className={classes.nameCategory}>{item.name}</span>
                            <span>
                                <Button color="info" onClick={() => this.moveCategory(item, "Up")}><ArrowUpward/></Button>
                                <Button color="info" onClick={() => this.moveCategory(item, "Down")}><ArrowDownward/></Button>
                                <Button color="warning" onClick={() => this.removeFromSub(item)}><Cancel/></Button>
                            </span>
                        </div>
                        {grouped[item._id] && this.groupSub(grouped[item._id])}
                    </Paper>
                </ListItem>
            </List>
        ))
    };
    render() {
        const { grouped } = this.props.categories;
        const { classes } = this.props;
        return (
            <div>
                <Grid container>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={this.props.cardTitleWhite}>Edit Categories</h4>
                                <p className={this.props.cardCategoryWhite}>Please, config your categories</p>
                            </CardHeader>
                            <CardBody className={classes.categoryBody}>
                                {
                                    grouped[0] && grouped[0].length>0 ?
                                        <List className = {classes.categoryList}>
                                            {this.groupCategories(grouped[0])}
                                        </List>
                                        :
                                        <div className={classes.noCategories}>No categories</div>
                                }
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
    addSubcategory: (sub) => dispatch(addSubcategory(sub)),
    moveCategory: (data) => dispatch(moveCategory(data)),
    deleteCategory: (del) => dispatch(deleteCategory(del)),
    getUser: () => dispatch(getUser()),
    removeFromSub: (sub) => dispatch(removeFromSub(sub))
});
Config.propTypes = {
    classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Config));



