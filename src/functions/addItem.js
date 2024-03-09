// Add a new object to the data.
export const addItem = (item, level, data, setCurrData) => {
    // Add item to the data
    const updatedData = {
        ...data,
        [level]: [...data[level], item] // Create a new array with the new item added
    };

    setCurrData(updatedData); // Update the state with the modified data
};
