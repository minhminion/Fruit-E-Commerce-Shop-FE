import { connect } from "react-redux"
import { multilanguage } from "redux-multilanguage"
import handlers from "../handlers"
import UserOrderDetails from "../components/UserOrderDetails"

const mapStateToProps = (state, props) => {
    return ({
        user: state.user.user
    })
}

const mapDispatchToProps = (dispatch, props) => ({
  ...handlers(dispatch, props)
  })

export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(UserOrderDetails))