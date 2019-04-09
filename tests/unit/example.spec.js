import { shallowMount } from '@vue/test-utils';
import CrInput from '@/components/CrInput.vue';

describe('CrInput.vue', () => {
  it('has type=text attribute', () => {
    const type = 'text';
    const width = '105';
    const placeholder = 'type here';
    const wrapper = shallowMount(CrInput, {
      propsData: { type, width, placeholder }
    });
    expect(wrapper.attributes().type).toBe('text');
  });
  it('renders an input field', () => {
    const type = 'text';
    const width = '105';
    const placeholder = 'type here';
    const wrapper = shallowMount(CrInput, {
      propsData: { type, width, placeholder }
    });
    expect(wrapper.contains('input')).toBe(true);
  });
  it('has placeholder value of type here', () => {
    const type = 'text';
    const width = '205';
    const placeholder = 'type here';
    const wrapper = shallowMount(CrInput, {
      propsData: { type, width, placeholder }
    });
    expect(wrapper.attributes().placeholder).toBe('type here');
  });
});
