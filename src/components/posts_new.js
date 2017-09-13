import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'; //reduxForm is very similar to connect
//allows our component to communicate with that reducer we added (in the form piece of state)
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';


class PostsNew extends Component {

    renderField(field) {
        const { meta: {touched, error} } = field; //why is this in braces..? oh wait nvm think about it
        //we're using DESTRUCTURING to pull off meta from field, then touched and error from meta

        const className = `form-group ${touched && error ? 'has-danger' : ""}`;

        //We need the field argument because otherwise the Field component below has no way of knowing
        //it's responsible for dealing with this specific input
        //field.input is an object containing props and event handlers (e.g. onChange, onBlur, onFocus, input value,
        //etc) The "..." replaces having to do:
        // onChange={field.input.onChange} onFocus={field.input.onFocus} onBlur= (etc)
        console.log(field);


        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ""}
                </div>
            </div>
        )
        //the field.meta.error comes from the error object
        //ternary expression so error message only shows up if the field  was touched
        //text-help and has-danger work together
    }


    onSubmit(values){
        // this === our component
        //console.log(values);
        this.props.createPost(values, () => {
            this.props.history.push('/'); //callback
        });


    }


    render() {
        //at the bottom of this file, we wired up reduxForm to PostsNew just like how we usually use connect
        //connect adds some additional properties to our component (so does reduxForms!)
        //handleSubmit is a property being passed to the component by reduxForm
        const { handleSubmit } = this.props;

        //name prop: what piece of state we're editing
        //component: takes a function to display the Field component
        //label: arbitrary prop that we can just add

        //onSubmit: reduxForm handles the state of our form (values, validation)
        // but it doesn't handle posting our info to the server
        // we need to take the info from the form and do something with it

        //{handleSubmit(this.onSubmit.bind(this))} takes a function that we define, and passes it to handleSubmit
        //handleSubmit does the redux part (validation, etc.). if everything is good, we then call our onSubmit function
        //and passes us the values out of the form
        //we bind it because we pass this.onSubmit as a callback that is executed in a context outside of our component
        //this is so that in onSubmit, this === our component
        return (

            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    name="title"
                    label = "Post Title"
                    component={this.renderField}
                />
                <Field
                    name="categories"
                    label="Categories"
                    component={this.renderField}
                />
                <Field
                    name="content"
                    label="Post Content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className={"btn btn-danger"}>Cancel</Link>
            </form>
        );
    }
}

function validate(values){
    //console.log(values) -> {title: 'user input', categories: 'blah', content: 'helloooo'
    const errors = {}; //starts as empty object

    //Validate the inputs from 'values'
    if (!values.title || values.title.length < 3) {
        errors.title = "Please enter a title that is at least 3 chars!"; //add a property
        //The name is actually important - when redux renders the fields, it'll compare the Field name with the error
        //property - i.e. they must be identical
    }

    if (!values.categories) {
        errors.categories = "Enter a category please";
    }

    if (!values.content) {
        errors.content = "Enter content pls";
    }

    //If errors is empty. the form is fine to submit
    //If errors has *any8 properties, reduxForm assumes form is invalid
    return errors;

}

export default reduxForm({ //single function that takes a number of configuration options
    validate, //same as validate: 'validate'
    form: 'PostsNewForm' //UNIQUE name for this form
    //if we want to show multiple forms on a single page, this field ensures we don't merge
    //state from multiple different forms into a single state
})(
    connect(null, {createPost})(PostsNew) //how to stack multiple connect-like helpers
);


//