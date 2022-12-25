import React from 'react';
import classes from './UserSearchItem.module.css';
import stockImage from '../assets/sample-account-image.png';

const UserSearchItem = (props) => {
  return (
    <div
      onClick={() => props.selectUser(props.user)}
      className={classes.search_results_item}
    >
      <img
        src={props.user.photoURL || stockImage}
        referrerPolicy="no-referrer"
      />
      <p>{props.user.displayName}</p>
    </div>
  );
};

export default UserSearchItem;
