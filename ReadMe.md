# Restaurant Menu Manager 🍽️

A React Native mobile application built with TypeScript and Expo for managing restaurant menus. This app allows chefs and restaurant managers to easily add, view, and manage menu items with a beautiful and intuitive interface.

## Features

### 🏠 Home Screen
- **Dashboard Overview**: View total menu items and total menu value
- **Category Breakdown**: See counts for Starters, Main Courses, and Desserts
- **Average Prices**: Display average prices for each course category
- **Quick Actions**: Easy access to add new dishes or view full menu
- **Recently Added**: Shows recently added menu items

### ➕ Add Dish Screen
- **Form Validation**: Ensures all required fields are filled correctly
- **Duplicate Prevention**: Prevents adding dishes with the same name
- **Category Selection**: Choose from Starter, Main Course, or Dessert
- **Price Input**: Decimal-pad keyboard for easy price entry
- **Auto Image Assignment**: Automatically assigns images based on category

### 📋 View Menu Screen
- **Category Filtering**: Filter dishes by category (All, Starter, Main Course, Dessert)
- **Visual Cards**: Beautiful dish cards with images and details
- **Delete Functionality**: Remove dishes with confirmation dialog
- **Statistics**: Real-time counts for each category
- **Empty States**: Helpful messages when no dishes are available

### 🎨 Design Features
- **Modern UI**: Clean, professional design with shadows and gradients
- **Responsive Layout**: Adapts to different screen sizes
- **Smooth Animations**: Animated navigation buttons and transitions
- **Color-coded Categories**: Different colors for each course type
- **Bottom Navigation**: Easy navigation between main screens

## Changelog

### Added
- **Delete functionality** in View Menu screen
- Confirmation dialog before deleting dishes
- Enhanced dish cards with delete buttons
- Improved dish footer layout for better action placement
- Red delete button with clear visual indication

### Enhanced
- State management for dish deletion
- Prop passing between components for delete functionality
- Better user experience with confirmation prompts
- Updated TypeScript interfaces for delete props

### Initial Release
- **Home Screen**: Dashboard with statistics and quick actions
- **Add Dish Screen**: Form for adding new menu items with validation
- **View Menu Screen**: Category-based menu browsing
- **Navigation**: Custom animated bottom navigation
- **Initial Menu**: 3 pre-loaded dishes across all categories
- **Image Management**: Automatic image assignment by category
- **Responsive Design**: Modern UI with professional styling

### Features
- Duplicate dish prevention
- Form validation with user feedback
- Real-time statistics and averages
- Category filtering and counts
- Smooth animations and transitions
- TypeScript for type safety
- Expo for cross-platform compatibility