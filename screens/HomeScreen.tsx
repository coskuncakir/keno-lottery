import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const numbers = Array.from(Array(80), (_, index) => index + 1);
  const selectedNumbersInitialState: any[] = [];
  const selectedPlaceholderNums: any[] = ["?", "?", "?", "?", "?"];
  const [selectedNumbers, setSelectedNumbers] = useState(
    selectedNumbersInitialState
  );
  const [stake, setStake] = useState("500");

  const handleSelectedNumber = (number: number) => {
    setSelectedNumbers((prevState) => {
      if (prevState.includes(number)) {
        const index = prevState.indexOf(number);
        prevState.splice(index, 1);
      } else if (selectedNumbers.length < 5) {
        prevState.push(number);
      }
      return [...prevState];
    });
  };

  const handleBet = () => {
    // validate selected numbers and the stake
    //if its valid display a success message
  };

  const handleLuckyPick = () => {
    // select 5 random numbers
    const luckyNumbers = [];

    while (luckyNumbers.length < 5) {
      const random = Math.floor(Math.random() * 80) + 1;
      if (luckyNumbers.indexOf(random) === -1) luckyNumbers.push(random);
    }

    setSelectedNumbers(luckyNumbers);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Choose</Text>
              <Text style={styles.subTitle}>5 numbers</Text>
            </View>
            <View>
              <Text style={styles.subTitle}>or</Text>
            </View>
            <TouchableOpacity style={styles.btn} onPress={handleLuckyPick}>
              <Text style={styles.btnText}>Lucky Pick</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.selectedNumbersContainer}>
            <Text style={styles.secondaryTitle}>Selected Numbers</Text>
            <View style={[styles.grid, styles.selectedNumbers]}>
              {selectedNumbers.length
                ? selectedNumbers.map((item) => (
                    <TouchableOpacity
                      key={item}
                      style={styles.selectedNumber}
                      onPress={(e) => handleSelectedNumber(item)}
                    >
                      <Text style={styles.numberText}>{item}</Text>
                    </TouchableOpacity>
                  ))
                : selectedPlaceholderNums.map((item) => (
                    <Text
                      style={[
                        styles.selectedNumber,
                        styles.selectedPlaceholderNumber,
                      ]}
                    >
                      {item}
                    </Text>
                  ))}
            </View>
          </View>

          <View style={styles.grid}>
            {numbers.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.number,
                  selectedNumbers.includes(item) && styles.numberActive,
                ]}
                onPress={(e) => handleSelectedNumber(item)}
              >
                <Text
                  style={[
                    styles.numberText,
                    selectedNumbers.includes(item) && styles.numberTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.footer}>
            <TextInput
              value={stake}
              onChangeText={setStake}
              keyboardType="numeric"
            />
            <TouchableOpacity style={[styles.btn]} onPress={handleBet}>
              <Text style={styles.btnText}>Place Bet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white",
  },
  container: {
    padding: 24,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 24,
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  number: {
    width: 40,
    padding: 8,
    backgroundColor: "#f4f5fc",
    margin: 8,
    borderRadius: 8,
  },
  numberText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: "#4f5182",
  },
  numberActive: {
    backgroundColor: "#ff5a5e",
  },
  numberTextActive: {
    color: "white",
  },
  selectedNumbersContainer: {
    paddingTop: 16,
    paddingBottom: 16,
    marginBottom: 24,
    backgroundColor: "#443bc8",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
  },
  selectedNumbers: {
    backgroundColor: "#443bc8",
    justifyContent: "center",
  },
  secondaryTitle: {
    fontSize: 20,
    color: "#9a95e7",
    fontWeight: "bold",
    marginBottom: 16,
  },
  selectedNumber: {
    width: 45,
    height: 70,
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 8,
    paddingRight: 8,
    marginLeft: 8,
    marginRight: 8,
    backgroundColor: "white",
    borderRadius: 24,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    textAlign: "center",
    overflow: "hidden",
  },
  selectedPlaceholderNumber: {
    backgroundColor: "#3f34b6",
    color: "#9e97e7",
    shadowOpacity: 0,
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btn: {
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "#443bc8",
    borderRadius: 4,
  },
  btnText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});