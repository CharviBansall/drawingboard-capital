import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Tabs from '../Tabs';
import { House, ChartBar, Gear } from '@phosphor-icons/react';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      description: 'Array of tab items to display',
      control: 'object',
    },
    value: {
      description: 'Currently selected tab value',
      control: 'text',
    },
    onChange: {
      description: 'Callback function when tab selection changes',
      action: 'changed',
    },
    className: {
      description: 'Additional CSS classes to apply to the container',
      control: 'text',
    },
    tabListClassName: {
      description: 'Additional CSS classes to apply to the tab list',
      control: 'text',
    },
    contentClassName: {
      description: 'Additional CSS classes to apply to the content',
      control: 'text',
    },
    children: {
      description: 'Content to display for the selected tab',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

/**
 * Interactive example with state management
 */
function InteractiveTabs(args: any) {
  const [selectedTab, setSelectedTab] = useState(args.value);
  
  // Find a non-disabled tab if the current one is disabled
  const findEnabledTab = () => {
    const currentTab = args.tabs.find((tab: any) => tab.value === selectedTab);
    if (currentTab?.disabled) {
      const enabledTab = args.tabs.find((tab: any) => !tab.disabled);
      return enabledTab ? enabledTab.value : selectedTab;
    }
    return selectedTab;
  };
  
  // Ensure we're not showing a disabled tab as selected
  const activeTab = findEnabledTab();
  
  return (
    <div className="w-[600px]">
      <Tabs
        {...args}
        value={activeTab}
        onChange={(value) => {
          setSelectedTab(value);
          args.onChange(value);
        }}
      >
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          {selectedTab === 'overview' && (
            <div>
              <h3 className="text-lg font-medium mb-2">Overview Content</h3>
              <p>This is the overview tab content. It provides a general summary.</p>
            </div>
          )}
          {selectedTab === 'analytics' && (
            <div>
              <h3 className="text-lg font-medium mb-2">Analytics Content</h3>
              <p>This is the analytics tab content. It shows detailed metrics and charts.</p>
            </div>
          )}
          {selectedTab === 'settings' && (
            <div>
              <h3 className="text-lg font-medium mb-2">Settings Content</h3>
              <p>This is the settings tab content. It allows configuration of various options.</p>
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
}

/**
 * Default example of the Tabs component
 */
export const Default: Story = {
  args: {
    tabs: [
      { value: 'overview', label: 'Overview' },
      { value: 'analytics', label: 'Analytics' },
      { value: 'settings', label: 'Settings' },
    ],
    value: 'overview',
  },
  render: (args) => <InteractiveTabs {...args} />,
};

/**
 * Example with icons in the tabs
 */
export const WithIcons: Story = {
  args: {
    tabs: [
      { value: 'overview', label: 'Overview', icon: <House weight="fill" /> },
      { value: 'analytics', label: 'Analytics', icon: <ChartBar weight="fill" /> },
      { value: 'settings', label: 'Settings', icon: <Gear weight="fill" /> },
    ],
    value: 'analytics',
  },
  render: (args) => <InteractiveTabs {...args} />,
};

/**
 * Example with custom styling
 */
export const CustomStyling: Story = {
  args: {
    tabs: [
      { value: 'tab1', label: 'First Tab' },
      { value: 'tab2', label: 'Second Tab' },
      { value: 'tab3', label: 'Third Tab' },
    ],
    value: 'tab1',
    tabListClassName: 'justify-center',
    contentClassName: 'mt-6',
  },
  render: (args) => <InteractiveTabs {...args} />,
};

/**
 * Example with disabled tabs
 */
export const WithDisabledTabs: Story = {
  args: {
    tabs: [
      { value: 'overview', label: 'Overview' },
      { value: 'analytics', label: 'Analytics', disabled: true },
      { value: 'settings', label: 'Settings' },
    ],
    value: 'overview',
  },
  render: (args) => <InteractiveTabs {...args} />,
};

/**
 * Example with icons and disabled tabs
 */
export const WithIconsAndDisabled: Story = {
  args: {
    tabs: [
      { value: 'overview', label: 'Overview', icon: <House weight="fill" /> },
      { value: 'analytics', label: 'Analytics', icon: <ChartBar weight="fill" />, disabled: true },
      { value: 'settings', label: 'Settings', icon: <Gear weight="fill" /> },
    ],
    value: 'overview',
  },
  render: (args) => <InteractiveTabs {...args} />,
};
