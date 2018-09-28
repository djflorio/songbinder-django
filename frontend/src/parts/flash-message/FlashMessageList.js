// Third party
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import FlashMessage from './FlashMessage';

// Actions
import { deleteFlashMessage } from './FlashMessageActions';


class FlashMessageList extends React.Component {

  render() {
    const messages = this.props.messages.map(message => {
      return (
        <FlashMessage
          key={message.id}
          message={message}
          deleteFlashMessage={this.props.deleteFlashMessage}
        />
      );
    });

    return (
      <div className="flash-message-list">
        {messages}
      </div>
    );
  }

}

FlashMessageList.propTypes = {
  messages: PropTypes.array.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    messages: state.flashMessages
  }
}

export default connect(
  mapStateToProps,
  { deleteFlashMessage }
)(FlashMessageList);