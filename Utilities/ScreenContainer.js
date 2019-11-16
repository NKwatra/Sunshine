import { connect } from "react-redux";
import * as Actions from "../redux/actions";

const mapStateToProps = state => ({
    units: state.units,
    currLocation: state.currLocation,
    location: state.location
});

const mapDispatchToProps = dispatch => ({
    updateUnits: newUnits => dispatch(Actions.updateUnitsAction(newUnits)),
    updateCurrLocation: newLocation =>
        dispatch(Actions.updateCurrLocationAction(newLocation)),
    updateLocation: newLocaion =>
        dispatch(Actions.updateLocationAction(newLocaion))
});

export default function(screen) {
    return connect(mapStateToProps, mapDispatchToProps)(screen);
}
