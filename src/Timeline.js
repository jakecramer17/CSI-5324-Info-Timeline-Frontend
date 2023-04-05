import './App.css';
import AppNavbar from './AppNavbar.js';
import { Link } from 'react-router-dom';
import { Label, Button, Container } from 'reactstrap';

/**
 * Default screen when entering webpage. Use the "/home"
 * extension to interact with timeline features.
 */
function Timeline() {
    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <Label color="black">Timeline</Label>
            </Container>
        </div>
    );
}

export default Timeline;