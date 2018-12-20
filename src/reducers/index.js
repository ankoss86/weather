import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { byCityName } from './byCityNameReducer'
import { isLoading, isLoadinToLS } from './isLoading'
import { byCityCoord } from './byCoord'
import { fiveDayHistory } from './fiveDayHistory'
import { showInputSearch } from './showInputSearchReducer'
import { byCityNameLocalStoradge } from './byCityNameLocalStoradge'

export default (history) => combineReducers({
  router: connectRouter(history),
  byCityName,
  isLoading,
  isLoadinToLS,
  byCityCoord,
  fiveDayHistory,
  showInputSearch,
  byCityNameLocalStoradge,
  
})