import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ScrollView } from "react-native";

type CourseType = "Starter" | "Main Course" | "Dessert";
type Dish = {
    id: string;
    name: string;
    description: string;
    course: CourseType;
    price: number;
    image: any;
};

interface AddMenuScreenProps {
    dishes: Dish[];
    onAddDish: (dish: Dish) => void;
    navigateTo: (screen: "home" | "addDish" | "viewMenu") => void;
    dishImages: {
        caesarSalad: any;
        fishAndChips: any;
        cheeseCake: any;
    };
}

const categories: CourseType[] = ["Starter", "Main Course", "Dessert"];

const AddMenuScreen: React.FC<AddMenuScreenProps> = ({
    dishes,
    onAddDish,
    navigateTo,
    dishImages,
}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [course, setCourse] = useState<CourseType>("Main Course");
    const [price, setPrice] = useState("");

    const addDish = () => {
        // Input validation
        if (!name.trim()) {
            Alert.alert("Error", "Please enter a dish name");
            return;
        }

        if (!description.trim()) {
            Alert.alert("Error", "Please enter a description");
            return;
        }

        if (!price.trim()) {
            Alert.alert("Error", "Please enter a price");
            return;
        }

        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            Alert.alert("Error", "Please enter a valid price greater than 0");
            return;
        }

        // Check for duplicate dishes
        const isDuplicate = dishes.some(
            dish => dish.name.toLowerCase() === name.trim().toLowerCase()
        );

        if (isDuplicate) {
            Alert.alert("Duplicate Dish", "This dish already exists in the menu");
            return;
        }

        // Select image based on course type
        let newImage;
        if (course === "Starter") {
            newImage = dishImages.caesarSalad;
        } else if (course === "Main Course") {
            newImage = dishImages.fishAndChips;
        } else {
            newImage = dishImages.cheeseCake;
        }

        // Create new dish object
        const newDish: Dish = {
            id: Date.now().toString(),
            name: name.trim(),
            description: description.trim(),
            course,
            price: parsedPrice,
            image: newImage,
        };

        // Add to dishes list
        onAddDish(newDish);

        // Reset form
        setName("");
        setDescription("");
        setPrice("");
        setCourse("Main Course");

        Alert.alert("Success", "Dish added to menu successfully");

        // Navigate to home screen after success
        navigateTo("home");
    };

    return (
        <View style={styles.screenContainer}>
            <View style={styles.screenHeader}>
                <Text style={styles.screenTitle}>Add New Dish</Text>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.formCard}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter dish name"
                        placeholderTextColor="#999"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={[styles.textInput, styles.textArea]}
                        placeholder="Enter description"
                        placeholderTextColor="#999"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        numberOfLines={3}
                    />

                    {/* Category Selection */}
                    <Text style={styles.label}>Select Category</Text>
                    <View style={styles.categoryRow}>
                        {categories.map((cat) => (
                            <Pressable
                                key={cat}
                                onPress={() => setCourse(cat)}
                                style={[
                                    styles.categoryButton,
                                    course === cat && styles.selectedCategoryButton,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.categoryButtonText,
                                        course === cat && styles.selectedCategoryButtonText,
                                    ]}
                                >
                                    {cat}
                                </Text>
                            </Pressable>
                        ))}
                    </View>

                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter price in Rands"
                        placeholderTextColor="#999"
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="decimal-pad"
                    />

                    <Pressable
                        style={styles.addButton}
                        onPress={addDish}
                    >
                        <Text style={styles.addButtonText}>➕ Add to Menu</Text>
                    </Pressable>
                </View>

                {/* Bottom spacing for navigation */}
                <View style={styles.bottomSpacer} />
            </ScrollView>
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
    scrollView: {
        flex: 1,
    },
    formCard: {
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
    textInput: {
        backgroundColor: "#f8f9fa",
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e9ecef",
        marginBottom: 12,
        fontSize: 16,
        color: "#2c3e50",
    },
    textArea: {
        height: 80,
        textAlignVertical: "top",
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        color: "#2c3e50",
        marginBottom: 8,
    },
    categoryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
        gap: 8,
    },
    categoryButton: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#e9ecef",
        backgroundColor: "#f8f9fa",
        alignItems: "center",
    },
    selectedCategoryButton: {
        borderColor: "#3498db",
        backgroundColor: "#3498db",
    },
    categoryButtonText: {
        color: "#7f8c8d",
        fontWeight: "600",
        fontSize: 14,
    },
    selectedCategoryButtonText: {
        color: "#ffffff",
        fontWeight: "700",
    },
    addButton: {
        backgroundColor: "#27ae60",
        paddingVertical: 16,
        borderRadius: 12,
        marginTop: 8,
        shadowColor: "#27ae60",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    addButtonText: {
        textAlign: "center",
        color: "#ffffff",
        fontWeight: "700",
        fontSize: 16,
    },
    bottomSpacer: {
        height: 20,
    },
});

export default AddMenuScreen;