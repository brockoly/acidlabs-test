exports.index = async (req, res) => {
  const data = {
    title: 'Acid Labs Test'
  }
  res
    .status(200)
    .send(data);
};
