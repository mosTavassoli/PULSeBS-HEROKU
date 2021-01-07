import React from "react";
import {
  Button,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";

const theme = createMuiTheme({
  typography: {
    fontSize: 13,
  },
});

const options = [
  { title: "PDF", value: "pdf" },
  { title: "CSV", value: "csv" },
];

class PositiveStudentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      value: "",
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ modal: !this.state.modal });
  }
  changeHandler = async (e, newValue) => {
    if (newValue !== null) {
      console.log(newValue.value);
      await this.setState({
        value: newValue,
      });
    } else {
      await this.setState({
        value: "",
      });
    }
  };

  render() {
    const student = this.props.positiveSTD;
    return (
      <div>
        <Modal toggle={this.props.toggleModal} isOpen={this.props.isModalOpen}>
          <ModalHeader toggle={this.props.toggleModal}>
            <Typography variant="h4">
              Detail of Positive Student to Report
            </Typography>
          </ModalHeader>
          <ModalBody>
            <ThemeProvider theme={theme}>
              <Grid alignItems="center" justify="center" wrap="nowrap">
                <Grid container xs={12}>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={2}>
                    <Typography htmlFor="date">Student ID: </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography id="date">{student.userId}</Typography>
                  </Grid>
                  <Grid item xs={6}></Grid>
                </Grid>
                <Grid container xs={12}>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={2}>
                    <Typography htmlFor="date">Firstname: </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography id="date">{student.firstname}</Typography>
                  </Grid>
                  <Grid item xs={6}></Grid>
                </Grid>
                <Grid container xs={12}>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={2}>
                    <Typography htmlFor="date">Lastname: </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography id="date">{student.lastname}</Typography>
                  </Grid>
                  <Grid item xs={6}></Grid>
                </Grid>
              </Grid>
              {student.birthday ? (
                <Grid container xs={12}>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={2}>
                    <Typography htmlFor="date">Birthday: </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography id="date">{student.birthday}</Typography>
                  </Grid>
                  <Grid item xs={6}></Grid>
                </Grid>
              ) : (
                <></>
              )}

              {student.SSN ? (
                <Grid container xs={12}>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={2}>
                    <Typography htmlFor="date">SSN:</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography id="date">{student.SSN}</Typography>
                  </Grid>
                  <Grid item xs={6}></Grid>
                </Grid>
              ) : (
                <></>
              )}
              <Grid container xs={12}>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}>
                  <Typography htmlFor="date">Email: </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography id="date">{student.email}</Typography>
                </Grid>
                <Grid item xs={6}></Grid>
              </Grid>
              <Grid style={{ marginTop: "30px" }} container xs={12}>
                <Grid item xs={2}></Grid>
                <Grid xs={10} item>
                  <Typography id="date">
                    Select the filte types to generate the report
                  </Typography>
                </Grid>
              </Grid>
              <Grid container xs={12}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                  <Autocomplete
                    value={this.state.value}
                    onChange={(e, newValue) => this.changeHandler(e, newValue)}
                    id="combo-box-demo"
                    options={options}
                    getOptionLabel={(option) => (option ? option.title : "")}
                    renderInput={(params) => (
                      <TextField {...params} label="Type of file" />
                    )}
                  />
                </Grid>
              </Grid>
            </ThemeProvider>
          </ModalBody>
          <ModalFooter>
            <Grid alignItems="center" justify="center" container xs={12}>
              <Button
                disabled={!this.state.value}
                variant="contained"
                color="secondary"
                onClick={this.props.toggleModal}
              >
                Generate
              </Button>
              <Grid item xs={2}></Grid>
              <Button
                variant="outlined"
                color="secondary"
                onClick={this.props.toggleModal}
              >
                Cancel
              </Button>
            </Grid>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default PositiveStudentModal;
