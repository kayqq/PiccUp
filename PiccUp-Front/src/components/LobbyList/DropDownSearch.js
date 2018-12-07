import React from 'react';
import onClickOutside from 'react-onclickoutside';

class DropDownSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            location: '',
            listOpen: false
        };
    }

    componentDidMount() {
        this.setState({ location: this.props.location });
    }

    handleSearchChange = event => {
        this.setState({ searchTerm: event.target.value });
        this.props.fetchYelpBusinesses(event.target.value, this.state.location);
    };

    handleLocationChange = event => {
        this.setState({ location: event.target.value });
        this.props.fetchYelpBusinesses(
            this.state.searchTerm,
            event.target.value
        );
    };

    handleLocationSelect = (e, location) => {
        this.props.handleLocationSelect(location);
        this.setState({ listOpen: false });
    };

    handleSearchFocus = () => {
        this.setState({ listOpen: true });
    };

    handleLocationFocus = () => {
        this.setState({ listOpen: false });
    };

    handleClickOutside = () => {
        this.setState({ listOpen: false });
    };

    renderYelpSearchItem = item => {
        return (
            <li
                className="dds-item"
                key={item.id}
                onClick={e => this.handleLocationSelect(e, item)}
            >
                <div
                    className="dds-item-img"
                    style={{
                        backgroundImage: `url(${item.image_url})`
                    }}
                >
                    {/* <img
                        src={
                            item.image_url
                        }
                        alt={item.name}
                    /> */}
                </div>
                <div className="dds-item-details">
                    <div className="dds-item-info">
                        <div className="dds-item-name">{item.name}</div>
                        <div className="dds-item-address">
                            {item.location.address1}, {item.location.city},
                            {item.location.state}
                        </div>
                    </div>
                </div>
            </li>
        );
    };

    render() {
        return (
            <div className="dds-wrapper">
                <div className="dds-search">
                    <div className="dds-search-bar">
                        <div className="dds-search-label">Find:</div>
                        <input
                            className="dds-search-input"
                            name="searchTerm"
                            type="search"
                            value={this.state.searchTerm}
                            onChange={this.handleSearchChange}
                            onFocus={this.handleSearchFocus}
                            autoComplete="off"
                        />
                    </div>
                    <div className="dds-list-container">
                        {this.props.yelpSearchResults &&
                            this.state.listOpen && (
                                <ul className="dds-list-thread">
                                    {this.props.yelpSearchResults &&
                                        this.props.yelpSearchResults.map(item =>
                                            this.renderYelpSearchItem(item)
                                        )}
                                </ul>
                            )}
                    </div>
                </div>

                <div className="dds-location">
                    <div className="dds-location-bar">
                        <div className="dds-location-label">Near:</div>
                        <input
                            className="dds-location-input"
                            name="location"
                            type="search"
                            value={this.state.location}
                            onChange={this.handleLocationChange}
                            onFocus={this.handleLocationFocus}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
export default onClickOutside(DropDownSearch);
