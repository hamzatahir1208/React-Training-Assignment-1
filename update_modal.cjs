const fs = require('fs');

const path = '/media/hamza/Study/Work/Hazelsofts/React-Training-Assignment-1/src/pages/users/UserModal.jsx';
let content = fs.readFileSync(path, 'utf8');

// Remove Redux imports
content = content.replace(/import \{ createLoadingSelector \} from "\.\.\/\.\.\/redux\/reducers\/loadingReducer";\n/, '');
content = content.replace(/import \{ connect \} from "react-redux";\n/, '');
content = content.replace(/import \{ addUserAndRefresh \} from "\.\.\/\.\.\/redux\/actions\/userActions";\n/, '');

// Update function signature
content = content.replace(/function UserModal\(\{ handleAddUser, isAdding \}\) \{/, 'export default function UserModal({ onSubmit, isAdding, error, setError }) {');

// Remove local errorMessage state
content = content.replace(/const \[errorMessage, setErrorMessage\] = useState\(""\);\n/, '');

// Update handleSubmit
content = content.replace(
`  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      await handleAddUser({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        age: Number(formData.age),
        email: formData.email.trim(),
        role: formData.role,
      });
      setFormData({ firstName: "", lastName: "", age: "", email: "", role: "" });
      const closeBtn = document.getElementById("userModalClose");
      if (closeBtn) {
        closeBtn.click();
      }
    } catch (err) {
      setErrorMessage(err?.message);
    }
  };`,
`  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await onSubmit({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        age: Number(formData.age),
        email: formData.email.trim(),
        role: formData.role,
      });
      setFormData({ firstName: "", lastName: "", age: "", email: "", role: "" });
      const closeBtn = document.getElementById("userModalClose");
      if (closeBtn) {
        closeBtn.click();
      }
    } catch (err) {
      setError(err?.message || "An error occurred");
    }
  };`
);

// Update errorMessage references
content = content.replace(/\{errorMessage && \(/g, '{error && (');
content = content.replace(/\{errorMessage\}/g, '{error}');

// Remove Redux connect
content = content.replace(/const loadingSelector = createLoadingSelector\("ADD_USER"\);\n\nconst mapStateToProps = \(state\) => \(\{\n  isAdding: loadingSelector\(state\),\n\}\);\n\nconst mapDispatchToProps = \(dispatch\) => \(\{\n  handleAddUser: \(user\) => dispatch\(addUserAndRefresh\(user\)\),\n\}\);\n\nexport default connect\(mapStateToProps, mapDispatchToProps\)\(UserModal\);\n/, '');

fs.writeFileSync(path, content);
