import { connect } from "react-redux";
import DetailScreen from "./DetailScreen";

const mapStateToProp = state => ({
    units: state.units
});

export default connect(mapStateToProp)(DetailScreen);
