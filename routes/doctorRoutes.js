const router = require("express").Router();
const authController = require("../controllers/doctor/auth/authController");
const profileController = require('../controllers/doctor/profile/profileController');
const helpers = require("../controllers/helpers");


router.get("/", (req, res) => {
	res.send("works");
});

/**  Routes for Authentication */
router.get("/auth/failure", (req, res) => {
	res.json({
		success: false,
		message: "Please check your login details",
		data: {}
	});
});

// /** Send OTP for otp based login
//  *  body:{'phone':'+91 your_no'}
//  * Please note there is a space in between +91 and your_no
//  * response: Success notification
//  */
router.post("/auth/send-otp", authController.sendOtp);

/** Verification of otp
 * body:{'phone':'+91 your_no','otp':}
 * Please note there is a space in between +91 and your_no
 * response: jwt token with _id as req.payload
 */
router.post("/auth/verify-otp", authController.verifyOtp);

router.post("/checkLogin", helpers.checkLogin, (req, res) => {
	res.json(req.payload);
});

/* Create and update doctorInfo
body: {"name", "qualifications", "clinic", "specialization", "profileImage"}
response: success status, a message and data field (currently empty)
*/
router.post("/update-profile", helpers.checkLogin, profileController.updateProfile);

/*get doctorInfo of a doctor
doctorId taken from req.payload._id
response: success status, a message and data field having the doctorInfo
*/
router.post("/get-profile", helpers.checkLogin, profileController.getProfile);

/*deleting doctorInfo
doctorId taken from the req.payload._id
response: success status, a message and a data field(currently empty)
*/
router.post("/delete-profile", helpers.checkLogin, profileController.deleteProfile);

/*listing all documents of collection doctorInfo
response: success status, a message and data:{profile:[array of profiles]}
*/
router.post("/list-profile", helpers.checkLogin, profileController.listProfile);

module.exports = router;
