const uuidv4 = require('uuid/v4');
const items = [
    {   
        id: uuidv4(),
        name: "Cong viec 1",
        level: 0 // Small
    },
    {
        id: uuidv4(),
        name: "Cong viec 2",
        level: 1 // Medium
    },
    {
        id: uuidv4(),
        name: "Cong viec 3",
        level: 2 // High
    }
];

export default items;