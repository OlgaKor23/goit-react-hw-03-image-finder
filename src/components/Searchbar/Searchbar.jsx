import React, { Component } from "react";
import styles from "./Searchbar.module.css";
import PropTypes from "prop-types";

export default class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

  state = {
    queryString: ""
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    const { queryString } = this.state;
    const { onSubmit } = this.props;
    e.preventDefault();
    if (queryString) {
      onSubmit(queryString);
      this.setState({
        queryString: ""
      });
    }
  };

  render() {
    const { queryString } = this.state;
    return (
      <header className={styles.searchbar}>
        <form className={styles.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.searchForm_button}>
            <span className={styles.searchForm_button_label}>Search</span>
          </button>
          <input
            className={styles.searchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="queryString"
            value={queryString}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
