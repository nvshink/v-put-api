module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      startDate: Date,
      startCity: String,
      endDate: Date,
      endCity: String,
      planeCode: String,
      places: Array
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Flight = mongoose.model("flight", schema);
  return Flight;
};
