import React, {Component } from 'react';
import ReactDOM from 'react-dom';
import { store } from '../index';
import { Provider } from 'react-redux';


class Modal extends Component {

    componentDidMount(){
        this.modalTarget = document.createElement('div'); //create a new div
        this.modalTarget.className = 'modal';
        document.body.appendChild(this.modalTarget); //append it to document body
        this._render();
    }

    //Whenever component is about to update, we'll do another render
    componentWillUpdate(){
        this._render();     //if we get a new set of components or children in our
                            // Modal, we'll render those to the parent
    }

    componentWillUnmount(){
        //clean up the DOM when the Modal is being removed
        ReactDOM.unmountComponentAtNode(this.modalTarget);
        document.body.removeChild(this.modalTarget);
    }

    //this.props.children is a reference to any components that are passed to our
    //component
    // e.g. h1 and p
    // <Modal>
    //      <h1>hi</h1>
    //      <p>some text</p>
    // </Modal>
    _render(){
        console.log();
        ReactDOM.render( //use ReactDOM to render this.props.children to the new div
            //I think I'm supposed to pass store to the provide too... idk how this works T_T
            //this is for connected components but i think i messed it up
            <Provider store={store}>
                <div>{this.props.children}</div>
            </Provider>,                        //render this div
            this.modalTarget                    //into this.modalTarget
        );
    }


    render(){
        return <noscript />; //render nothing; don't show anything
    }
}

export default Modal;