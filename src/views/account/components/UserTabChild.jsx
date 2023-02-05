import PropType from 'prop-types';
import React, { useState } from 'react';

const UserTabChild = (props) => {
  const { children} = props;
  const [activeTab, setActiveTab] = useState(children[0].props.index || 0);
  const onClickTabItem = (index) => {
      setActiveTab(index);
  };

  return (
    <div className="user-tab user-tab-child" >
      <div className="user-tab-nav" >
        <ul className="user-tab-menu">
          {children.map((child) => (
              <li
                  key={child.props.label}
                  className={`user-tab-item ${child.props.index === activeTab ? 'user-tab-active' : ''}`}
                  role="presentation"
                  onClick={() => onClickTabItem(child.props.index)}
              >{child.props.label}</li>
          ))}
        </ul>
      </div>
      <div className="user-tab-content">
        {children.map((child) => {
          if (child.props.index !== activeTab) return null;

          return child.props.children;
        })}
      </div>
    </div>
  );
};

UserTabChild.propTypes = {
  children: PropType.oneOfType([
    PropType.arrayOf(PropType.node),
    PropType.node
  ]).isRequired
};

export default UserTabChild;
