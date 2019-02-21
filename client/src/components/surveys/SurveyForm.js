import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import _ from "lodash";
import formFields from "./formFields";

// SurveyForm shows a form for a user to add input
class SurveyForm extends Component {

	renderFields() {
		return _.map(formFields, ({ label, name }) => {
			return <Field key={name} type="text" label={label} name={name} component={SurveyField} />
		});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
					{this.renderFields()}
					<Link to="/surveys" className="red btn-flat white-text">
						Cancel
					</Link>
					<button type="submit" className="teal btn-flat right white-text">
					  Next
					  <i className="material-icons right">done</i>
					</button>
				</form>	
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	errors.recipients = validateEmails(values.recipients || "");

	_.each(formFields, ({ name }) => {
		if(!values[name]) {
			errors[name] = "Cannot be empty here."
		}
	});

	return errors;
}

export default reduxForm({
	validate,
	form: "surveyForm",
	destroyOnUnmount: false
})(SurveyForm);