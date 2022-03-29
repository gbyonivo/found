import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../src/components/Button';

describe('Button', () => {
  test.each([
    [{
      disabled: true, busy: false, value: 'enter code', className: 'testing', colour: 'bg-yellow-100',
    }],
    [{ disabled: true, busy: true, value: 'enter code' }],
    [{}],
  ])('should render correctly %p', ({
    disabled, busy, value, className, colour,
  }) => {
    const onClick = jest.fn(() => {});
    const button = shallow(<Button
      busy={busy}
      value={value}
      className={className}
      colour={colour}
      disabled={disabled}
      onClick={onClick}
    />);
    button.find('button').simulate('click');

    if (disabled || busy) {
      expect(onClick).not.toHaveBeenCalled();
      expect(button.prop('disabled')).toBe(true);
      if (busy) expect(button.text()).toContain('...');
    } else {
      expect(onClick).toHaveBeenCalled();
      expect(button.prop('disabled')).toBe(false);
      if (busy) expect(button.text()).not.toContain('...');
    }
  });
});
