const configController = {
  domainCheck: (req, res) =>
    res.status(200).json({
      "pre-domain": req.subdomain,
      host: req.headers.host,
    }),
  settings: (req, res) => res.status(200).json(req.user_config),
};

module.exports = configController;
