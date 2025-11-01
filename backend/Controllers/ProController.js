const EquipModel = require("../Models/Equipments");
const UserModel = require("../Models/User");
const BookModel = require("../Models/Booking");
const Consultant = require("../Models/Consultant");

// ✅ Add new consultant profile
const addConsultant = async (req, res) => {
  try {
    const { bio, specialties, fee, location, imageUrl } = req.body;
    const userId = req.user._id;

    // Check if already registered as consultant
    const existing = await Consultant.findOne({ userId });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Consultant profile already exists",
      });
    }

    const newConsultant = new Consultant({
      userId,
      bio,
      specialties,
      fee,
      imageUrl,
      location,
    });

    await newConsultant.save();

    res.status(201).json({
      success: true,
      message: "Consultant profile added successfully",
    });
  } catch (err) {
    console.error("Error adding consultant:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ✅ Get all consultants (for farmer view)
const getAllConsultants = async (req, res) => {
  try {
    // Populate user info for each consultant
    const consultants = await Consultant.find()
      .populate("userId", "name email contact location")
      .lean();

    if (!consultants || consultants.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No consultants found",
      });
    }

    res.status(200).json({
      success: true,
      data: consultants,
    });
  } catch (err) {
    console.error("Error fetching consultants:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch consultants",
    });
  }
};

// ✅ Get single consultant by ID
const getConsultantById = async (req, res) => {
  try {
    const { id } = req.params;
    const consultant = await Consultant.findById(id).populate(
      "userId",
      "name email contact location"
    );

    if (!consultant) {
      return res.status(404).json({
        success: false,
        message: "Consultant not found",
      });
    }

    res.status(200).json({
      success: true,
      data: consultant,
    });
  } catch (err) {
    console.error("Error fetching consultant:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch consultant",
    });
  }
};

// ✅ Add new equipment
const addEqipment = async (req, res) => {
  try {
    const { type, name, pricePerDay, location, Lender } = req.body;
    const image = req.file?.filename;

    const newEquip = new EquipModel({
      type,
      name,
      pricePerDay,
      location,
      Lender,
      image,
    });

    await newEquip.save();

    res.status(201).json({
      message: "Equipment added successfully",
      success: true,
    });
  } catch (err) {
    console.error("Error adding equipment:", err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// ✅ Get all equipments
const getAllEquipments = async (req, res) => {
  try {
    const equipments = await EquipModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: equipments,
    });
  } catch (err) {
    console.error("Error fetching equipments:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch equipments",
    });
  }
};

// ✅ Book equipment
const BookEqipment = async (req, res) => {
  try {
    const { equipId, userId, lenderId } = req.body;

    const newBooking = new BookModel({
      BID: userId,
      EquipId: equipId,
      LID: lenderId,
    });

    await newBooking.save();

    res.status(201).json({
      message: "Equipment booked successfully",
      success: true,
    });
  } catch (err) {
    console.error("Error booking equipment:", err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// ✅ Fetch user's own equipments
const myEquipments = async (req, res) => {
  try {
    const lenderId = req.user._id;
    const equipments = await EquipModel.find({ Lender: lenderId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: equipments,
    });
  } catch (err) {
    console.error("Error fetching my equipments:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch my equipments",
    });
  }
};

// ✅ Fetch user's bookings
const myBookings = async (req, res) => {
  try {
    const userId = req.user._id;

    const bookings = await BookModel.find({ BID: userId });
    const detailedBookings = await Promise.all(
      bookings.map(async (booking) => {
        const equipment = await EquipModel.findById(booking.EquipId);
        const lender = await UserModel.findById(booking.LID);
        return { equipment, lender };
      })
    );

    res.status(200).json({
      success: true,
      data: detailedBookings,
    });
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch my bookings",
    });
  }
};

// ✅ Fetch user's lending records
const myLending = async (req, res) => {
  try {
    const userId = req.user._id;

    const bookings = await BookModel.find({ LID: userId });
    const detailedBookings = await Promise.all(
      bookings.map(async (booking) => {
        const equipment = await EquipModel.findById(booking.EquipId);
        const borrower = await UserModel.findById(booking.BID);
        return { equipment, borrower };
      })
    );

    res.status(200).json({
      success: true,
      data: detailedBookings,
    });
  } catch (err) {
    console.error("Error fetching lending:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch lending details",
    });
  }
};

// ✅ Get profile
const profile = async (req, res) => {
  try {
    const userId = req.user._id;
    const data = await UserModel.findById(userId).select("-password");

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};

// ✅ Update profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, contact, location } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { name, contact, location },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

module.exports = {
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
};
