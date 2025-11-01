const upload = require("../Middlewares/Uploads");
const router = require('express').Router();
const {
  addEqipment,
  getAllEquipments,
  BookEqipment,
  myEquipments,
  myBookings,
  myLending,
  profile,
  updateProfile,
} = require('../Controllers/ProController');

const {
  addConsultant,
  getAllConsultants,
  getConsultantById
} = require('../Controllers/ProController');

const ensureAuthenticated = require('../Middlewares/Auth');

// Equipment routes
router.post('/addEquipment', ensureAuthenticated, upload.single("image"), addEqipment);
router.get('/allEquipments', ensureAuthenticated, getAllEquipments);
router.post('/bookEquipment', ensureAuthenticated, BookEqipment);
router.get('/myEquipments', ensureAuthenticated, myEquipments);
router.get('/myBookings', ensureAuthenticated, myBookings);
router.get('/myLending', ensureAuthenticated, myLending);

// User routes
router.get('/profile', ensureAuthenticated, profile);
router.put('/editProfile', ensureAuthenticated, updateProfile);

// ✅ Consultant routes
router.post('/addConsultant', ensureAuthenticated, addConsultant);
router.get('/consultants', ensureAuthenticated, getAllConsultants);
router.get('/consultant/:id', ensureAuthenticated, getConsultantById);

module.exports = router;
