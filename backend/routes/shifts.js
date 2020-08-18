const express = require("express");

const ProHRShifts = require("../models/shifts");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("",checkAuth, (req, res, next) => {
  const ProHRShift = new ProHRShifts({
    name: req.body.name,
    Date: req.body.date,
    position: req.body.position,
    employee_id: req.body.id
  });
  ProHRShift.save()
    .then(result => {
      res.status(201).json({
        message: "Shifts created!",
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.get("",checkAuth, (req, res, next) => {
  ProHRShifts.find().then(documents => {
    res.status(200).json({
      message: "Shifts fetched Successfully",
      shifts: documents
    });
  });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  // const shiftid = req.params.id;
  // console.log(shiftid);
  // if (shiftid) {
  //   ProHRShifts.findByIdAndRemove(shiftid).exec((err, shiftdata) => {
  //     if (err) {
  //       res.status(404).json(err);
  //       return;
  //     }
  //     res.status(204).json("Succesfully Deleted");
  //   });
  // } else {
  //   res.status(404).json({ message: "No Shiftid" });
  // }
  ProHRShifts.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = router;
