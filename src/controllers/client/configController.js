const configController = {
  configuration: (req, res) => res.status(200).json(req.user_config),
};

module.exports = configController;
