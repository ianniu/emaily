import React, { Component } from 'react';
import  { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';
import "../../stylesheets/styles.css";

class SurveyList extends Component {
    componentDidMount() {
        this.props.fetchSurveys();
    }

    renderSurveys() {
        return this.props.surveys.reverse().map(survey => {
            return (
                <div className="card" key={survey._id}>
                    <div className="card-image">
                        <img className="img" src="https://visme.co/blog/wp-content/uploads/2020/11/header-9.png"></img>
                        <span className="card-title blue-text text-accent-2">{survey.title}</span>
                    </div>
                    <div className="card-content">
                        <p>
                            {survey.body}
                        </p>
                        <p className="right">
                            Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="card-action">
                        <a>Yes: {survey.yes}</a>
                        <a>No: {survey.no}</a>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                {this.renderSurveys()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { surveys: state.surveys};
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);