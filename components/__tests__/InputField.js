/* eslint-env jest */

import React from "react";
import renderer from "react-test-renderer";

import InputField from "../InputField.js";

describe("Components::<InputField />", () => {
  it("should match snapshot", () => {
    const component = renderer.create(<InputField />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
