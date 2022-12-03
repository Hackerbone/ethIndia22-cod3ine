import { Button, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import "./Navbar.css"

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <Row className="navbar-navbarContainer" align="middle" justify="space-between">
            <div className="navbar-logoContainer">
                SQUAD
            </div>

            <Button className="navbar-getStartedButton" onClick={() => navigate('/connect')}>
                Get Started
            </Button>
        </Row>
    )
}

export default Navbar