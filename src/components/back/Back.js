import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom"

export const Back = ({routeName}) => {
    const history = useHistory()
    const goBack = () => routeName ? history.push(`/${routeName.toLowerCase()}`) : history.goBack()
    return (
        <i onClick={goBack} className='fas fa-arrow-left text-2xl text-violet-500 cursor-pointer hover:text-violet-300'></i>
    )
}

Back.propTypes = {
    routeName : PropTypes.string
}