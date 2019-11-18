import { connect } from "react-redux";
import * as Actions from "../../redux/actions";
import MainScreen from "./MainScreen";

const mapStateToProps = state => ({
    units: state.units,
    currLocation: state.currLocation,
    location: state.location,
    mainScreen: state.mainScreen
});

const mapDispatchToProps = dispatch => ({
    updateUnits: newUnits => dispatch(Actions.updateUnitsAction(newUnits)),
    updateCurrLocation: newLocation =>
        dispatch(Actions.updateCurrLocationAction(newLocation)),
    updateLocation: newLocation =>
        dispatch(Actions.updateLocationAction(newLocation)),
    updateWeather: () => dispatch(Actions.fetchNewWeather()),
    updateLoading: value => dispatch(Actions.updateLoadingAction(value)),
    updateForecast: (weather, loading, error, errorMsg) =>
        dispatch(Actions.updateWeatherAction(weather, loading, error, errorMsg))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
