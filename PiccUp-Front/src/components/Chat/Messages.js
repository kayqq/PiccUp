import React, { Component } from 'react';
import { tConvert } from '../../helpers';

class Messages extends Component {
    constructor(props) {
        super(props);

        this.scrollDown = this.scrollDown.bind(this);
    }

    scrollDown() {
        const { container } = this.refs;
        container.scrollTop = container.scrollHeight;
    }

    componentDidMount() {
        this.scrollDown();
    }

    componentDidUpdate() {
        this.scrollDown();
    }

    render() {
        const { messages, user, typingUsers } = this.props;
        return (
            <div ref="container" className="thread-container">
                <div className="thread">
                    {messages.map(mes => {
                        return (
                            <div
                                key={mes.id}
                                className={`message-container ${mes.sender ===
                                    user.username && 'right'}`}
                            >
                                <div className="time">{tConvert(mes.time)}</div>
                                <div className="data">
                                    <div className="message">{mes.message}</div>
                                    <div className="name">{mes.sender}</div>
                                </div>
                            </div>
                        );
                    })}
                    {typingUsers &&
                        typingUsers.map(name => {
                            return (
                                <div key={name} className={`message-container`}>
                                    <div className="time">Now</div>
                                    <div className="data">
                                        <div className="message">...</div>
                                        <div className="name">{name}</div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    }
}
export default Messages;
