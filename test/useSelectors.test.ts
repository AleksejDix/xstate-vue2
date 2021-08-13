import { render, fireEvent } from '@testing-library/vue';
import UseSelectors from './UseSelectors.vue';
import useSelectorsCustomFn from './UseSelectorsCustomFn.vue';

describe('useSelector', () => {
  it('only rerenders for selected values', async () => {
    const { getByTestId, emitted } = render(UseSelectors);

    const countButton = getByTestId('count');
    const otherButton = getByTestId('other');
    const incrementEl = getByTestId('increment');

    await fireEvent.click(incrementEl);
    expect(countButton.textContent).toBe('1');

    await fireEvent.click(otherButton);
    await fireEvent.click(otherButton);
    await fireEvent.click(otherButton);
    await fireEvent.click(otherButton);

    await fireEvent.click(incrementEl);
    expect(countButton.textContent).toBe('2');

    expect(emitted()['rerender'].length).toBe(3);
  });

  it('should work with a custom comparison function', async () => {
    const { getByTestId } = render(useSelectorsCustomFn);

    const nameEl = getByTestId('name');
    const sendUpperButton = getByTestId('sendUpper');
    const sendOtherButton = getByTestId('sendOther');

    expect(nameEl.textContent).toEqual('david');

    await fireEvent.click(sendUpperButton);

    // unchanged due to comparison function
    expect(nameEl.textContent).toEqual('david');

    await fireEvent.click(sendOtherButton);

    expect(nameEl.textContent).toEqual('other');

    await fireEvent.click(sendUpperButton);

    expect(nameEl.textContent).toEqual('DAVID');
  });
});
