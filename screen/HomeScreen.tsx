import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";

type CourseType = "Starter" | "Main Course" | "Dessert";
type Dish = {
  id: string;
  name: string;
  description: string;
  course: CourseType;
  price: number;
  image: any;
};

interface HomeScreenProps {
  dishes: Dish[];
  initialMenu: Dish[];
  navigateTo: (screen: "home" | "addDish" | "viewMenu") => void;
  restaurantLogo: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  dishes,
  initialMenu,
  navigateTo,
  restaurantLogo,
}) => {
  // Calculate statistics
  const totalMenuItems = dishes.length;
  const starterCount = dishes.filter(dish => dish.course === "Starter").length;
  const mainCourseCount = dishes.filter(dish => dish.course === "Main Course").length;
  const dessertCount = dishes.filter(dish => dish.course === "Dessert").length;
  const totalMenuValue = dishes.reduce((total, dish) => total + dish.price, 0);

  // Calculate average prices by course
  const calculateAveragePrice = (course: CourseType) => {
    const courseDishes = dishes.filter(dish => dish.course === course);
    if (courseDishes.length === 0) return 0;
    const total = courseDishes.reduce((sum, dish) => sum + dish.price, 0);
    return total / courseDishes.length;
  };

  const averageStarterPrice = calculateAveragePrice("Starter");
  const averageMainCoursePrice = calculateAveragePrice("Main Course");
  const averageDessertPrice = calculateAveragePrice("Dessert");

  // Format currency
  const formatCurrency = (amount: number) => {
    return `R${amount.toFixed(2)}`;
  };

  return (
    <View style={styles.screenContainer}>
      {/* Header with Logo and Greeting */}
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Image source={restaurantLogo} style={styles.logo} />
          <Text style={styles.appTitle}>Menu Manager</Text>
        </View>
        <Text style={styles.greeting}>Welcome, Chef Christoffel!</Text>
        <Text style={styles.subtitle}>Manage your restaurant menu with ease</Text>
      </View>

      {/* Statistics Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{totalMenuItems}</Text>
            <Text style={styles.statLabel}>Total Items</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>R{totalMenuValue}</Text>
            <Text style={styles.statLabel}>Total Value</Text>
          </View>
        </View>

        {/* Category Breakdown */}
        <View style={styles.categoryStats}>
          <View style={styles.categoryStatItem}>
            <View style={[styles.categoryDot, { backgroundColor: "#FFA726" }]} />
            <Text style={styles.categoryStatText}>Starters: {starterCount}</Text>
          </View>
          <View style={styles.categoryStatItem}>
            <View style={[styles.categoryDot, { backgroundColor: "#42A5F5" }]} />
            <Text style={styles.categoryStatText}>Mains: {mainCourseCount}</Text>
          </View>
          <View style={styles.categoryStatItem}>
            <View style={[styles.categoryDot, { backgroundColor: "#66BB6A" }]} />
            <Text style={styles.categoryStatText}>Desserts: {dessertCount}</Text>
          </View>
        </View>

        {/* Average Prices by Course */}
        <View style={styles.averagePricesSection}>
          <Text style={styles.averagePricesTitle}>Average Prices by Course</Text>
          <View style={styles.averagePricesContainer}>
            <View style={styles.averagePriceItem}>
              <Text style={styles.averagePriceLabel}>Starters</Text>
              <Text style={styles.averagePriceValue}>
                {starterCount > 0 ? formatCurrency(averageStarterPrice) : "N/A"}
              </Text>
            </View>
            <View style={styles.averagePriceItem}>
              <Text style={styles.averagePriceLabel}>Main Courses</Text>
              <Text style={styles.averagePriceValue}>
                {mainCourseCount > 0 ? formatCurrency(averageMainCoursePrice) : "N/A"}
              </Text>
            </View>
            <View style={styles.averagePriceItem}>
              <Text style={styles.averagePriceLabel}>Desserts</Text>
              <Text style={styles.averagePriceValue}>
                {dessertCount > 0 ? formatCurrency(averageDessertPrice) : "N/A"}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionButtons}>
          <Pressable
            style={styles.actionButton}
            onPress={() => navigateTo("addDish")}
          >
            <Text style={styles.actionButtonIcon}>➕</Text>
            <Text style={styles.actionButtonText}>Add New Dish</Text>
          </Pressable>

          <Pressable
            style={styles.actionButton}
            onPress={() => navigateTo("viewMenu")}
          >
            <Text style={styles.actionButtonIcon}>📋</Text>
            <Text style={styles.actionButtonText}>View Full Menu</Text>
          </Pressable>
        </View>
      </View>

      {/* Recently Added Section */}
      {dishes.length > initialMenu.length && (
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recently Added</Text>
          <View style={styles.recentDishes}>
            {dishes
              .filter(dish => !initialMenu.some(initial => initial.id === dish.id))
              .slice(0, 2)
              .map(dish => (
                <View key={dish.id} style={styles.recentDish}>
                  <Image source={dish.image} style={styles.recentImage} />
                  <View style={styles.recentInfo}>
                    <Text style={styles.recentName}>{dish.name}</Text>
                    <Text style={styles.recentPrice}>R{dish.price}</Text>
                    <Text style={styles.recentCourse}>{dish.course}</Text>
                  </View>
                </View>
              ))}
          </View>
        </View>
      )}
      
      {/* Bottom spacing for navigation */}
      <View style={styles.bottomSpacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingBottom: 10,
  },
  headerContainer: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 8,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  greeting: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3498db",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    color: "#7f8c8d",
    fontSize: 16,
    textAlign: "center",
  },
  statsContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  statCard: {
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 12,
    minWidth: 120,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#7f8c8d",
    fontWeight: "600",
  },
  categoryStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  categoryStatItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  categoryStatText: {
    fontSize: 12,
    color: "#7f8c8d",
  },
  averagePricesSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#ecf0f1",
  },
  averagePricesTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 12,
    textAlign: "center",
  },
  averagePricesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  averagePriceItem: {
    alignItems: "center",
    flex: 1,
  },
  averagePriceLabel: {
    fontSize: 12,
    color: "#7f8c8d",
    marginBottom: 4,
    textAlign: "center",
  },
  averagePriceValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#27ae60",
  },
  actionsContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#3498db",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 8,
    shadowColor: "#3498db",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  recentSection: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  recentDishes: {
    flexDirection: "row",
    gap: 12,
  },
  recentDish: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 12,
  },
  recentImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  recentInfo: {
    flex: 1,
  },
  recentName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 2,
  },
  recentPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#27ae60",
    marginBottom: 2,
  },
  recentCourse: {
    fontSize: 12,
    color: "#7f8c8d",
  },
  bottomSpacer: {
    height: 20,
  },
});

export default HomeScreen;