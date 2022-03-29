import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import EditableTextInput from '../../src/components/EditableTextInput';

describe('EditableTextInput', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })
  test('should mount properly with default props', () => {
    const onClick = jest.fn(() => {});
    const element = renderer.create(<EditableTextInput save={onClick} />);
    expect(element).toMatchSnapshot();
  });

  test.each([
    ['', 'potato'],
    ['name', { name: 'potato' }],
  ])('clickEdit/onChange/clickSave with valueKey as %p', (valueKey, calledWith) => {
    const onClick = jest.fn(() => {});
    const element = shallow(<EditableTextInput save={onClick} valueKey={valueKey} />);
    element.find('.editable-text-input__edit-btn').simulate('click');
    element.find('input').simulate('change', { target: { value: 'potato' } });
    element.find('.editable-text-input__save-btn').simulate('click');
    expect(element.find('input').prop('value')).toBe('potato');
    expect(onClick).toHaveBeenCalledWith(calledWith);
    expect(element.find('input').prop('disabled')).toBe(true);
  });

  test('clickEdit/onChange/clickCancel', () => {
    const onClick = jest.fn(() => {});
    const element = shallow(<EditableTextInput save={onClick} />);
    element.find('.editable-text-input__edit-btn').simulate('click');
    element.find('input').simulate('change', { target: { value: 'try me' } });
    element.find('.editable-text-input__cancel-btn').simulate('click');
    expect(element.find('input').prop('value')).toBe('');
    expect(element.find('input').prop('disabled')).toBe(true);
  });
});
