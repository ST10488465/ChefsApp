import React, { useState } from "react";
import { View, Text, Image, Pressable, StyleSheet, ScrollView } from "react-native";

type CourseType = "Starter" | "Main Course" | "Dessert";
type Dish = {
    id: string;
    name: string;
    description: string;
    course: CourseType;
    price: number;
    image: any;
};

interface ViewMenuScreenProps {
    dishes: Dish[];
}

const categories: CourseType[] = ["Starter", "Main Course", "Dessert"];

const ViewMenuScreen: React.FC<ViewMenuScreenProps> = ({ dishes }) => {
    const [activeCategory, setActiveCategory] = useState<CourseType | "All">("All");

    // Filter dishes by category
    const filteredDishes = activeCategory === "All"
        ? dishes
        : dishes.filter(dish => dish.course === activeCategory);

    // Calculate statistics
    const totalMenuItems = dishes.length;
    const starterCount = dishes.filter(dish => dish.course === "Starter").length;
    const mainCourseCount = dishes.filter(dish => dish.course === "Main Course").length;
    const dessertCount = dishes.filter(dish => dish.course === "Dessert").length;

    // Helper function for course colors
    const getCourseColor = (course: CourseType): string => {
        if (course === "Starter") return "#FFA726";
        if (course === "Main Course") return "#42A5F5";
        if (course === "Dessert") return "#66BB6A";
        return "#999999";
    };

    return (
        <View style={styles.screenContainer}>
            <View style={styles.screenHeader}>
                <Text style={styles.screenTitle}>Menu Overview</Text>
            </View>

            {/* Menu Filter */}
            <View style={styles.filterContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <Pressable
                        style={[
                            styles.filterPill,
                            activeCategory === "All" && styles.activeFilterPill,
                        ]}
                        onPress={() => setActiveCategory("All")}
                    >
                        <Text style={[
                            styles.filterText,
                            activeCategory === "All" && styles.activeFilterText,
                        ]}>
                            All Menu ({totalMenuItems})
                        </Text>
                    </Pressable>
                    {categories.map(cat => (
                        <Pressable
                            key={cat}
                            style={[
                                styles.filterPill,
                                activeCategory === cat && styles.activeFilterPill,
                            ]}
                            onPress={() => setActiveCategory(cat)}
                        >
                            <Text style={[
                                styles.filterText,
                                activeCategory === cat && styles.activeFilterText,
                            ]}>
                                {cat} ({cat === "Starter" ? starterCount : cat === "Main Course" ? mainCourseCount : dessertCount})
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>

            {/* Menu Items List */}
            <View style={styles.listCard}>
                <Text style={styles.sectionTitle}>
                    {activeCategory === "All" ? "Full Menu" : activeCategory + "s"}
                    <Text style={styles.itemCount}> ({filteredDishes.length} items)</Text>
                </Text>

                {filteredDishes.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyEmoji}>🍽️</Text>
                        <Text style={styles.emptyText}>No dishes found</Text>
                        <Text style={styles.emptySubtext}>Add some dishes to your menu</Text>
                    </View>
                ) : (
                    <ScrollView style={styles.dishesScrollView} showsVerticalScrollIndicator={false}>
                        <View style={styles.dishesGrid}>
                            {filteredDishes.map((item) => (
                                <View key={item.id} style={styles.dishCard}>
                                    <Image source={item.image} style={styles.dishImage} />
                                    <View style={styles.dishContent}>
                                        <View style={styles.dishHeader}>
                                            <Text style={styles.dishName}>{item.name}</Text>
                                            <Text style={styles.dishPrice}>R{item.price}</Text>
                                        </View>
                                        <Text style={styles.dishDescription}>{item.description}</Text>
                                        <View style={[
                                            styles.courseBadge,
                                            { backgroundColor: getCourseColor(item.course) }
                                        ]}>
                                            <Text style={styles.courseBadgeText}>{item.course}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>

                        {/* Bottom spacing for navigation */}
                        <View style={styles.bottomSpacer} />
                    </ScrollView>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        paddingBottom: 10,
    },
    screenHeader: {
        flexDirection: "row",
        alignItems: "center",
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
    screenTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#2c3e50",
        flex: 1,
        textAlign: "center",
    },
    filterContainer: {
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    filterPill: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: "#f8f9fa",
        borderWidth: 1,
        borderColor: "#e9ecef",
        marginRight: 8,
    },
    activeFilterPill: {
        backgroundColor: "#3498db",
        borderColor: "#3498db",
    },
    filterText: {
        color: "#7f8c8d",
        fontWeight: "600",
        fontSize: 14,
    },
    activeFilterText: {
        color: "#ffffff",
    },
    listCard: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        margin: 16,
        marginTop: 0,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        flex: 1,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#2c3e50",
        marginBottom: 16,
    },
    itemCount: {
        color: "#7f8c8d",
        fontWeight: "normal",
    },
    emptyState: {
        alignItems: "center",
        padding: 40,
    },
    emptyEmoji: {
        fontSize: 48,
        marginBottom: 16,
    },
    emptyText: {
        fontSize: 18,
        color: "#7f8c8d",
        fontWeight: "600",
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: "#bdc3c7",
        textAlign: "center",
    },
    dishesScrollView: {
        flex: 1,
    },
    dishesGrid: {
        gap: 16,
    },
    dishCard: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#e9ecef",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    dishImage: {
        width: "100%",
        height: 160,
    },
    dishContent: {
        padding: 16,
    },
    dishHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 8,
    },
    dishName: {
        fontWeight: "700",
        fontSize: 18,
        color: "#2c3e50",
        flex: 1,
        marginRight: 8,
    },
    dishPrice: {
        color: "#27ae60",
        fontSize: 18,
        fontWeight: "bold",
    },
    dishDescription: {
        color: "#7f8c8d",
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 12,
    },
    courseBadge: {
        alignSelf: "flex-start",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    courseBadgeText: {
        color: "#ffffff",
        fontSize: 12,
        fontWeight: "bold",
    },
    bottomSpacer: {
        height: 20,
    },
});

export default ViewMenuScreen;