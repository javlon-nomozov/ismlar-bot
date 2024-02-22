const { allAdmins, allStaff } = require("../data/conf");

const staffFilter = async (update) => {
  try {
    if (update.message || update.callback_query) {
      const userId = (update.message ? update.message : update.callback_query)
        .from.id;
      const admins = await allStaff();
      if (admins.some((el) => el.id == userId)) {
        return true;
      }
      return false;
    }
  } catch (error) {
    console.error(`Error in staffFilter: ${error.message}`);
    return false; // Return false to indicate that an error occurred
  }
};

const botAdminFilter = async (update) => {
  try {
    if (update.message || update.callback_query) {
      const userId = (update.message ? update.message : update.callback_query)
        .from.id;
      const admins = await allAdmins();
      if (admins.some((el) => el == userId)) {
        return true;
      }
      return false;
    }
  } catch (error) {
    console.error(`Error in staffFilter: ${error.message}`);
    return false; // Return false to indicate that an error occurred
  }
};

const privateFilter = (update) => {
  try {
    return (
      String(
        (update.message ? update.message : update.callback_query).chat.type
      ) === "private"
    );
  } catch (error) {
    console.error(`Error in privatelter: ${error.message}`);
    return false; // Return false to indicate that an error occurred
  }
};

const groupFilter = (update) => {
  try {
    return (
      String(
        (update.message ? update.message : update.callback_query).chat.type
      ) === "group"
    );
  } catch (error) {
    console.error(`Error in groupFilter: ${error.message}`);
    return false; // Return false to indicate that an error occurred
  }
};

const channelFilter = (update) => {
  try {
    return (
      String(
        (update.message ? update.message : update.callback_query).chat.type
      ) === "channel"
    );
  } catch (error) {
    console.error(`Error in channelFilter: ${error.message}`);
    return false; // Return false to indicate that an error occurred
  }
};

module.exports = {
  staffFilter,
  botAdminFilter,
  privateFilter,
  groupFilter,
  channelFilter,
};
