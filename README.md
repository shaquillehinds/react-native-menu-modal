# @shaquillehinds/react-native-menu-modal

[![npm version](https://img.shields.io/npm/v/@shaquillehinds/react-native-menu-modal.svg)](https://www.npmjs.com/package/@shaquillehinds/react-native-menu-modal)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A simple, elegant context menu modal for React Native that appears at the touch location. Perfect for creating contextual menus, dropdown options, and interactive lists triggered by press or long-press gestures.

<img src="https://raw.githubusercontent.com/shaquillehinds/react-native-menu-modal/master/assets/menumodal.gif" alt="example" height="500"/>

## Features

- 🎯 **Position-aware** - Opens at exact touch coordinates
- ⚡ **Flexible activation** - Trigger on press or long-press
- 🎨 **Highly customizable** - Style every aspect of the menu
- 📱 **Cross-platform** - Works seamlessly on iOS and Android
- 🔧 **TypeScript support** - Fully typed for excellent DX
- 🚀 **Performant** - Built with react-native-reanimated and gesture-handler
- 🎭 **Portal support** - Render menus in a portal layer or native modal
- ♿ **Accessible** - Supports subtitles and custom components
- 🎁 **Zero config** - Works out of the box, no provider required!

## Quick Start

```tsx
import { MenuModal } from '@shaquillehinds/react-native-menu-modal';

// That's it! Works immediately without any setup
<MenuModal
  backgroundColor="#1a1a1a"
  options={[
    { title: 'Edit', onOptionPress: () => console.log('Edit') },
    { title: 'Delete', onOptionPress: () => console.log('Delete') },
  ]}
>
  <Text>Press me!</Text>
</MenuModal>;
```

## Installation

```bash
npm install @shaquillehinds/react-native-menu-modal
```

or

```bash
yarn add @shaquillehinds/react-native-menu-modal
```

### Peer Dependencies

This package requires the following peer dependencies:

```bash
npm install @shaquillehinds/react-native-spot-modal react-native-reanimated react-native-gesture-handler
```

or

```bash
yarn add @shaquillehinds/react-native-spot-modal react-native-reanimated react-native-gesture-handler
```

> **Note:** Make sure to complete the setup for [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/) and [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/docs/fundamentals/installation).

### Portal Provider Setup (Optional)

The `MenuModalPortalProvider` is **optional**. The menu modal works out of the box without it by falling back to React Native's `Modal` component. However, the portal provider offers better control and rendering flexibility.

**Quick Start (No Provider Needed):**

```tsx
import { MenuModal } from '@shaquillehinds/react-native-menu-modal';

// Works immediately - uses React Native Modal as fallback
export default function App() {
  return (
    <MenuModal
      backgroundColor="#1a1a1a"
      options={[
        { title: 'Option 1', onOptionPress: () => console.log('1') },
        { title: 'Option 2', onOptionPress: () => console.log('2') },
      ]}
    >
      <Text>Press me</Text>
    </MenuModal>
  );
}
```

**With Portal Provider (Recommended for Better Control):**

If you want more control over rendering layers, add the provider at the root of your application:

```tsx
import { MenuModalPortalProvider } from '@shaquillehinds/react-native-menu-modal';

export default function App() {
  return (
    <MenuModalPortalProvider>{/* Your app content */}</MenuModalPortalProvider>
  );
}
```

**For Expo Router:**

```tsx
// app/_layout.tsx
import { MenuModalPortalProvider } from '@shaquillehinds/react-native-menu-modal';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <MenuModalPortalProvider>
      <Stack />
    </MenuModalPortalProvider>
  );
}
```

**For React Navigation:**

```tsx
import { NavigationContainer } from '@react-navigation/native';
import { MenuModalPortalProvider } from '@shaquillehinds/react-native-menu-modal';

export default function App() {
  return (
    <MenuModalPortalProvider>
      <NavigationContainer>{/* Your navigators */}</NavigationContainer>
    </MenuModalPortalProvider>
  );
}
```

> **Note:** When using the portal provider, it should be placed as high as possible in your component tree, typically wrapping your navigation or root component.

## Usage

### Basic Example

```tsx
import { MenuModal } from '@shaquillehinds/react-native-menu-modal';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MenuModal
        backgroundColor="#1a1a1a"
        options={[
          {
            id: 'edit',
            title: 'Edit',
            onOptionPress: ({ title }) => console.log(`${title} pressed`),
          },
          {
            id: 'share',
            title: 'Share',
            onOptionPress: () => console.log('Share pressed'),
          },
          {
            id: 'delete',
            title: 'Delete',
            subTitle: 'Cannot be undone',
            onOptionPress: () => console.log('Delete pressed'),
          },
        ]}
      >
        <Text>Press me for menu</Text>
      </MenuModal>
    </View>
  );
}
```

### Long Press Activation

```tsx
<MenuModal
  backgroundColor="#1a1a1a"
  activateOn="long-press"
  options={[
    {
      title: 'Copy',
      onOptionPress: () => console.log('Copied!'),
    },
    {
      title: 'Paste',
      onOptionPress: () => console.log('Pasted!'),
    },
  ]}
>
  <Text>Long press me</Text>
</MenuModal>
```

### With Icons and Custom Components

```tsx
import { Feather } from '@expo/vector-icons';

<MenuModal
  backgroundColor="#ffffff"
  options={[
    {
      id: 'download',
      title: 'Download',
      subTitle: 'Save to device',
      leftComponent: (
        <Feather
          name="download"
          size={20}
          color="#000"
          style={{ marginRight: 12 }}
        />
      ),
      onOptionPress: () => console.log('Download'),
    },
    {
      id: 'star',
      title: 'Add to Favorites',
      leftComponent: (
        <Feather
          name="star"
          size={20}
          color="#FFD700"
          style={{ marginRight: 12 }}
        />
      ),
      rightComponent: (
        <Text style={{ marginLeft: 'auto', color: '#888' }}>⌘F</Text>
      ),
      onOptionPress: () => console.log('Favorited'),
    },
  ]}
>
  <Text>Open Menu</Text>
</MenuModal>;
```

### Keeping Menu Open After Selection

```tsx
<MenuModal
  backgroundColor="#2a2a2a"
  disableDismissOnPress
  options={[
    {
      title: 'Option 1',
      disableDismissOnOptionPress: true,
      onOptionPress: ({ dismiss }) => {
        console.log('Do something...');
        // Manually dismiss when ready
        setTimeout(() => dismiss(), 1000);
      },
    },
    {
      title: 'Option 2',
      onOptionPress: () => console.log('Auto dismisses'),
    },
  ]}
>
  <Text>Options</Text>
</MenuModal>
```

### Imperative Control with Ref

```tsx
import { useRef } from 'react';
import type { MenuModalRef } from '@shaquillehinds/react-native-menu-modal';

function MyComponent() {
  const menuRef = useRef<MenuModalRef>(null);

  const openMenu = () => {
    // Open menu at specific coordinates
    menuRef.current?.open({ pageX: 100, pageY: 200 });
  };

  const closeMenu = () => {
    menuRef.current?.close();
  };

  return (
    <>
      <Button title="Open Menu" onPress={openMenu} />
      <MenuModal
        refMenuModal={menuRef}
        backgroundColor="#1a1a1a"
        options={[
          {
            title: 'Close',
            onOptionPress: closeMenu,
          },
        ]}
      >
        <Text>Child (won't trigger menu, use ref instead)</Text>
      </MenuModal>
    </>
  );
}
```

### Scrollable Menu

```tsx
<MenuModal
  backgroundColor="#ffffff"
  scrollable
  maxHeight={300}
  options={Array.from({ length: 20 }, (_, i) => ({
    id: `option-${i}`,
    title: `Option ${i + 1}`,
    subTitle: `Description for option ${i + 1}`,
    onOptionPress: ({ title }) => console.log(title),
  }))}
>
  <Text>Many Options</Text>
</MenuModal>
```

### Custom Styling

```tsx
<MenuModal
  backgroundColor="#1e1e1e"
  padding={[10, 15]}
  borderRadius={20}
  separatorStyle={{
    backgroundColor: '#444',
    height: 2,
    marginVertical: 8,
  }}
  options={[
    {
      title: 'Custom Styled',
      subTitle: 'With custom padding',
      padding={[12, 16]},
      titleProps: {
        fontSize: 'titleL',
        customColor: '#ffffff',
      },
      subTitleProps: {
        fontSize: 'bodyS',
        customColor: '#999999',
      },
      onOptionPress: () => console.log('Styled!'),
    },
  ]}
>
  <Text>Styled Menu</Text>
</MenuModal>
```

### Using Native Modal or Portal

```tsx
// Use native modal (default behavior via SpotModal)
<MenuModal
  backgroundColor="#ffffff"
  disableNativeModal={false}
  options={[...]}
>
  <Text>Native Modal</Text>
</MenuModal>

// Disable portal rendering (renders inline)
<MenuModal
  backgroundColor="#ffffff"
  disablePortal={true}
  options={[...]}
>
  <Text>Inline Modal</Text>
</MenuModal>
```

## API Reference

### MenuModal Props

| Prop                    | Type                                           | Default      | Description                                                                                        |
| ----------------------- | ---------------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------- |
| `children`              | `ReactNode`                                    | **required** | The component that triggers the menu                                                               |
| `options`               | `MenuOption[]`                                 | **required** | Array of menu options                                                                              |
| `backgroundColor`       | `string`                                       | **required** | Background color of the menu                                                                       |
| `activateOn`            | `'press' \| 'long-press'`                      | `'press'`    | How to trigger the menu                                                                            |
| `onPress`               | `() => void \| Promise<void>`                  | `undefined`  | Callback when trigger is pressed                                                                   |
| `onLongPress`           | `() => void \| Promise<void>`                  | `undefined`  | Callback when trigger is long-pressed                                                              |
| `separatorStyle`        | `ViewStyle`                                    | `undefined`  | Custom style for option separators                                                                 |
| `disableDismissOnPress` | `boolean`                                      | `false`      | Prevent menu from dismissing on option press                                                       |
| `disablePortal`         | `boolean`                                      | `false`      | Disable portal rendering (even if provider exists). Falls back to native modal or inline rendering |
| `disableNativeModal`    | `boolean`                                      | `false`      | Disable native Modal component. Only use portal (if provider exists) or inline rendering           |
| `refMenuModal`          | `React.MutableRefObject<MenuModalRef \| null>` | `undefined`  | Ref for imperative control                                                                         |
| `scrollable`            | `boolean`                                      | `false`      | Enable scrolling for long menus                                                                    |
| `maxHeight`             | `number`                                       | `undefined`  | Maximum height when scrollable                                                                     |
| `padding`               | `number \| [number, number]`                   | `[2, 5]`     | Menu padding                                                                                       |
| `borderRadius`          | `number`                                       | `15`         | Menu border radius                                                                                 |
| `...LayoutProps`        | `LayoutProps`                                  | -            | Additional layout props from `@shaquillehinds/react-native-essentials`                             |

### MenuOption Interface

| Property                      | Type                                              | Description                                       |
| ----------------------------- | ------------------------------------------------- | ------------------------------------------------- |
| `id`                          | `string`                                          | Unique identifier for the option                  |
| `title`                       | `string`                                          | **required** - Main text of the option            |
| `subTitle`                    | `string`                                          | Optional subtitle text                            |
| `leftComponent`               | `ReactNode`                                       | Component to render on the left (e.g., icon)      |
| `rightComponent`              | `ReactNode`                                       | Component to render on the right (e.g., shortcut) |
| `onOptionPress`               | `(info: MenuOptionInfo) => void \| Promise<void>` | Handler for press events                          |
| `onOptionLongPress`           | `(info: MenuOptionInfo) => void \| Promise<void>` | Handler for long-press events                     |
| `disableDismissOnOptionPress` | `boolean`                                         | Prevent dismissal when this option is pressed     |
| `titleProps`                  | `MenuOptionTitleTextProps`                        | Custom props for title text                       |
| `subTitleProps`               | `MenuOptionBodyTextProps`                         | Custom props for subtitle text                    |
| `...LayoutProps`              | `LayoutProps`                                     | Additional layout props for the option container  |

### MenuOptionInfo

The callback parameter passed to `onOptionPress` and `onOptionLongPress`:

```typescript
{
  id?: string;
  title: string;
  subTitle?: string;
  index: number;
  dismiss: () => void;
}
```

### MenuModalRef Methods

| Method  | Parameters                         | Description                            |
| ------- | ---------------------------------- | -------------------------------------- |
| `open`  | `{ pageX: number, pageY: number }` | Opens the menu at specific coordinates |
| `close` | -                                  | Closes the menu                        |

### Text Styling Props

#### MenuOptionTitleTextProps

Extends `BaseTextProps` from `@shaquillehinds/react-native-essentials` with:

- `fontSize?: 'titleS' | 'titleL'`

#### MenuOptionBodyTextProps

Extends `BaseTextProps` from `@shaquillehinds/react-native-essentials` with:

- `fontSize?: 'bodyS' | 'bodyL'`

## Advanced Usage

### Using Portal Hooks

The package exports portal utilities from `@shaquillehinds/react-native-spot-modal` for advanced use cases:

```tsx
import {
  useMenuModalPortal,
  useMenuModalPortalComponent,
  type PortalItem,
} from '@shaquillehinds/react-native-menu-modal';

function MyComponent() {
  // Access the portal API directly
  const portal = useMenuModalPortal();

  // Add a component to the portal
  const addToPortal = () => {
    const portalItem: PortalItem = {
      id: 'my-custom-overlay',
      component: <MyCustomOverlay />,
    };
    portal.add(portalItem);
  };

  // Remove from portal
  const removeFromPortal = () => {
    portal.remove('my-custom-overlay');
  };

  return (
    <View>
      <Button title="Show Overlay" onPress={addToPortal} />
      <Button title="Hide Overlay" onPress={removeFromPortal} />
    </View>
  );
}
```

**Using `useMenuModalPortalComponent` for Reusable Portal Components:**

```tsx
import { useMenuModalPortalComponent } from '@shaquillehinds/react-native-menu-modal';

function MyPortalComponent() {
  // Automatically manages adding/removing from portal
  useMenuModalPortalComponent({
    id: 'notification-toast',
    component: (
      <View style={styles.toast}>
        <Text>This is rendered in the portal!</Text>
      </View>
    ),
  });

  return null; // This component doesn't render anything directly
}

// Use it anywhere in your app
function App() {
  const [showToast, setShowToast] = useState(false);

  return (
    <MenuModalPortalProvider>
      {showToast && <MyPortalComponent />}
      <Button title="Show Toast" onPress={() => setShowToast(true)} />
    </MenuModalPortalProvider>
  );
}
```

> **Note:** These hooks are useful for custom overlay components or when you need more control over portal rendering. For most menu use cases, the standard `MenuModal` component handles portal management automatically.

### Dynamic Options

```tsx
const [options, setOptions] = useState([
  { title: 'Option 1', id: '1', onOptionPress: () => console.log('1') },
  { title: 'Option 2', id: '2', onOptionPress: () => console.log('2') },
]);

const addOption = () => {
  setOptions((prev) => [
    ...prev,
    {
      title: `Option ${prev.length + 1}`,
      id: `${prev.length + 1}`,
      onOptionPress: () => console.log(prev.length + 1),
    },
  ]);
};

return (
  <>
    <Button title="Add Option" onPress={addOption} />
    <MenuModal backgroundColor="#1a1a1a" options={options}>
      <Text>Dynamic Menu</Text>
    </MenuModal>
  </>
);
```

### Async Operations

```tsx
<MenuModal
  backgroundColor="#2a2a2a"
  options={[
    {
      title: 'Save',
      onOptionPress: async ({ dismiss }) => {
        // Perform async operation
        await saveData();
        // Dismiss after completion
        dismiss();
      },
    },
  ]}
>
  <Text>Save Menu</Text>
</MenuModal>
```

### Conditional Options

```tsx
const isAdmin = true;

<MenuModal
  backgroundColor="#ffffff"
  options={[
    {
      title: 'View',
      onOptionPress: () => console.log('View'),
    },
    ...(isAdmin
      ? [
          {
            title: 'Edit',
            onOptionPress: () => console.log('Edit'),
          },
          {
            title: 'Delete',
            onOptionPress: () => console.log('Delete'),
          },
        ]
      : []),
  ]}
>
  <Text>Conditional Menu</Text>
</MenuModal>;
```

### Nested Information

```tsx
<MenuModal
  backgroundColor="#1a1a1a"
  options={[
    {
      title: 'File Size',
      subTitle: '2.4 MB',
      leftComponent: <Feather name="file" size={18} color="#888" />,
      rightComponent: <Text style={{ color: '#666', fontSize: 12 }}>PDF</Text>,
      onOptionPress: () => console.log('File info'),
    },
    {
      title: 'Last Modified',
      subTitle: 'December 10, 2024',
      leftComponent: <Feather name="clock" size={18} color="#888" />,
      onOptionPress: () => console.log('Date info'),
    },
  ]}
>
  <Text>Document Info</Text>
</MenuModal>
```

## Tips & Best Practices

### Performance

- Use `id` prop on options for optimal React rendering
- Memoize option handlers if they're complex
- Consider using `disableDismissOnPress` for multi-step operations

```tsx
const handleEdit = useCallback(({ title, dismiss }) => {
  console.log(`Editing ${title}`);
  dismiss();
}, []);

const options = useMemo(
  () => [{ id: 'edit', title: 'Edit', onOptionPress: handleEdit }],
  [handleEdit]
);
```

### Accessibility

- Always provide descriptive titles
- Use subtitles for additional context
- Consider adding icons for visual clarity
- Test with screen readers

### Styling

- Use consistent `backgroundColor` across your app
- Match your app's design system with `titleProps` and `subTitleProps`
- Customize `separatorStyle` to match your theme
- Consider dark/light mode support

```tsx
const isDark = useColorScheme() === 'dark';

<MenuModal
  backgroundColor={isDark ? '#1a1a1a' : '#ffffff'}
  options={options.map((opt) => ({
    ...opt,
    titleProps: {
      customColor: isDark ? '#ffffff' : '#000000',
    },
  }))}
>
  <Text>Theme-aware Menu</Text>
</MenuModal>;
```

### Rendering Modes & Portal Usage

The menu modal supports multiple rendering modes with automatic fallback:

**Default Behavior (Automatic Fallback Chain):**

1. **With Portal Provider** → Uses portal layer (best option)
2. **Without Portal Provider** → Falls back to React Native's `Modal` component
3. Both work perfectly fine out of the box!

```tsx
// Works without any provider - uses React Native Modal
<MenuModal
  backgroundColor="#1a1a1a"
  options={[...]}
>
  <Text>Works Immediately!</Text>
</MenuModal>

// With provider - uses portal layer
<MenuModalPortalProvider>
  <MenuModal
    backgroundColor="#1a1a1a"
    options={[...]}
  >
    <Text>Uses Portal Layer</Text>
  </MenuModal>
</MenuModalPortalProvider>
```

**Disabling Native Modal (forces portal or inline):**

```tsx
// If you have a portal provider but want to disable the native modal fallback
<MenuModal
  backgroundColor="#1a1a1a"
  disableNativeModal={true}
  options={[...]}
>
  <Text>Portal Only (no native modal fallback)</Text>
</MenuModal>
```

**Disabling Portal (forces native modal or inline):**

```tsx
// Even with a portal provider present, opt-out to use native modal
<MenuModalPortalProvider>
  <MenuModal
    backgroundColor="#1a1a1a"
    disablePortal={true}
    options={[...]}
  >
    <Text>Skips Portal, Uses Native Modal</Text>
  </MenuModal>
</MenuModalPortalProvider>
```

**Disabling Both (inline rendering only):**

```tsx
// Renders within parent container bounds - useful for specific layouts
<MenuModal
  backgroundColor="#1a1a1a"
  disablePortal={true}
  disableNativeModal={true}
  options={[...]}
>
  <Text>Renders Inline (respects parent overflow/z-index)</Text>
</MenuModal>
```

**When to Use Each Mode:**

| Mode                                                    | Use Case                                                                                       |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Portal** (default with provider)                      | Best for most cases - renders above all content with proper layering                           |
| **Native Modal** (default without provider)             | Automatic fallback - works everywhere, good for full-screen menus                              |
| **Inline** (`disablePortal` + `disableNativeModal`)     | When you need the menu constrained within a specific container or scrollable area              |
| **Portal disabled** (`disablePortal={true}`)            | Opt out of portal when you have the provider but want native modal behavior for specific menus |
| **Native Modal disabled** (`disableNativeModal={true}`) | Force portal-only rendering without native modal fallback                                      |

**Example: Mixed Usage**

```tsx
<MenuModalPortalProvider>
  {/* Uses portal - rendered in top layer */}
  <MenuModal backgroundColor="#1a1a1a" options={normalOptions}>
    <Text>Normal Menu</Text>
  </MenuModal>

  {/* Opts out of portal - uses native modal instead */}
  <MenuModal
    backgroundColor="#1a1a1a"
    disablePortal
    options={fullscreenOptions}
  >
    <Text>Fullscreen Menu</Text>
  </MenuModal>

  <ScrollView>
    {/* Renders inline within ScrollView bounds */}
    <MenuModal
      backgroundColor="#1a1a1a"
      disablePortal
      disableNativeModal
      options={inlineOptions}
    >
      <Text>Constrained Menu</Text>
    </MenuModal>
  </ScrollView>
</MenuModalPortalProvider>
```

> **Summary:** The package is flexible and works immediately without any setup. Add the portal provider for enhanced control, or use the disable props to customize rendering per menu instance.

## Troubleshooting

### Menu not appearing

1. Ensure `backgroundColor` is set (it's required)
2. Check that peer dependencies are installed and properly configured
3. Verify react-native-reanimated is properly configured in `babel.config.js`:
   ```js
   module.exports = {
     presets: ['module:metro-react-native-babel-preset'],
     plugins: ['react-native-reanimated/plugin'], // Must be last
   };
   ```
4. Check console for any errors
5. If using custom `disablePortal` and `disableNativeModal` props, ensure the parent container has appropriate dimensions

### Portal-specific issues

**Note:** The portal provider is **optional** - the menu works fine without it using React Native's Modal component.

**If you choose to use the portal provider:**

- Place `MenuModalPortalProvider` as high as possible in your component tree
- If using React Navigation, place provider outside `NavigationContainer`
- If using Expo Router, place it in `app/_layout.tsx`

**"Cannot read property 'add' of undefined" error:**

- This only occurs if you use portal hooks (`useMenuModalPortal`, `useMenuModalPortalComponent`) without the provider
- The `MenuModal` component itself does NOT require the provider and will work without this error

### Menu position is off

- This is handled by `@shaquillehinds/react-native-spot-modal`
- Ensure the parent container doesn't have unusual transforms
- Check if any absolute positioning is interfering

### TypeScript errors

```bash
# Make sure types are properly installed
npm install --save-dev @types/react @types/react-native
```

### Options not triggering

- Verify `onOptionPress` is defined on the option
- Check if `disableDismissOnPress` is interfering
- Ensure the option isn't disabled via custom props

## Related Packages

- [@shaquillehinds/react-native-essentials](https://www.npmjs.com/package/@shaquillehinds/react-native-essentials) - Core utilities and components
- [@shaquillehinds/react-native-spot-modal](https://www.npmjs.com/package/@shaquillehinds/react-native-spot-modal) - Positioning system used internally

## Contributing

Contributions are welcome! Please read the [contributing guide](CONTRIBUTING.md) and [code of conduct](CODE_OF_CONDUCT.md).

### Development Setup

```bash
# Clone the repository
git clone https://github.com/shaquillehinds/react-native-menu-modal.git

# Install dependencies
cd react-native-menu-modal
npm install

# Build the package
npm run prepare

# Run tests
npm test

# Lint code
npm run lint
```

## License

MIT © [Shaquille Hinds](https://github.com/shaquillehinds)

## Support

- 🐛 [Report bugs](https://github.com/shaquillehinds/react-native-menu-modal/issues)
- 💡 [Request features](https://github.com/shaquillehinds/react-native-menu-modal/issues)
- ⭐ [Star on GitHub](https://github.com/shaquillehinds/react-native-menu-modal)

---

Made with ❤️ by [Shaquille Hinds](https://github.com/shaquillehinds)
