import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { postScream, clearErrors } from "../../redux/actions/dataActions";
import { TextField, Button } from "@material-ui/core";

const styles = (theme) => ({
  ...theme.spreadThis,
  iconColor: {
    color: "#ffffff",
  },
  buttonColor: {
    // background:'#e0d3dc'
    "&:hover": {
      background: "#961e3e",
    },
  },
  submitButton: {
    position: "relative",
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    [theme.breakpoints.down("xs")]: {
      left: "83%",
      top: "3%",
      position: "absolute",
    },
    position: "absolute",
    left: "90%",
    top: "10%",
  },
});

class PostScream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      finished: false,
      body: "",
      errors: {},
    };
  }

  // componentWillReceiveProps(nextProps){
  //     if(nextProps.UI.errors){
  //         this.setState({
  //             errors:nextProps.UI.errors
  //         })
  //     }
  //     if(!nextProps.UI.errors && !nextProps.UI.loading){
  //         this.setState({body:'',open:false,errors:{}});

  //     }
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.UI.errors) {
      return { errors: nextProps.UI.errors };
    }

    if (!nextProps.UI.errors && !nextProps.UI.loading) {
     
      if (prevState.open === true && prevState.finished === false) {
        return { open: true, errors: {} };
      }
      if (prevState.open === true && prevState.finished === true) {
        return { open: false, errors: {} };
      }
      return { errors: {} };
    } else return null;
  }

  handleOpen = () => {
    this.setState({ open: true, finished: false });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postScream({ body: this.state.body });
    this.setState({
      body: "",
      finished: true,
    });
  };

  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Create Scream"
          btnClassName={classes.buttonColor}
          onClick={this.handleOpen}
        >
          <AddIcon className={classes.iconColor} />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Post a New Scream</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="Scream!"
                multiline
                rows="3"
                placeholder="Post a new Scream"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="container"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { postScream, clearErrors })(
  withStyles(styles)(PostScream)
);
