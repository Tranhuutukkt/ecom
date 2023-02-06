import {} from "@/components/common";
import {Redirect, Route} from "react-router-dom";
import React from "react";
import ProfileSideBar from "@/components/common/ProfileSideBar";
import PropType from "prop-types";
import {connect} from "react-redux";

const ProfileRoute = ({isAuth, role, component: Component, ...rest}) => (
    <Route
        {...rest}
        component={(props) => (
            isAuth && role === 'USER' ? (
                <>
                    <main className="content-admin">
                        <ProfileSideBar/>
                        <div className="content-admin-wrapper" style={{paddingTop: "5rem"}}>
                            <Component {...props} />
                        </div>
                    </main>
                </>
            ) : <Redirect to="/" />
        )}
    />
);

const mapStateToProps = ({ auth }) => ({
    isAuth: !!auth,
    role: auth?.role || ''
});

ProfileRoute.defaultProps = {
    isAuth: false,
    role: 'USER'
};

ProfileRoute.propTypes = {
    isAuth: PropType.bool,
    role: PropType.string,
    component: PropType.func.isRequired,
    // eslint-disable-next-line react/require-default-props
    rest: PropType.any
};

export default connect(mapStateToProps)(ProfileRoute);