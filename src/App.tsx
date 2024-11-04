import AuthProvider from "./providers/AuthProvider"
import Routes from "./routes/Routes"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}

export default App