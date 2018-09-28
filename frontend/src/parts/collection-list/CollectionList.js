// Third party
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

// Assets
import './CollectionList.css';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

// Components
import { DualRingLoader } from '../loaders/Loaders';
import IconButton from '../icon-button/IconButton';


const CollectionList = (props) => {

  const { collections, createCollection, deleteCollection, fetching } = props;

  return (
    <div className="collections">
      <IconButton
        onClick={createCollection}
        icon={faPlus}
        text="New Collection"
      />
      <table className="collections__list">
          <thead className="collections__list-header">
            <tr>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            
          {
            !fetching &&
            collections.map(collection => {
              return (
                <tr key={collection.id} className="collections__item">
                  <td>
                    <Link to={"/collections/" + collection.id} className="collections__view-link">
                      {collection.title === "" ? "Untitled" : collection.title}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={"/collections/edit/" + collection.id}
                      className="collections__button">
                      <FontAwesome icon={faEdit} />
                    </Link>
                    <FontAwesome
                      icon={faTimes}
                      className="collections__button"
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
          <div className="collections__loader">
            <span className="collections__loader-text">
              Loading collection list...
            </span>
            <DualRingLoader />
          </div>
        }
    </div>
  );
}

CollectionList.propTypes = {
  collections: PropTypes.array.isRequired,
  deleteCollection: PropTypes.func.isRequired,
  createCollection: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired
}

export default CollectionList;