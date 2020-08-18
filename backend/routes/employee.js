const express = require("express");

const ProHREmployee = require("../models/Employee");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, (req, res, next) => {
  const ProHREmploye = new ProHREmployee({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    dob: req.body.dob,
    hiring: req.body.hiring,
    gender: req.body.gender,
    position: req.body.position,
    adminid: req.userData.userId,
  });
  ProHREmploye.save()
    .then((result) => {
      res.status(201).json({
        message: "Employee created!",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.get("", checkAuth, (req, res, next) => {
  ProHREmployee.find().then((documents) => {
    res.status(200).json({
      message: "Posts fetched Successfully",
      employee: documents,
    });
  });
});

router.get("/detail/", checkAuth, (req, res, next) => {
  ProHREmployee.findById(req.userData.userId).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post Not found!" });
    }
  });
});

router.get("/:ID", checkAuth, (req, res, next) => {
  ProHREmployee.findById(req.params.ID).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post Not found!" });
    }
  });
});

router.put("/:ID", checkAuth, (req, res,next) => {
    const ProHREmploye = new ProHREmployee({
      _id: req.params.ID,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      dob: req.body.dob,
      hiring: req.body.hiring,
      gender: req.body.gender,
      position: req.body.position,
      adminid: req.userData.userId,
    });
    ProHREmployee.updateOne({_id: req.params.ID}, ProHREmploye).then(result => {
      res.status(201).json({
        message: "Post Updated Succesfully"
      });
    });
  });

  router.delete("/:id", checkAuth, (req, res, next) => {
    // const shiftid = req.params.id;
    // console.log(shiftid);
    // if (shiftid) {
    //   ProHREmployee.findByIdAndRemove(shiftid).exec((err, shiftdata) => {
    //     if (err) {
    //       res.status(404).json(err);
    //       return;
    //     }
    //     res.status(204).json("Succesfully Deleted");
    //   });
    // } else {
    //   res.status(404).json({ message: "No Shiftid" });
    // }
    ProHREmployee.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ message: "Post deleted!" });
    });
  });

module.exports = router;
