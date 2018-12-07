import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';
import selectUp from './images/icons/angle-up-solid.svg';
import selectDown from './images//icons/angle-down-solid.svg';

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOpen: false,
            placeholderOptionEnabled:
                this.props.placeholderOptionEnabled || false,
            placeholder: this.props.placeholder,
            selected: this.props.value || null
        };
    }
    handleClickOutside = () => {
        this.setState({
            listOpen: false
        });
    };

    toggleList = () => {
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }));
    };

    handleSelect = item => {
        const { placeholder } = this.state;
        const onChange = this.props.onChange;
        if (item !== placeholder) {
            this.setState(
                {
                    selected: this.props.value || item,
                    listOpen: false
                },
                () => {
                    if (onChange) {
                        this.props.onChange(item);
                    }
                }
            );
        } else {
            this.setState(
                {
                    selected: this.props.value || placeholder,
                    listOpen: false
                },
                () => {
                    if (onChange) {
                        this.props.onChange(placeholder);
                    }
                }
            );
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.selected) {
            this.setState({
                selected: nextProps.value
            });
        }
    }

    render() {
        const { list } = this.props;
        const {
            listOpen,
            placeholder,
            selected,
            placeholderOptionEnabled
        } = this.state;
        return (
            <div className={`dd-wrapper ${this.props.className}`}>
                <div
                    className={`dd-header ${this.props.headerClassName}`}
                    onClick={() => this.toggleList()}
                >
                    <div className="dd-header-title">
                        {selected ? selected : placeholder}
                    </div>
                    {listOpen ? (
                        <img
                            src={selectUp}
                            alt=""
                            style={{
                                marginLeft: 'auto',
                                marginRight: '10%',
                                height: '20px',
                                alignSelf: 'center'
                            }}
                        />
                    ) : (
                        <img
                            src={selectDown}
                            alt=""
                            style={{
                                marginLeft: 'auto',
                                marginRight: '10%',
                                height: '20px',
                                alignSelf: 'center'
                            }}
                        />
                    )}
                    {/* {listOpen ? (
                        <FontAwesome name="angle-up" size="2x" />
                    ) : (
                        <FontAwesome name="angle-down" size="2x" />
                    )} */}
                </div>
                {listOpen && (
                    <ul className={`dd-list ${this.props.listClassName}`}>
                        {placeholderOptionEnabled && (
                            <li
                                className={`dd-list-item ${
                                    this.props.optionClassName
                                }`}
                                key={placeholder}
                                onClick={() => this.handleSelect(placeholder)}
                            >
                                {placeholder}
                            </li>
                        )}
                        {list.map(item => (
                            <li
                                className={`dd-list-item ${
                                    this.props.optionClassName
                                }`}
                                key={item}
                                onClick={() => this.handleSelect(item)}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
}

export default onClickOutside(Dropdown);
