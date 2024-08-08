import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.css';

// Renderiza el componente App en el elemento con id "root" del HTML
class Manager extends React.Component {
    render() {
        return (
            <div>
                <App />
            </div>
        );
    }
}

//-------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Manager />);