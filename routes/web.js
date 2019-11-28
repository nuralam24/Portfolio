const express = require("express");
const router = express.Router();
const { catchErrors } = require("../handlers/errorHandlers");
const ContactFormController = require("../controllers/ContactFormController");

// // The main route
router.get("/", (request, response) => {
  response.render("home", {
    title: "Nur",
    description:
      "Hello I am NurAlam a junior full-stack web developer."
  });
});

router.post(
  "/contact",
  ContactFormController.validationRules,
  ContactFormController.errorHandling,
  catchErrors(ContactFormController.submitForm)
);


module.exports = router;
