import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import AppIcon from "../images/bacteria.png";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

// REDUX
import { connect } from "react-redux";
import { loginUser, clearUiError } from "../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.spreadThis,
  form: {
    [theme.breakpoints.down("xs")]: {
      padding: "0px 15px",
    },
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
  },
});

export class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",

      errors: {},
    };
  }
  componentWillUnmount() {
    this.props.clearUiError();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.UI.lerrors) {
      return { errors: nextProps.UI.lerrors };
    } else return null;
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData, this.props.history);
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;

    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="virus" className={classes.image} />
          <Typography variant="h2" className={classes.pageTitle}>
            LogIn
          </Typography>

          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />

            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />

            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Login
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progress}
                ></CircularProgress>
              )}
            </Button>
            <br />
            <small>
              Dont have an account? Sign Up <Link to="/signup">Here</Link>{" "}
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});
const mapActionsToProps = {
  loginUser,
  clearUiError,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));
