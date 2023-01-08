import React from "react";
import {SearchOutlined} from "@ant-design/icons";

const UserSearch = ({value, onchange}) => {
    return (
        <div className="searchbar">
            <SearchOutlined className="searchbar-icon" />
            <input
                className="search-input searchbar-input"
                onChange={e => onchange(e.currentTarget.value)}
                placeholder="Search..."
                type="text"
                value={value}
                name='query'
            />
        </div>
    );
}

export default UserSearch;