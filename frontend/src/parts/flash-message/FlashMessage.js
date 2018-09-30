// Third party
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FontAwesome from '@fortawesome/react-fontawesome';

// Assets
import './FlashMessage.css';


class FlashMessage extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    setTimeout(this.onClick, 4000);
  }

  onClick() {
    this.props.deleteFlashMessage(this.props.message.id);
  }

  render() {
    const { type, text } = this.props.message;
    return (
      <div
        className={classnames('flash-message', {
          'flash-message--success': type === 'success',
          'flash-message--danger': type === 'error'
         }
        )}
        onClick={this.onClick}>
        <FontAwesome
          icon={['fas', 'times']}
          className="flash-message__close"
          onClick={this.onClick}
        />
        {text}
      </div>
    );
  }
}

FlashMessage.propTypes = {
  message: PropTypes.object.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
}

export default FlashMessage;