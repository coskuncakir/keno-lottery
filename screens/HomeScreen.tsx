import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const numbers = Array.from(Array(80), (_, index) => index + 1);
  const selectedNumbersInitialState: any[] = [];
  const selectedPlaceholderNums: any[] = ["?", "?", "?", "?", "?"];
  const [selectedNumbers, setSelectedNumbers] = useState(
    selectedNumbersInitialState
  );
  const [stake, setStake] = useState("");
  const [results, setResults] = useState({
    winningNumbers: [],
    matchingNumbers: [],
  });

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
    // select winning numbers
    const winningNumbers = generateRandomNumber(20);

    // find matching numbers
    const matchingNumbers = winningNumbers.filter((item) =>
      selectedNumbers.includes(item)
    );

    // set results
    setResults({ winningNumbers, matchingNumbers });

    // show results
    showResult();
  };

  const handleLuckyPick = () => {
    const luckyNumbers = generateRandomNumber(5);
    setSelectedNumbers(luckyNumbers);
  };

  const showResult = () =>
    Alert.alert(
      "Results",
      `Winning Numbers: ${results.winningNumbers} \n\n Matching Numbers: ${
        results.matchingNumbers.length > 0
          ? results.matchingNumbers
          : "No Matching Number"
      }`,
      [{ text: "Play Again", onPress: () => clearState() }]
    );

  const clearState = () => {
    setSelectedNumbers([]), setStake("");
  };

  const generateRandomNumber = (size: number) => {
    const randomNumbers = [];
    while (randomNumbers.length < size) {
      const random = Math.floor(Math.random() * 80) + 1;
      if (randomNumbers.indexOf(random) === -1) randomNumbers.push(random);
    }
    return randomNumbers;
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
                : selectedPlaceholderNums.map((item, index) => (
                    <Text
                      key={index}
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
              style={styles.textInput}
              placeholder="Enter Stake"
            />
            <TouchableOpacity
              disabled={selectedNumbers.length < 5 || !stake}
              style={[
                styles.btn,
                selectedNumbers.length < 5 || !stake
                  ? styles.btnDisabled
                  : null,
              ]}
              onPress={handleBet}
            >
              <Text style={styles.btnText}>Place Bet</Text>
            </TouchableOpacity>
          </View>
          {/* alternative results section
          {results.winningNumbers.length > 0 && (
            <View style={styles.results}>
              <Text style={styles.resultsTitle}>
                Winning Numbers | {results.matchingNumbers.length} matching
                number
              </Text>
              <View style={styles.resultNumbers}>
                {results.winningNumbers.map((item) => (
                  <Text
                    style={[
                      styles.resultNumber,
                      results.matchingNumbers.includes(item) &&
                        styles.matchingNumber,
                    ]}
                    key={item}
                  >
                    {item}
                  </Text>
                ))}
              </View>
            </View>
          )}
          */}
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
    marginTop: 24,
    display: "flex",
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
  btnDisabled: {
    backgroundColor: "#d3d3d3",
  },
  btnText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#443bc8",
    padding: 12,
    minWidth: 150,
    borderRadius: 4,
  },
  results: {
    marginTop: 24,
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 8,
    paddingBottom: 8,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#3f34b6",
    borderRadius: 4,
  },
  resultsTitle: {
    fontSize: 16,
    color: "#9a95e7",
    fontWeight: "bold",
    marginBottom: 8,
    marginLeft: 8,
  },
  resultNumbers: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  resultNumber: {
    minWidth: 24,
    padding: 4,
    backgroundColor: "#645cbf",
    color: "white",
    margin: 4,
    borderRadius: 12,
    overflow: "hidden",
    textAlign: "center",
    fontSize: 12,
  },
  matchingNumber: {
    backgroundColor: "red",
  },
});
