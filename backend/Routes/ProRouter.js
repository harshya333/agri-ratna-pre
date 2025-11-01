const express = require("express");
const router = express.Router();
const upload = require("../Middlewares/Uploads");
const ensureAuthenticated = require("../Middlewares/Auth");

const {
  addEqipment,
  getAllEquipments,
  BookEqipment,
  myEquipments,
  myBookings,
  myLending,
  profile,
  updateProfile,
  addConsultant,
  getAllConsultants,
  getConsultantById,
} = require("../Controllers/ProController");

// =============================
// 🛠️ Equipment Routes
// =============================
router.post("/addEquipment", ensureAuthenticated, upload.single("image"), addEqipment);
router.get("/allEquipments", ensureAuthenticated, getAllEquipments);
router.post("/bookEquipment", ensureAuthenticated, BookEqipment);
router.get("/myEquipments", ensureAuthenticated, myEquipments);
router.get("/myBookings", ensureAuthenticated, myBookings);
router.get("/myLending", ensureAuthenticated, myLending);

// =============================
// 👤 User Profile Routes
// =============================
router.get("/profile", ensureAuthenticated, profile);
router.put("/editProfile", ensureAuthenticated, updateProfile);

// =============================
// 🧑‍🌾 Consultant Routes
// =============================
// (If consultants will upload images in future, we can add `upload.single("image")`)
router.post(
  "/addConsultant",
  ensureAuthenticated,
  upload.single("image"), // 👈 enables image upload
  addConsultant
);

router.get("/consultants", ensureAuthenticated, getAllConsultants);
router.get("/consultant/:id", ensureAuthenticated, getConsultantById);

module.exports = router;
