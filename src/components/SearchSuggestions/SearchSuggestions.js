import React, { PureComponent } from "react";
import './SearchSuggestions.scss'

class SearchSuggestions extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    let suggestionsList;
    if (this.props.showSuggestions && this.props.userInput) {

      if (this.props.filteredSuggestions.length) {

        suggestionsList = (
          <ul className="suggestions-list">
            {this.props.filteredSuggestions.map((suggestion, i) => {
              let className;
              let matchedSuggestion = String(suggestion).replace(
                new RegExp(`${this.props.userInput}`, "gi"),
                "<span class='match-text'>$&</span>");

              return (
                <li className={className} key={i} onClick={this.props.handleOnSearch}
                  dangerouslySetInnerHTML={{ __html: matchedSuggestion }} />
              );
            })}
          </ul>
        );
      } else {
        suggestionsList = (
          <div className="no-suggestions">
            <em>{this.props.errorMessage}</em>
          </div>
        );
      }
    }

    return (
      <div className="suggestions-wrapper">
        {suggestionsList}
      </div>
    );
  }
}

export default SearchSuggestions;
