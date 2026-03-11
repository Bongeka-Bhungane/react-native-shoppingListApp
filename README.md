<img src="https://socialify.git.ci/Bongeka-Bhungane/react-native-shoppingListApp/image?description=1&font=Raleway&language=1&name=1&owner=1&pattern=Circuit+Board&theme=Light" alt="react-native-shoppingListApp" width="640" height="320" />

# React Native Shopping List App
## Overview

This is a React Native Shopping List App built using Redux for state management. It allows users to add, edit, delete, and mark items as purchased. The app also includes a search feature and persistent storage using AsyncStorage so your shopping list is saved between sessions.

## Features

* Add new items with name and quantity

* Edit existing items

* Delete items from the list

* Mark items as purchased using checkboxes

* Search items by name in real-time

* Persistent storage with AsyncStorage

* Responsive and user-friendly interface

## Installation

Clone the repository:
```
git clone https://github.com/Bongeka-Bhungane/react-native-shoppingListApp
cd react-native-shopping-list
```
Install dependencies:
```
npm install
# or
yarn install
```
Start the app:
```
npx react-native run-android
# or
npx react-native run-ios
```
## Redux State Management

The app uses Redux Toolkit to manage the shopping list state.

## Actions

* addItem({ name, quantity }) – Add a new item

* editItem({ id, name, quantity }) – Edit an existing item

* deleteItem(id) – Delete an item

* togglePurchased(id) – Toggle purchased status

* setItems(items) – Load items from storage

* setSearchQuery(query) – Update the search filter

## Persistence

The shopping list data is stored in AsyncStorage under the key @shopping_list_items. The app loads saved items when reopened and saves any changes automatically.

## Usage

1. Open the app and see the shopping list.

2. Use the Add Item form to add new items with name and quantity.

3. Tap the checkbox to mark items as purchased.

4. Tap edit to change the name or quantity.

5. Tap delete to remove an item.

6. Use the search bar to filter items by name.

## Author

Bongeka Bhungane – Full Stack Developer in training
