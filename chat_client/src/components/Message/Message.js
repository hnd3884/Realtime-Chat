import React, { Component } from 'react';
import * as Config from '../../Config'

class Message extends Component {
    constructor(props) {
        super(props);
        var date = new Date(this.props.time);
        var dateString = ("0"+date.getHours()).slice(-2) + ":" + ("0"+date.getMinutes()).slice(-2) + " | " + 
            Config.MONTH_NAME[date.getMonth()] + " " + date.getDate()+" "+date.getFullYear();
        this.state = {
            date: dateString
        }
    }
    
    render() {
        if (this.props.isUser) {
            return (
                <div className="outgoing_msg">
                    <div className="sent_msg">
                        <p>{this.props.message}</p>
                        <span className="time_date"> <b>{this.props.username}</b> {this.state.date}</span>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="incoming_msg">
                    <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                    <div className="received_msg">
                        <div className="received_withd_msg">
                            <p>{this.props.message}</p>
                            <span className="time_date"><b>{this.props.username}</b> {this.state.date}</span></div>
                    </div>
                </div>
            );
        }
    }
}

export default Message;