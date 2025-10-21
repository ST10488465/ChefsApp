import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeScreen from "./screen/HomeScreen";
import AddMenuScreen from "./screen/AddMenuScreen";
import ViewMenuScreen from "./screen/ViewMenuScreen";

// Import local images from assets
const dishImages = {
  grilledSteak: require("./assets/grilled_steak.jpg"),
  chocolateBrownie: require("./assets/chocolate_brownie.jpg"),
  caesarSalad: require("./assets/salad.jpg"),
  fishAndChips: require("./assets/fish_and_chips.jpg"),
  cheeseCake: require("./assets/cheese_cake.jpg"),
  restaurantLogo: require("./assets/restaurant_logo.png"), 
};

// Type definitions
type CourseType = "Starter" | "Main Course" | "Dessert";
type Dish = {
  id: string;
  name: string;
  description: string;
  course: CourseType;
  price: number;
  image: any;
};

type ScreenType = "home" | "addDish" | "viewMenu";

// Initial menu items
const initialMenu: Dish[] = [
  {
    id: "1",
    name: "Grilled Steak",
    description: "Juicy grilled steak with roasted vegetables and pepper sauce",
    course: "Main Course",
    price: 185,
    image: dishImages.grilledSteak,
  },
  {
    id: "2",
    name: "Chocolate Brownie",
    description: "Warm chocolate brownie with vanilla ice cream topping",
    course: "Dessert",
    price: 65,
    image: dishImages.chocolateBrownie,
  },
  {
    id: "3",
    name: "Caesar Salad",
    description: "Fresh Caesar salad with a delicious homemade dressing",
    course: "Starter",
    price: 50,
    image: dishImages.caesarSalad,
  },
];

// Navigation Button Component
const NavButton = ({ 
  icon, 
  label, 
  isActive, 
  onPress 
}: { 
  icon: string; 
  label: string; 
  isActive: boolean; 
  onPress: () => void;
}) => {
  const [scaleValue] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.92,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 12,
    }).start();
  };

  return (
    <Pressable 
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.navButtonContainer}
    >
      <Animated.View 
        style={[
          styles.navButton,
          isActive && styles.activeNavButton,
          { transform: [{ scale: scaleValue }] }
        ]}
      >
        <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
          <Text style={[styles.navIcon, isActive && styles.activeNavIcon]}>
            {icon}
          </Text>
        </View>
        <Text style={[styles.navLabel, isActive && styles.activeNavLabel]}>
          {label}
        </Text>
        {isActive && <View style={styles.activeIndicator} />}
      </Animated.View>
    </Pressable>
  );
};

export default function App() {
  // State management
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("home");
  const [dishes, setDishes] = useState<Dish[]>(initialMenu);

  // Navigation function
  const navigateTo = (screen: ScreenType) => {
    setCurrentScreen(screen);
  };

  // Function to add new dish
  const handleAddDish = (newDish: Dish) => {
    setDishes(prev => [newDish, ...prev]);
  };

  // Main render with navigation
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {currentScreen === "home" && (
            <HomeScreen 
              dishes={dishes}
              initialMenu={initialMenu}
              navigateTo={navigateTo}
              restaurantLogo={dishImages.restaurantLogo}
            />
          )}
          {currentScreen === "addDish" && (
            <AddMenuScreen 
              dishes={dishes}
              onAddDish={handleAddDish}
              navigateTo={navigateTo}
              dishImages={{
                caesarSalad: dishImages.caesarSalad,
                fishAndChips: dishImages.fishAndChips,
                cheeseCake: dishImages.cheeseCake,
              }}
            />
          )}
          {currentScreen === "viewMenu" && (
            <ViewMenuScreen dishes={dishes} />
          )}
        </ScrollView>

        {/* Enhanced Bottom Navigation */}
        <View style={styles.bottomNavWrapper}>
          <View style={styles.bottomNav}>
            <NavButton 
              icon="🏠"
              label="Home"
              isActive={currentScreen === "home"}
              onPress={() => navigateTo("home")}
            />
            <NavButton 
              icon="➕"
              label="Add Dish"
              isActive={currentScreen === "addDish"}
              onPress={() => navigateTo("addDish")}
            />
            <NavButton 
              icon="📋"
              label="Menu"
              isActive={currentScreen === "viewMenu"}
              onPress={() => navigateTo("viewMenu")}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Enhanced Stylesheet
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  mainContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  // Enhanced Bottom Navigation
  bottomNavWrapper: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 20,
  },
  bottomNav: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 12,
    paddingBottom: 8,
    justifyContent: "space-around",
    alignItems: "center",
  },
  navButtonContainer: {
    flex: 1,
    alignItems: "center",
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    minWidth: 80,
    position: "relative",
  },
  activeNavButton: {
    backgroundColor: "rgba(52, 152, 219, 0.1)",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  activeIconContainer: {
    backgroundColor: "#3498db",
    shadowColor: "#3498db",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  navIcon: {
    fontSize: 24,
  },
  activeNavIcon: {
    fontSize: 26,
  },
  navLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#7f8c8d",
    marginTop: 4,
  },
  activeNavLabel: {
    color: "#3498db",
    fontWeight: "700",
    fontSize: 13,
  },
  activeIndicator: {
    position: "absolute",
    top: 0,
    width: 32,
    height: 3,
    backgroundColor: "#3498db",
    borderRadius: 2,
  },
});
