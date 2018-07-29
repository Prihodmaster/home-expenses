import React from "react";
import Button from "components/CustomButtons/Button.jsx";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Cancel from "@material-ui/icons/Cancel";
// import withStyles from "@material-ui/core/styles/withStyles";

const GroupConfigButton = (props)=>{

         console.log(props);
        return (

            <div>
                <Button color="info"><ArrowUpward/></Button>
                <Button color="info"><ArrowDownward/></Button>
                <Button color="warning"><Cancel/></Button>
            </div>
        )

}

export default GroupConfigButton;