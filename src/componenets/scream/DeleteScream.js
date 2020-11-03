import React, { Component, Fragment } from 'react';
import MyButton from '../../util/MyButton';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import {connect} from 'react-redux';
import {deleteScream} from '../../redux/actions/dataActions';
import { withStyles } from '@material-ui/core';



const styles =(theme)=> ({
    deleteButton:{
        [theme.breakpoints.down('xs')]: {
        left:'87%',
        top:'10%',
        position:'absolute'
          },
        left:'90%',
        top:'10%',
        position:'absolute'
    }
});


class DeleteScream extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false
        };  
    }

    handleOpen =()=>{
        this.setState({open:true});
    }
    handleClose =()=>{
        this.setState({open:false});
    }
    deleteScream =()=>{
        this.props.deleteScream(this.props.screamId);
        this.setState({open:false});
    }




    render() {
        const {classes} = this.props;
     



        return (
            <Fragment>
                <MyButton tip='Delete' onClick={this.handleOpen} btnClassName={classes.deleteButton}>
                    <DeleteOutline color='secondary'></DeleteOutline>
                </MyButton>

                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>
                    <DialogTitle>Do You Want To Delete This Message</DialogTitle>
                    <DialogActions>
                       <Button onClick={this.handleClose} color='primary'>Cancel</Button>
                       <Button onClick={this.deleteScream} color='secondary'>Delete</Button>
                    </DialogActions>
                </Dialog>

            </Fragment>
        )
    }
}

DeleteScream.propTypes = {
    deleteScream: PropTypes.func.isRequired,
    classes:PropTypes.object.isRequired,
    screamId:PropTypes.string.isRequired
}


export default connect(null,{deleteScream}) (withStyles(styles) (DeleteScream));
