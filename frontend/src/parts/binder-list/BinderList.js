// Third party
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

// Assets
import './BinderList.css';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

// Components
import { DualRingLoader } from '../loaders/Loaders';
import IconButton from '../icon-button/IconButton';


const BinderList = (props) => {

  const { binders, createBinder, deleteBinder, fetching } = props;

  return (
    <div className="binders">
      <IconButton
        onClick={createBinder}
        icon={faPlus}
        text="New Binder"
      />
      <table className="binders__list">
          <thead className="binders__list-header">
            <tr>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            
          {
            !fetching &&
            binders.map(binder => {
              return (
                <tr key={binder.id} className="binders__item">
                  <td>
                    <Link to={"/binders/" + binder.id} className="binders__view-link">
                      {binder.title === "" ? "Untitled" : binder.title}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={"/binders/edit/" + binder.id}
                      className="binders__button">
                      <FontAwesome icon={faEdit} />
                    </Link>
                    <FontAwesome
                      icon={faTimes}
                      className="binders__button"
                    />
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
        {
          fetching &&
          <div className="binders__loader">
            <span className="binders__loader-text">
              Loading binder list...
            </span>
            <DualRingLoader />
          </div>
        }
    </div>
  );
}

BinderList.propTypes = {
  binders: PropTypes.array.isRequired,
  deleteBinder: PropTypes.func.isRequired,
  createBinder: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired
}

export default BinderList;