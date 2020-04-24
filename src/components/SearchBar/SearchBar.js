import React, { PureComponent } from "react";
import { debounce } from "../../utils/utils";
import SearchSuggestions from "../SearchSuggestions/SearchSuggestions";
import './SearchBar.scss'

class SearchBar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: '',
      errorMessage: ''
    };
  }

  handleDebounce = debounce(async (userInput) => {
    try {
      let response = await fetch(`/api.json`);
      let suggestions = await response.json()

      const filteredSuggestions = suggestions.filter(
        suggestion => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      );

      this.setState({
        filteredSuggestions,
        showSuggestions: true,
        userInput: userInput,
        errorMessage: filteredSuggestions.length === 0 ? 'No results try something else...' : ''
      });

    } catch (error) {
      this.setState({
        filteredSuggestions: [],
        showSuggestions: true,
        errorMessage: `Search is currently not working, try again later...`
      })
    }

  }, 200)

  handleOnChange = (e) => {
    e.persist()
    const userInput = e.currentTarget.value.trimStart()
    this.setState({ userInput });
    this.handleDebounce(userInput)

  };

  handleClearSearch = e => {
    this.setState({
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ''
    });
  };

  handleOnSearch = e => {
    this.setState({
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  render() {

    let clearInput = this.state.userInput ? <a className="clearInput" onClick={this.handleClearSearch}>X</a> : null

    return (
      <>
        <div className="search-bar">
          <input
            className="search-input"
            type="text"
            spellCheck="false"
            placeholder="Search for a country..."
            onChange={this.handleOnChange} value={this.state.userInput} />
            {clearInput}
        </div>
        <div className="suggestions-wrapper">
          <SearchSuggestions {...this.state} handleOnSearch={this.handleOnSearch} />
        </div>
      </>
    );
  }
}

export default SearchBar;
