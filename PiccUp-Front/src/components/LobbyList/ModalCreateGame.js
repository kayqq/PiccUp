import React, { Component } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import _ from 'lodash';
import 'react-datepicker/dist/react-datepicker.css';
import DropDownSearch from './DropDownSearch';

import { CREATE_GAME } from '../../Events';
class ModalCreateGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchLocation: '',
            gameType: '',
            teams: '',
            startDate: null,
            selectedLocation: '',
            description: '',
            formErrors: {
                gameType: false,
                teams: false,
                startDate: false,
                selectedLocation: false
            },
            formValid: false
        };
    }

    componentDidMount() {
        this.setState({
            searchLocation: `${this.props.user.city}, ${this.props.user.state}`
        });
    }

    handleDateChange = date => {
        this.setState({ startDate: date }, () => {
            this.validateField('startDate', date);
        });
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    };

    handleLocationSelect = location => {
        this.setState({ selectedLocation: location }, () => {
            this.validateField('selectedLocation', location);
        });
    };

    handleCreateGame = event => {
        event.preventDefault();
        const {
            gameType,
            teams,
            startDate,
            selectedLocation,
            description
        } = this.state;
        const { user, socket } = this.props;
        socket.emit(
            CREATE_GAME,
            gameType,
            teams,
            startDate,
            selectedLocation,
            description,
            user.username
        );
        this.props.closeModal();
    };

    validateField = (fieldName, value) => {
        let formErrors = this.state.formErrors;
        switch (fieldName) {
            case 'gameType':
                let gameTypeValid = value.length > 0;
                formErrors.gameType = gameTypeValid;
                break;
            case 'teams':
                let teamsValid = value.length > 0;
                formErrors.teams = teamsValid;
                break;
            case 'startDate':
                let startDateValid = value !== null;
                formErrors.startDate = startDateValid;
                break;
            case 'selectedLocation':
                let selectedLocationValid = !_.isEmpty(value); // true
                formErrors.selectedLocation = selectedLocationValid;
                break;
            default:
                break;
        }
        this.setState(
            {
                formErrors: formErrors
            },
            this.validateForm
        );
    };

    validateForm = () => {
        const { formErrors } = this.state;
        this.setState({
            formValid:
                formErrors.gameType &&
                formErrors.teams &&
                formErrors.startDate &&
                formErrors.selectedLocation
        });
    };

    render() {
        const { selectedLocation } = this.state;
        const { modalIsOpen } = this.props;
        const yelpSearch = _.debounce((searchTerm, location) => {
            this.props.fetchYelpBusinesses(searchTerm, location);
        }, 300);
        return (
            <Modal
                className="Modal"
                overlayClassName="Overlay Overlay-CG"
                isOpen={modalIsOpen}
                onRequestClose={this.props.closeModal}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <form className="CreateGame" onSubmit={this.handleCreateGame}>
                    <div className="cg-item-title">
                        <span>
                            <h2>Create Game</h2>
                        </span>
                    </div>
                    <hr />

                    <div className="cg-item">
                        <div className="cg-item-title">
                            <span>Game Type</span>
                        </div>
                        <div className="cg-item-content">
                            <label className="cg-input-container">
                                <div className="cg-input-content">
                                    <select
                                        name="gameType"
                                        className="cg-input"
                                        value={this.state.gameType}
                                        onChange={this.handleInputChange}
                                        required
                                    >
                                        <option value="" defaultValue disabled>
                                            Choose a game
                                        </option>
                                        <option value="Basketball">
                                            Basketball
                                        </option>

                                        {/* <option value="Badminton">
                                            Badminton
                                        </option>
                                        <option value="Catan">Catan</option>
                                        <option value="Sequence">
                                            Sequence
                                        </option>
                                        <option value="Soccer">Soccer</option> */}
                                    </select>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="cg-item">
                        <div className="cg-item-title">
                            <span>Teams</span>
                        </div>
                        <div className="cg-item-content">
                            <label className="cg-input-container">
                                <div className="cg-input-content">
                                    <select
                                        name="teams"
                                        className="cg-input"
                                        value={this.state.teams}
                                        onChange={this.handleInputChange}
                                        required
                                    >
                                        <option
                                            value=""
                                            defaultValue
                                            // hidden
                                            disabled
                                        >
                                            Choose a team setting
                                        </option>
                                        <option value="2v2">2v2</option>
                                        <option value="3v3">3v3</option>
                                        <option value="4v4">4v4</option>
                                        <option value="5v5">5v5</option>
                                        <option value="6v6">6v6</option>
                                    </select>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="cg-item">
                        <div className="cg-item-title">
                            <span>Event Date</span>
                        </div>
                        <div className="cg-item-content">
                            <label
                                onClick={e => e.preventDefault()}
                                className="cg-input-container"
                            >
                                <div className="cg-input-content">
                                    <DatePicker
                                        onSelect={() =>
                                            console.log(this.state.startDate)
                                        }
                                        required
                                        className="cg-input"
                                        selected={this.state.startDate}
                                        onChange={this.handleDateChange}
                                        placeholderText="Click to select a date"
                                        showTimeSelect
                                        timeFormat="hh:mm a"
                                        timeIntervals={15}
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        timeCaption="time"
                                    />
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="cg-item">
                        <div className="cg-item-title">
                            <span>Location</span>
                        </div>
                        <div className="cg-item-content">
                            <div className="cg-input-container cg-dds">
                                <div className="cg-input-content">
                                    <DropDownSearch
                                        className="cg-input"
                                        fetchYelpBusinesses={yelpSearch}
                                        location={this.state.searchLocation}
                                        yelpSearchResults={
                                            this.props.yelpSearchResults
                                        }
                                        handleLocationSelect={
                                            this.handleLocationSelect
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="cg-item-content">
                            <div className="location-display">
                                <div
                                    className="ld-img"
                                    style={{
                                        backgroundImage: `url(${
                                            selectedLocation.image_url
                                            // ? selectedLocation.image_url
                                            // : null
                                        })`
                                    }}
                                />

                                <div className="ld-details">
                                    <div className="ld-info">
                                        <div className="ld-name">
                                            {selectedLocation.name
                                                ? selectedLocation.name
                                                : null}
                                        </div>
                                        <div className="ld-address">
                                            {selectedLocation
                                                ? `${
                                                      selectedLocation.location
                                                          .address1
                                                  }, ${
                                                      selectedLocation.location
                                                          .city
                                                  }, ${
                                                      selectedLocation.location
                                                          .state
                                                  }`
                                                : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="cg-item">
                        <div className="cg-item-title">
                            <span>Description (Optional)</span>
                        </div>
                        <div className="cg-item-content">
                            <div className="cg-input-content">
                                <div className="cg-input description-wrapper">
                                    <textarea
                                        name="description"
                                        className="cg-input-textarea"
                                        value={this.state.description}
                                        onChange={this.handleInputChange}
                                    />
                                    <div className="cg-input-textareacount">
                                        {this.state.description.length}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="cg-item">
                        <div className="cg-button-group">
                            <button
                                disabled={!this.state.formValid}
                                className="btn btn-cg"
                                type="submit"
                            >
                                Create
                            </button>
                            <button
                                className="btn btn-cg btn-cancel"
                                onClick={this.props.closeModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
        );
    }
}

export default ModalCreateGame;
