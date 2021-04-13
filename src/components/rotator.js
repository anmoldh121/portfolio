import React from 'react';
import './rotator.css';

export default function Rotator(props) {
    return (
        <div className="my-rotator" id={props.id}>
            {
                
                props.elements.map(element => <p className="rotating-element" key={element}>{element}</p>)
            }
        </div>
    );
}
