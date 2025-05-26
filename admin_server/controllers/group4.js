const data = {
    challenges: [],
    quotes: [],
    tips: [],
  };
  
  exports.group4 = (req, res) => {
    res.json(data);
  };
  
  exports.addItem = (req, res) => {
    const { type } = req.params;
    const { content } = req.body;
  
    if (type in data) {
      data[type].push(content);
      res.status(201).json({ message: `${type} added successfully.` });
    } else {
      res.status(400).json({ error: "Invalid type" });
    }
  };
  console.log(data);
  
  exports.deleteItem = (req, res) => {
    const { type, id } = req.params;
  
    if (type in data) {
      const index = data[type].indexOf(id);
      if (index > -1) {
        data[type].splice(index, 1);
        res.status(200).json({ message: `${type} deleted successfully.` });
      } else {
        res.status(404).json({ error: `${type} not found` });
      }
    } else {
      res.status(400).json({ error: "Invalid type" });
    }
  };
  