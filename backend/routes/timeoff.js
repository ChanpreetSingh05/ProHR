const express = require("express");

const ProHRTimeoff = require("../models/timeoff");

const prohremployees = require("../models/Employee");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, (req, res, next) => {
  const username = "";

  console.log(req.userData.userId);
  const id = req.userData.userId;
  prohremployees.findById(req.userData.userId).then((post) => {
    if (post) {
      const ProHRtimeoff = new ProHRTimeoff({
        from: req.body.from,
        to: req.body.to,
        reason: req.body.reason,
        userid: req.userData.userId,
        status: "Pending",
        username: post.name
      });

      ProHRtimeoff.save()
        .then((result) => {
          // console.log(result);
          res.status(201).json({
            message: "Timeoff created!",
            result: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    } else {
      // console.log(err);
      res.status(404).json({ message: "Post declined!" });
    }
  });
});

router.get("", checkAuth, (req, res, next) => {
  ProHRTimeoff.find().then((documents) => {
    res.status(200).json({
      message: "Posts fetched Successfully",
      timeoffs: documents,
    });
  });
  // ProHRTimeoff.findById("5eb1357ffbf9fa1f8417002b").then((documents) => {
  //   if (documents) {
  //     const id=documents.userid;
  //     console.log("chldaaaa " + id);
  //     prohremployees
  //       .findById(documents.userid)
  //       .then((result) => {
  //         console.log("chldaaaa " + result);
  //         res.status(201).json({
  //           message: "Timeoff created!",
  //           timeoffs: { documents, result },
  //         });
  //       })
  //       .catch((err) => {
  //         res.status(500).json({
  //           error: err,
  //         });
  //       });
  //   } else {
  //     // console.log(err);
  //     res.status(404).json({ message: "Post declined!" });
  //   }
  // });
});

router.put("", checkAuth, (req, res, next) => {
  // var myquery = { address: "Valley 345" };
  var newvalues = { $set: { status: req.body.status } };
  ProHRTimeoff.updateOne({ _id: req.body.id, userid: req.body.userid }, newvalues).then(
    (result) => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!", status: req.body.status });
      } else {
        res.status(401).json({ message: "Something Went Wrong !" });
      }
    }
  );
});

module.exports = router;
