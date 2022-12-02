import recordsCollection from './../models/recordsSchema.js';

export const getAllRecords = async (req, res, next) => {
  try {
    const records = await recordsCollection.find();
    res.json(records);
  } catch (err) {
    next(err);
  }
};

export const getSingleRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const singleRecord = await recordsCollection.findById(id);

    res.json({ success: true, record: singleRecord });
  } catch (err) {
    next(err);
  }
};

export const createRecord = async (req, res, next) => {
  // post request to create record
  try {
    const record = new recordsCollection(req.body);
    // 29.11
    if (req.file) {
      record.img = `/${req.file.filename}`;
    }

    //
    await record.save();
    res.json({
      success: true,
      data: record,
    });
  } catch (err) {
    next(err);
  }
};

export const updateRecord = async (req, res, next) => {
  // patch request on /records/:id
  try {
    const { id } = req.params;
    const updatedRecord = await recordsCollection.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.json({ success: true, record: updatedRecord });
  } catch (err) {
    next(err);
  }
};

export const deleteRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedRecord = await recordsCollection.findByIdAndDelete(id);
    res.json({ success: true, status: deletedRecord });

    // const existingRecord = await recordsCollection.findById(id);
    // if (existingRecord) {
    //   const deleteStatus = await recordsCollection.deleteOne({
    //     _id: existingRecord._id,
    //   });
    //   res.json({ success: true, status: deleteStatus });
    // } else {
    //   throw new Error('Record ID does not exists');
    // }
  } catch (err) {
    next(err);
  }
};
