import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUndo,
  faRedo,
  faPlay,
  faChevronUp,
  faLayerGroup,
  faRuler,
  faLink,
  faEnvelope,
  faPlus,
  faPlusSquare,
  faStopwatch,
  faTrash,
  faPalette,
  faFont,
  faCamera,
  faSmile,
  faHome,
  faHistory,
  faUserFriends,
  faDiceD6,
  faColumns,
  faWindowRestore,
  faWindowMaximize,
  faEllipsisV,
  faUpload,
  faCopy
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add([
  faUndo,
  faRedo,
  faPlay,
  faChevronUp,
  faLayerGroup,
  faRuler,
  faLink,
  faEnvelope,
  faPlus,
  faPlusSquare,
  faStopwatch,
  faTrash,
  faPalette,
  faFont,
  faCamera,
  faSmile,
  faHome,
  faHistory,
  faUserFriends,
  faDiceD6,
  faColumns,
  faWindowRestore,
  faWindowMaximize,
  faEllipsisV,
  faUpload,
  faCopy
])

export const FaUndo = (props) => <FontAwesomeIcon {...props} icon={'undo'} />
export const FaRedo = (props) => <FontAwesomeIcon {...props} icon={'redo'} />
export const FaPlay = (props) => <FontAwesomeIcon {...props} icon={'play'} />
export const FaChevronUp = (props) => (
  <FontAwesomeIcon {...props} icon={'chevron-up'} />
)
export const FaLayerGroup = (props) => (
  <FontAwesomeIcon {...props} icon={'layer-group'} />
)
export const FaRuler = (props) => <FontAwesomeIcon {...props} icon={'ruler'} />
export const Falink = (props) => <FontAwesomeIcon {...props} icon={'link'} />
export const FaEnvelope = (props) => (
  <FontAwesomeIcon {...props} icon={'envelope'} />
)
export const FaAdd = (props) => <FontAwesomeIcon {...props} icon={'plus'} />
export const FaSquarePlus = (props) => <FontAwesomeIcon {...props} icon={'plus-square'} />
export const FaStopwatch = (props) => (
  <FontAwesomeIcon {...props} icon={'stopwatch'} />
)
export const FaTrash = (props) => <FontAwesomeIcon {...props} icon={'trash'} />
export const FaPalette = (props) => (
  <FontAwesomeIcon {...props} icon={'palette'} />
)
export const FaFont = (props) => <FontAwesomeIcon {...props} icon={'font'} />
export const FaCamera = (props) => (
  <FontAwesomeIcon {...props} icon={'camera'} />
)
export const FaSmiley = (props) => <FontAwesomeIcon {...props} icon={'smile'} />
export const FaHome = (props) => <FontAwesomeIcon {...props} icon={'home'} />
export const FaHistory = (props) => (
  <FontAwesomeIcon {...props} icon={'history'} />
)
export const FaUserFriends = (props) => (
  <FontAwesomeIcon {...props} icon={'user-friends'} />
)
export const FaDiceD6 = (props) => (
  <FontAwesomeIcon {...props} icon={'dice-d6'} />
)
export const FaColumns = (props) => (
  <FontAwesomeIcon {...props} icon={'columns'} />
)
export const FaWindowRestore = (props) => (
  <FontAwesomeIcon {...props} icon={'window-restore'} />
)
export const FaWindowMaximize = (props) => (
  <FontAwesomeIcon {...props} icon={'window-maximize'} />
)
export const FaEllipsisV = (props) => (
  <FontAwesomeIcon {...props} icon={'ellipsis-v'} />
)

export const FaUpload = (props) => (
  <FontAwesomeIcon {...props} icon={'upload'} />
)

export const FaCopy = (props) => <FontAwesomeIcon {...props} icon={'copy'} />
