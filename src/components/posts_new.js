import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'; //reduxForm is very similar to connect
//allows our component to communicate with that reducer we added (in the form piece of state)


class PostsNew extends Component {
    render() {
        //name prop: what piece of state we're editing
        //component: takes a function to display the Field component... continue here
        return (
            <form>
                <Field
                    name="title"
                    component={}
                />
            </form>
        );
    }
}


export default reduxForm({ //single function that takes a number of configuration options
    form: 'PostsNewForm' //UNIQUE name for this form
    //if we want to show multiple forms on a single page, this field ensures we don't merge
    //state from multiple different forms into a single state
})(PostsNew);
//