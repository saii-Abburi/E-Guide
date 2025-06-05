// routes/admin.js
const express = require("express");
const router = express.Router();
const admin = require("../firebase.js")

const db = admin.firestore();

router.post("/admins", async (req, res) => {
  const { email, password, username, regdNo } = req.body;

  try {
    // Step 1: Create the user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    const uid = userRecord.uid;

    // Step 2: Set the admin role in Firestore
    await db.collection("Users").doc(uid).set({
      email,
      username,
      regdNo,
      role: "admin",
    });

    console.log("✅ Admin user created successfully");
    res.status(201).json({ message: "Admin user created successfully", uid });
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
