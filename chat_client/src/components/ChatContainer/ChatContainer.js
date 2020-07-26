import React, { Component } from 'react';
import '../../styles/ChatContainer.css';
import Message from '../Message/Message';

class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      messHistory: props.messHistory,
      messageCommit: ""
    }
  }

  componentDidMount() {
    this.UpdateScroll();
  }

  UpdateScroll() {
    let element = document.getElementById("msghistory");
    element.scrollTop = element.scrollHeight;
  }

  componentDidUpdate() {
    this.UpdateScroll();
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (this.state.messHistory !== newProps.messHistory) {
      this.setState({ messHistory: newProps.messHistory });
    }
  }

  ChangeMessageCommit(event) {
    this.setState({ messageCommit: event.target.value });
  }

  CommitMessage(event) {
    this.props.commitMessage(this.state.messageCommit);
    this.setState({
      messageCommit: ""
    })
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <h3 className=" text-center">Messaging</h3>
        <div className="messaging">
          <div className="inbox_msg">
            <div className="inbox_people">
              <div className="headind_srch">
                <div className="recent_heading">
                  <h4>Recent</h4>
                </div>
                <div className="srch_bar">
                  <div className="stylish-input-group">
                    <input type="text" className="search-bar" placeholder="Search" />
                    <span className="input-group-addon">
                      <button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                    </span> </div>
                </div>
              </div>

              {/*--- All direct ---*/}
              <div className="inbox_chat">
                <div className="chat_list active_chat">
                  <div className="chat_people">
                    <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                    <div className="chat_ib">
                      <h5>Sunil Rajput <span className="chat_date">Dec 25</span></h5>
                      <p>Test, which is a new approach to have all solutions
                    astrology under one roof.</p>
                    </div>
                  </div>
                </div>
              </div>
              {/*--- End all direct ---*/}

            </div>
            <div className="mesgs">

              {/*--- Mess history ---*/}
              <div className="msg_history" id="msghistory">
                {
                  this.state.messHistory.map((value, index) => {
                    return (
                      <Message
                        isUser={value.username === this.state.username ? true : false}
                        message={value.message}
                        time={value.time}
                        key={value._id}
                        username={value.username}
                      >
                      </Message>
                    );
                  })
                }
              </div>
              {/*--- End mess history ---*/}

              <div className="type_msg">

                {/*--- Mess input field ---*/}
                <div className="input_msg_write">
                  <form>
                    <input type="text" value={this.state.messageCommit} className="write_msg" placeholder="Type a message" onChange={this.ChangeMessageCommit.bind(this)} />
                    <button className="msg_send_btn" type="submit" onClick={(e) => this.CommitMessage(e)}>
                      <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                    </button>
                  </form>
                </div>
                {/*--- End mess input field ---*/}

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatContainer;
