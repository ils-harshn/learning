const clientConfigController = {
  configuration: (req, res) => res.status(200).json(req.user_config),
};

module.exports = clientConfigController;
