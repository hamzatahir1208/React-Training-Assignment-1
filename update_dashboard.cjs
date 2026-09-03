const fs = require('fs');

const path = '/media/hamza/Study/Work/Hazelsofts/React-Training-Assignment-1/src/pages/dashboard/Dashboard.jsx';
let content = fs.readFileSync(path, 'utf8');

// Add imports
content = content.replace(
  'import { useEffect } from "react";',
  'import { useEffect, useState } from "react";\nimport { createLoadingSelector } from "../../redux/reducers/loadingReducer";'
);

content = content.replace(
  'clearActionError,\n} from "../../redux/actions/userActions";',
  'clearActionError,\n  addUserAndRefresh,\n} from "../../redux/actions/userActions";'
);

// Destructure addUserAndRefresh and isAdding
content = content.replace(
  'deleteUserAndRefresh,\n    clearActionError,\n  } = props;',
  'deleteUserAndRefresh,\n    clearActionError,\n    addUserAndRefresh,\n    isAdding,\n  } = props;'
);

// Add modalError state
content = content.replace(
  'const totalPages = Math.max(1, Math.ceil(users.total / users.limit));',
  'const [modalError, setModalError] = useState("");\n  const totalPages = Math.max(1, Math.ceil(users.total / users.limit));'
);

// Pass props to UserModal
content = content.replace(
  '<UserModal />',
  '<UserModal isAdding={isAdding} error={modalError} setError={setModalError} onSubmit={addUserAndRefresh} />'
);

// Update mapStateToProps
content = content.replace(
  'const mapStateToProps = (state) => ({\n  users: state.users,\n});',
  'const loadingSelector = createLoadingSelector("ADD_USER");\n\nconst mapStateToProps = (state) => ({\n  users: state.users,\n  isAdding: loadingSelector(state),\n});'
);

// Update mapDispatchToProps
content = content.replace(
  'deleteUserAndRefresh: (id) => dispatch(deleteUserAndRefresh(id)),',
  'deleteUserAndRefresh: (id) => dispatch(deleteUserAndRefresh(id)),\n  addUserAndRefresh: (user) => dispatch(addUserAndRefresh(user)),'
);

fs.writeFileSync(path, content);
