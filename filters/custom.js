// update data example
// const update = {
//   update_id: 834713609,
//   message: {
//     message_id: 14240,
//     from: {
//       id: {user_id},
//       is_bot: false,
//       first_name: "Javlon",
//       username: "great_lvl",
//       language_code: "ru",
//     },
//     chat: {
//       id: {user_id/group_id},
//       first_name: "Javlon",
//       username: "great_lvl",
//       type: "private",
//     },
//     date: 1702657316,
//     text: "/start",
//     entities: [[Object]],
//   },
// };

const commandFilter = (command, prefix = "/") => {
  if (Array.isArray(command)) {
    return (update) => {
      // let result;
      try {
        const result = Boolean(
          command.find((el) =>
            update.message.text.startsWith(prefix.concat(el))
          )
        );
        return result;
      } catch (error) {
        return false;
      }
    };
  }
  return (update) => {
    try {
      return update.message.text.startsWith(prefix.concat(command));
    } catch (error) {
      return false;
    }
  };
};

const hashtagFilter = (hashtag) => {
  if (Array.isArray(hashtag)) {
    return (update) => {
      try {
        const result = Boolean(
          hashtag.find((el) => update.message.text.includes("#".concat(el)))
        );
        return result;
      } catch (error) {
        return false;
      }
    };
  }
  return (update) => {
    try {
      return update.message.text.includes("#".concat(hashtag));
    } catch (error) {
      return false;
    }
  };
};

const textFilter = (callback) => (update) => {
  const data = update.message;
  if (!data) {
    return false;
  }
  return callback(data.text);
};

const callbackFilter = (callback) => (update) => {
  const data = update.callback_query;
  if (!data) {
    return false;
  }
  return callback(data.data);
};

module.exports = { commandFilter, hashtagFilter, textFilter, callbackFilter };
