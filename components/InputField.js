import React, { PureComponent } from "react";
import { debounce } from "lodash";

class InputField extends PureComponent {
  debounceEvent(...args) {
    this.debouncedEvent = debounce(...args);
    return e => {
      e.persist();
      return this.debouncedEvent(e);
    };
  }

  componentWillUmount() {
    this.debouncedEvent.cancel();
  }

  onChangeText = event => {
    const { value: text } = event.target;  
    const { onChangeText, name } = this.props;
    onChangeText(name, text);
  };

  render() {
    const { placeholder = "", value = "", type = "text" } = this.props;
    return (
      <input
        type={type}
        defaultValue={value}
        onChange={this.debounceEvent(this.onChangeText, 500)}
        placeholder={placeholder}
      />
    );
  }
}

export default InputField;