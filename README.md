# @shaquillehinds/react-native-menu-modal

[![npm version](https://img.shields.io/npm/v/@shaquillehinds/react-native-menu-modal.svg)](https://www.npmjs.com/package/@shaquillehinds/react-native-menu-modal)
[![license](https://img.shields.io/npm/l/@shaquillehinds/react-native-menu-modal.svg)](https://github.com/shaquillehinds/react-native-menu-modal/blob/main/LICENSE)

A simple, elegant context menu modal for React Native that appears at the touch location. Perfect for creating contextual menus, dropdown options, and interactive lists triggered by press or long-press gestures.

## Features

- 🎯 **Position-aware** - Opens at exact touch coordinates
- ⚡ **Flexible activation** - Trigger on press or long-press
- 🎨 **Highly customizable** - Style every aspect of the menu
- 📱 **Cross-platform** - Works seamlessly on iOS and Android
- 🔧 **TypeScript support** - Fully typed for excellent DX
- 🚀 **Performant** - Built with react-native-reanimated and gesture-handler
- 🎭 **Portal support** - Render menus in a portal layer or native modal
- ♿ **Accessible** - Supports subtitles and custom components

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

| Prop                    | Type                                           | Default      | Description                                                            |
| ----------------------- | ---------------------------------------------- | ------------ | ---------------------------------------------------------------------- |
| `children`              | `ReactNode`                                    | **required** | The component that triggers the menu                                   |
| `options`               | `MenuOption[]`                                 | **required** | Array of menu options                                                  |
| `backgroundColor`       | `string`                                       | **required** | Background color of the menu                                           |
| `activateOn`            | `'press' \| 'long-press'`                      | `'press'`    | How to trigger the menu                                                |
| `onPress`               | `() => void \| Promise<void>`                  | `undefined`  | Callback when trigger is pressed                                       |
| `onLongPress`           | `() => void \| Promise<void>`                  | `undefined`  | Callback when trigger is long-pressed                                  |
| `separatorStyle`        | `ViewStyle`                                    | `undefined`  | Custom style for option separators                                     |
| `disableDismissOnPress` | `boolean`                                      | `false`      | Prevent menu from dismissing on option press                           |
| `disablePortal`         | `boolean`                                      | `false`      | Disable portal rendering                                               |
| `disableNativeModal`    | `boolean`                                      | `false`      | Disable native modal usage                                             |
| `refMenuModal`          | `React.MutableRefObject<MenuModalRef \| null>` | `undefined`  | Ref for imperative control                                             |
| `scrollable`            | `boolean`                                      | `false`      | Enable scrolling for long menus                                        |
| `maxHeight`             | `number`                                       | `undefined`  | Maximum height when scrollable                                         |
| `padding`               | `number \| [number, number]`                   | `[2, 5]`     | Menu padding                                                           |
| `borderRadius`          | `number`                                       | `15`         | Menu border radius                                                     |
| `...LayoutProps`        | `LayoutProps`                                  | -            | Additional layout props from `@shaquillehinds/react-native-essentials` |

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

### Portal Usage

By default, the menu uses `@shaquillehinds/react-native-spot-modal` which handles positioning. For most cases, you won't need to modify portal settings. However:

- Set `disablePortal={true}` if you need the menu to render within its parent hierarchy
- Set `disableNativeModal={true}` to use RN's built-in Modal component behavior

## Troubleshooting

### Menu not appearing

1. Ensure `backgroundColor` is set (it's required)
2. Check that peer dependencies are installed
3. Verify react-native-reanimated is properly configured
4. Check console for any errors

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
