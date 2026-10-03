import { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Animated,
  FlatList,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

const COLORS = {
  header: '#181818',
  background: '#0A0A0A',
  input: '#262626',
  inputBorder: '#0D0D0D',
  placeholder: '#7A7A7A',
  badge: '#333333',
  text: '#F5F5F5',
  teal: '#00CBCE',
  blue: '#109AE5',
  button: '#007CB5',
  card: '#181818',
  cardBorder: '#333333',
  cardBorderDone: '#262626',
  danger: '#B0403B',
  emptyIcon: '#3D3D3D',
  white: '#FFFFFF',
};

const SCREEN_PADDING = 24;
const DELETE_WIDTH = 48;
const DELETE_OVERLAP = 8;

function Header() {
  return (
    <View style={styles.header}>
      <Image
        source={require('./assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

function Input(props) {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor={COLORS.placeholder}
      {...props}
    />
  );
}

function Button(props) {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel="Adicionar item"
      {...props}
    >
      <View style={styles.plusCircle}>
        <View style={styles.plusHorizontal} />
        <View style={styles.plusVertical} />
      </View>
    </TouchableOpacity>
  );
}

function Label({ title, count, color }) {
  return (
    <View style={styles.label}>
      <Text style={[styles.labelTitle, { color }]}>{title}</Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{count}</Text>
      </View>
    </View>
  );
}

function Checkbox({ checked }) {
  return (
    <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
      {checked && <View style={styles.checkMark} />}
    </View>
  );
}

function TrashIcon() {
  return (
    <View style={styles.trash}>
      <View style={styles.trashHandle} />
      <View style={styles.trashLid} />
      <View style={styles.trashBody} />
    </View>
  );
}

function Item({ item, onToggle, onRemove }) {
  const { width } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;

  const deleteOpacity = scrollX.interpolate({
    inputRange: [0, DELETE_OVERLAP],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <Animated.ScrollView
      horizontal
      style={styles.item}
      contentContainerStyle={styles.itemContent}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      overScrollMode="never"
      snapToOffsets={[0, DELETE_WIDTH]}
      decelerationRate="fast"
      keyboardShouldPersistTaps="handled"
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: true }
      )}
    >
      <Animated.View style={[styles.delete, { opacity: deleteOpacity }]}>
        <TouchableOpacity
          style={styles.deleteButton}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Apagar item"
          onPress={onRemove}
        >
          <TrashIcon />
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity
        style={[
          styles.card,
          { width: width - SCREEN_PADDING * 2 },
          item.done && styles.cardDone,
        ]}
        activeOpacity={0.7}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: item.done }}
        onPress={onToggle}
      >
        <Checkbox checked={item.done} />
        <Text style={[styles.itemText, item.done && styles.itemTextDone]}>
          {item.text}
        </Text>
      </TouchableOpacity>
    </Animated.ScrollView>
  );
}

function EmptyList() {
  return (
    <View style={styles.empty}>
      <View style={styles.clipboard}>
        <View style={styles.clipboardClip} />
        <View style={styles.clipboardLine} />
        <View style={styles.clipboardLine} />
        <View style={[styles.clipboardLine, styles.clipboardLineShort]} />
      </View>
      <Text style={styles.emptyTitle}>Sua lista ainda está vazia</Text>
      <Text style={styles.emptyText}>Adicione algo para se organizar</Text>
    </View>
  );
}

export default function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const pending = items.filter((item) => !item.done);
  const done = items.filter((item) => item.done);

  function handleAdd() {
    const text = newItem.trim();
    if (!text) return;

    setItems((current) => [
      { id: Date.now().toString(), text, done: false },
      ...current,
    ]);
    setNewItem('');
  }

  function handleToggle(id) {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  }

  function handleRemove(id) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  return (
    <Pressable
      style={styles.container}
      onPress={Keyboard.dismiss}
      accessible={false}
    >
      <StatusBar style="light" />

      <Header />

      <View style={styles.form}>
        <Input
          placeholder="Adicione algo a sua lista"
          value={newItem}
          onChangeText={setNewItem}
          onSubmitEditing={handleAdd}
          returnKeyType="done"
          submitBehavior="submit"
        />
        <Button onPress={handleAdd} />
      </View>

      <View style={styles.labels}>
        <Label title="Criadas" count={items.length} color={COLORS.teal} />
        <Label title="Concluídas" count={done.length} color={COLORS.blue} />
      </View>

      <View style={styles.divider} />

      <FlatList
        data={[...pending, ...done]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Item
            item={item}
            onToggle={() => handleToggle(item.id)}
            onRemove={() => handleRemove(item.id)}
          />
        )}
        ListEmptyComponent={EmptyList}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    height: 173,
    paddingTop: 71,
    alignItems: 'center',
    backgroundColor: COLORS.header,
  },
  logo: {
    width: 118,
    height: 32,
  },

  form: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: -31,
    paddingHorizontal: SCREEN_PADDING,
  },
  input: {
    flex: 1,
    height: 54,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    backgroundColor: COLORS.input,
    color: COLORS.text,
    fontSize: 16,
  },
  button: {
    width: 52,
    height: 52,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.button,
  },
  plusCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: COLORS.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusHorizontal: {
    position: 'absolute',
    width: 7,
    height: 1.5,
    backgroundColor: COLORS.text,
  },
  plusVertical: {
    position: 'absolute',
    width: 1.5,
    height: 7,
    backgroundColor: COLORS.text,
  },

  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
    paddingHorizontal: SCREEN_PADDING,
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  labelTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: COLORS.badge,
  },
  badgeText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    marginTop: 20,
    marginHorizontal: SCREEN_PADDING,
    backgroundColor: COLORS.cardBorder,
  },

  list: {
    gap: 8,
    paddingTop: 8,
    paddingBottom: 40,
  },

  item: {
    marginRight: SCREEN_PADDING,
  },
  itemContent: {
    paddingLeft: SCREEN_PADDING,
    paddingRight: DELETE_WIDTH,
  },
  card: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    paddingVertical: 12,
    paddingLeft: 15,
    paddingRight: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.card,
  },
  cardDone: {
    borderColor: COLORS.cardBorderDone,
  },
  itemText: {
    flex: 1,
    color: COLORS.text,
    fontSize: 14,
    lineHeight: 20,
  },
  itemTextDone: {
    color: COLORS.placeholder,
    textDecorationLine: 'line-through',
  },

  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: COLORS.teal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    borderColor: COLORS.blue,
    backgroundColor: COLORS.blue,
  },
  checkMark: {
    width: 5,
    height: 8.5,
    marginTop: -2,
    borderRightWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: COLORS.text,
    transform: [{ rotate: '45deg' }],
  },

  delete: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: DELETE_WIDTH + DELETE_OVERLAP,
  },
  deleteButton: {
    flex: 1,
    paddingLeft: DELETE_OVERLAP,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: COLORS.danger,
  },
  trash: {
    alignItems: 'center',
  },
  trashHandle: {
    width: 7,
    height: 4,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderColor: COLORS.white,
  },
  trashLid: {
    width: 14,
    height: 2,
    borderRadius: 1,
    backgroundColor: COLORS.white,
  },
  trashBody: {
    width: 11,
    height: 11,
    borderWidth: 2,
    borderTopWidth: 0,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    borderColor: COLORS.white,
  },

  empty: {
    alignItems: 'center',
    paddingTop: 44,
  },
  clipboard: {
    width: 41,
    height: 51,
    gap: 4.5,
    paddingTop: 15,
    paddingLeft: 8,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: COLORS.emptyIcon,
  },
  clipboardClip: {
    position: 'absolute',
    top: -7,
    left: 6.5,
    width: 22,
    height: 9,
    borderWidth: 3,
    borderRadius: 4.5,
    borderColor: COLORS.emptyIcon,
    backgroundColor: COLORS.background,
  },
  clipboardLine: {
    width: 19,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: COLORS.emptyIcon,
  },
  clipboardLineShort: {
    width: 11,
  },
  emptyTitle: {
    marginTop: 16,
    color: COLORS.placeholder,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 'bold',
  },
  emptyText: {
    color: COLORS.placeholder,
    fontSize: 14,
    lineHeight: 20,
  },
});
