const sqlite3 = require("sqlite3").verbose();

// Connect to the SQLite database
const db = new sqlite3.Database("database.db");

// CREATE tables
function createTables() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Create User table
      db.run(
        `CREATE TABLE IF NOT EXISTS User (
                id INTEGER PRIMARY KEY,
                role TEXT CHECK (role IN ('admin', 'member', 'left')),
                coin REAL
            )`,
        function (err) {
          if (err) {
            reject(err);
          } else {
            // Create Channel table
            db.run(
              `CREATE TABLE IF NOT EXISTS Channel (
                        name TEXT PRIMARY KEY
                    )`,
              function (err) {
                if (err) {
                  reject(err);
                } else {
                  resolve();
                }
              }
            );
          }
        }
      );
    });
  });
}

// CREATE operation for User table
function createUser(user) {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO User (id, role, coin) VALUES (?, ?, ?)";
    db.run(sql, [user.id, user.role, user.coin], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
}

// READ operation for User table
function getUserById(userId) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM User WHERE id = ?";
    db.get(sql, [userId], function (err, row) {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

// get all users from User table
function getAllUser() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM User";
    db.all(sql, [], function (err, row) {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

// READ all Admin and Staff from User table
function getAllAdmin() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM User WHERE role = 'admin'";
    db.all(sql, function (err, row) {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

// READ all User Admin and Staff table
function getAllStaff() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM User WHERE role = 'admin' OR role = 'staff'";
    db.all(sql, function (err, row) {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

// Function to count the number of users in User table
function getCountUsers() {
  return new Promise((resolve, reject) => {
    const sql =
      'SELECT COUNT(*) AS all_users, SUM(CASE WHEN role = "left" THEN 1 ELSE 0 END) AS deleted FROM User';
    db.get(sql, [], function (err, row) {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

// UPDATE operation for User table
function updateUser(userId, updatedUser) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE User SET role = ?, coin = ? WHERE id = ?";
    db.run(sql, [updatedUser.role, updatedUser.coin, userId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// UPDATE operation make userLeft
function userLeft(userId) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE User SET role = 'left' WHERE id = ?";
    db.run(sql, [userId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// UPDATE operation make userRestart
function userRestart(userId) {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE User SET role = 'member' WHERE id = ? and NOT role = 'admin'";
    db.run(sql, [userId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// UPDATE operation make userLeft
function makeUserAdmin(userId) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE User SET role = 'admin' WHERE id = ?";
    db.run(sql, [userId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// UPDATE operation make userLeft
function deleteUserAdmin(userId) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE User SET role = 'member' WHERE id = ?";
    db.run(sql, [userId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// DELETE operation for User table
function deleteUser(userId) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM User WHERE id = ?";
    db.run(sql, [userId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// CREATE operation for Channel table
function createChannel(channelId) {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO Channel (name) VALUES (?)";
    db.run(sql, [channelId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
}

// READ operation for Channel table
// READ all operation for Channel table for
function getAllChannel() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM Channel";
    db.all(sql, [], function (err, row) {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

// DELETE operation for User table
function deleteChannel(channelId) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM Channel WHERE name = ?";
    db.run(sql, [channelId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// Close the database connection
function closeDatabase() {
  db.close();
}

module.exports = {
  createTables,
  createUser,
  getUserById,
  getAllUser,
  getAllAdmin,
  getAllStaff,
  updateUser,
  userLeft,
  userRestart,
  makeUserAdmin,
  deleteUserAdmin,
  deleteUser,
  createChannel,
  getAllChannel,
  deleteChannel,
  closeDatabase,
  getCountUsers,
};

// (async () => {
//   await createTables();
// })();
